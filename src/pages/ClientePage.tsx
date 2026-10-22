import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientePage.css";

type Viaje = {
  id: number; bus: string; placa: string; origen: string; destino: string;
  horaSalida: string; horaLlegada: string; estado: string;
};
type Asiento = {
  id: number; bus: string; placa: string; numero: number;
  tipo: "Normal" | "Preferencial"; estado: "Disponible" | "Ocupado" | "Reservado";
};
type Reserva = {
  id: string; viajeId: number; bus: string; placa: string; origen: string;
  destino: string; horaSalida: string; horaLlegada: string; asientoId: number;
  numeroAsiento: number; nombre: string; ci: string; fecha: string; estado: "Activa" | "Cancelada";
};

const HORARIOS_KEY = "frontend-buses-horarios";
const ASIENTOS_KEY = "frontend-buses-asientos";
const RESERVAS_KEY = "frontend-buses-reservas-cliente";
const viajesDemo: Viaje[] = [
  { id: 1, bus: "Bus 001", placa: "ABC-123", origen: "Sucre", destino: "La Paz", horaSalida: "06:00", horaLlegada: "14:00", estado: "Programado" },
  { id: 2, bus: "Bus 002", placa: "DEF-456", origen: "Sucre", destino: "Cochabamba", horaSalida: "08:30", horaLlegada: "15:30", estado: "Programado" },
  { id: 3, bus: "Bus 003", placa: "GHI-789", origen: "Sucre", destino: "Santa Cruz", horaSalida: "10:00", horaLlegada: "18:00", estado: "Programado" },
  { id: 4, bus: "Bus 004", placa: "JKL-012", origen: "Sucre", destino: "Potosí", horaSalida: "15:00", horaLlegada: "18:30", estado: "Programado" },
];
const asientosDemo: Asiento[] = ["Bus 001", "Bus 002", "Bus 003", "Bus 004"].flatMap((bus, busIndex) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: busIndex * 10 + i + 1, bus, placa: ["ABC-123", "DEF-456", "GHI-789", "JKL-012"][busIndex],
    numero: i + 1, tipo: (i < 2 ? "Preferencial" : "Normal") as Asiento["tipo"], estado: "Disponible" as Asiento["estado"],
  }))
);

function readList<T,>(key: string, fallback: T[]): T[] {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as T[] : fallback;
  } catch { return fallback; }
}

function ClientePage() {
  const navigate = useNavigate();
  const [section, setSection] = useState<"inicio" | "horarios" | "asientos" | "reservas">("inicio");
  const [viajes, setViajes] = useState<Viaje[]>(() => readList(HORARIOS_KEY, viajesDemo));
  const [asientos, setAsientos] = useState<Asiento[]>(() => readList(ASIENTOS_KEY, asientosDemo));
  const [reservas, setReservas] = useState<Reserva[]>(() => readList(RESERVAS_KEY, []));
  const [busqueda, setBusqueda] = useState("");
  const [viajeId, setViajeId] = useState<number | null>(null);
  const [asientoId, setAsientoId] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [ci, setCi] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const refresh = () => {
      setViajes(readList(HORARIOS_KEY, viajesDemo));
      setAsientos(readList(ASIENTOS_KEY, asientosDemo));
      setReservas(readList(RESERVAS_KEY, []));
    };
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("focus", refresh); window.removeEventListener("storage", refresh); };
  }, []);

  const guardarAsientos = (next: Asiento[]) => {
    setAsientos(next);
    localStorage.setItem(ASIENTOS_KEY, JSON.stringify(next));
  };
  const guardarReservas = (next: Reserva[]) => {
    setReservas(next);
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(next));
  };
  const viajeElegido = viajes.find(v => v.id === viajeId);
  const asientosViaje = asientos.filter(a => a.bus === viajeElegido?.bus || a.placa === viajeElegido?.placa);
  const filtrados = useMemo(() => viajes.filter(v => [v.bus, v.placa, v.origen, v.destino, v.horaSalida].some(x => x.toLowerCase().includes(busqueda.toLowerCase().trim()))), [viajes, busqueda]);

  const iniciarReserva = (viaje: Viaje) => {
    setViajeId(viaje.id); setAsientoId(null); setSection("asientos"); setMensaje("");
  };
  const reservar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!viajeElegido || !asientoId || !nombre.trim() || !ci.trim()) {
      setMensaje("Completa tus datos y selecciona un asiento disponible."); return;
    }
    const asiento = asientos.find(a => a.id === asientoId);
    if (!asiento || asiento.estado !== "Disponible") { setMensaje("Ese asiento ya no está disponible. Selecciona otro."); return; }
    const nueva: Reserva = {
      id: `AB-${Date.now().toString().slice(-8)}`, viajeId: viajeElegido.id, bus: viajeElegido.bus,
      placa: viajeElegido.placa, origen: viajeElegido.origen, destino: viajeElegido.destino,
      horaSalida: viajeElegido.horaSalida, horaLlegada: viajeElegido.horaLlegada,
      asientoId: asiento.id, numeroAsiento: asiento.numero, nombre: nombre.trim(), ci: ci.trim(),
      fecha: new Date().toLocaleDateString("es-BO"), estado: "Activa",
    };
    guardarAsientos(asientos.map(a => a.id === asiento.id ? { ...a, estado: "Reservado" } : a));
    guardarReservas([nueva, ...reservas]);
    setMensaje(`¡Reserva creada! Tu código es ${nueva.id}`);
    setSection("reservas"); setAsientoId(null);
  };
  const cancelar = (reserva: Reserva) => {
    if (!window.confirm(`¿Cancelar la reserva ${reserva.id}?`)) return;
    guardarReservas(reservas.map(r => r.id === reserva.id ? { ...r, estado: "Cancelada" } : r));
    guardarAsientos(asientos.map(a => a.id === reserva.asientoId ? { ...a, estado: "Disponible" } : a));
    setMensaje(`La reserva ${reserva.id} fue cancelada.`);
  };
  const boleto = (r: Reserva) => {
    const win = window.open("", "_blank", "width=650,height=700");
    if (!win) { setMensaje("Permite las ventanas emergentes para imprimir tu boleto."); return; }
    win.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Boleto ${r.id}</title><style>body{font-family:Arial,sans-serif;padding:32px;color:#171717}.ticket{border:2px solid #c9a45a;border-radius:18px;padding:28px;max-width:520px;margin:auto}h1{color:#9b762d}hr{border:0;border-top:1px solid #ddd;margin:20px 0}.row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #eee}small{color:#666}</style></head><body><article class="ticket"><h1>ANDES BUS</h1><p>BOLETO DE VIAJE</p><hr><div class="row"><span>Código</span><strong>${r.id}</strong></div><div class="row"><span>Pasajero</span><strong>${r.nombre}</strong></div><div class="row"><span>CI</span><strong>${r.ci}</strong></div><div class="row"><span>Ruta</span><strong>${r.origen} → ${r.destino}</strong></div><div class="row"><span>Bus / placa</span><strong>${r.bus} / ${r.placa}</strong></div><div class="row"><span>Salida</span><strong>${r.horaSalida}</strong></div><div class="row"><span>Asiento</span><strong>${r.numeroAsiento}</strong></div><hr><small>Presenta este boleto antes de abordar. Andes Bus · Sucre, Bolivia</small><p><button onclick="window.print()">Imprimir / Guardar PDF</button></p></article></body></html>`);
    win.document.close();
  };

  return <main className="client-app">
    <aside className="client-sidebar">
      <div className="client-brand"><span>🚌</span><div><strong>ANDES BUS</strong><small>PORTAL DEL CLIENTE</small></div></div>
      <p className="client-nav-label">MI VIAJE</p>
      <nav className="client-nav">
        <button className={section === "inicio" ? "active" : ""} onClick={() => setSection("inicio")}>⌂ <span>Inicio</span></button>
        <button className={section === "horarios" ? "active" : ""} onClick={() => setSection("horarios")}>◷ <span>Ver horarios</span></button>
        <button className={section === "asientos" ? "active" : ""} onClick={() => setSection("asientos")}>▦ <span>Disponibilidad</span></button>
        <button className={section === "reservas" ? "active" : ""} onClick={() => setSection("reservas")}>▣ <span>Mis reservas / boletos</span></button>
      </nav>
      <div className="client-sidebar-bottom"><span>✦</span><p>Tu destino,<br/>nuestra ruta.</p></div>
    </aside>
    <section className="client-main">
      <header className="client-header"><div><span className="client-eyebrow">TRANSPORTE · CONFIANZA · CALIDAD</span><h1>{section === "inicio" ? "Viaja con Andes Bus" : section === "horarios" ? "Horarios de buses" : section === "asientos" ? "Disponibilidad de asientos" : "Mis reservas y boletos"}</h1><p>Planifica tu viaje de forma sencilla y segura.</p></div><button className="client-exit" onClick={() => navigate("/login")}>Acceso del personal ↗</button></header>
      {mensaje && <div className="client-message" role="status"><span>{mensaje}</span><button onClick={() => setMensaje("")}>×</button></div>}
      {section === "inicio" && <><section className="client-hero"><div><span className="client-pill">ANDES BUS · SUCRE, BOLIVIA</span><h2>Tu próxima aventura<br/><em>comienza aquí.</em></h2><p>Consulta horarios, elige tu asiento y organiza tu viaje desde un solo lugar.</p><button onClick={() => setSection("horarios")}>Explorar horarios <span>→</span></button></div><div className="client-hero-art">🚌<span>✦</span></div></section><div className="client-feature-grid"><button onClick={() => setSection("horarios")}><span>◷</span><strong>Ver horarios</strong><small>Revisa rutas y horas de salida.</small></button><button onClick={() => { setSection("horarios"); setMensaje("Elige un viaje para consultar sus asientos y reservar."); }}><span>▦</span><strong>Elegir asiento</strong><small>Consulta disponibilidad por autobús.</small></button><button onClick={() => setSection("reservas")}><span>▣</span><strong>Mis boletos</strong><small>Genera o imprime tu boleto de reserva.</small></button></div><div className="client-note"><strong>Viaja tranquilo</strong><span>Consulta la información del viaje antes de reservar.</span></div></>}
      {(section === "horarios" || section === "asientos") && <><div className="client-tools"><input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por destino, bus o placa..." aria-label="Buscar viaje"/>{section === "asientos" && <span>Selecciona un viaje para ver sus asientos.</span>}</div><div className="client-trip-grid">{filtrados.map(v => <article className="client-trip-card" key={v.id}><div className="client-trip-top"><span>🚌 {v.bus}</span><span className="client-trip-state">{v.estado}</span></div><div className="client-route"><div><small>ORIGEN</small><strong>{v.origen}</strong><span>{v.horaSalida}</span></div><div className="client-route-line">→</div><div><small>DESTINO</small><strong>{v.destino}</strong><span>{v.horaLlegada}</span></div></div><div className="client-trip-bottom"><span>Placa: {v.placa}</span><button onClick={() => iniciarReserva(v)}>Consultar asientos <span>→</span></button></div></article>)}</div>{filtrados.length === 0 && <div className="client-empty">No se encontraron viajes. Prueba otra búsqueda.</div>}</>}
      {section === "asientos" && viajeElegido && <section className="client-seat-panel"><div className="client-section-title"><div><h2>{viajeElegido.bus} · {viajeElegido.origen} → {viajeElegido.destino}</h2><p>Selecciona un asiento disponible y completa tus datos.</p></div><span>{asientosViaje.length} asientos</span></div><div className="client-seat-legend"><span>🟩 Disponible</span><span>🟥 Ocupado</span><span>🟨 Reservado</span><span>🔵 Seleccionado</span></div><form onSubmit={reservar}><div className="client-seat-grid">{asientosViaje.map(a => <button type="button" key={a.id} disabled={a.estado !== "Disponible"} className={`client-seat ${a.estado.toLowerCase()} ${asientoId === a.id ? "selected" : ""}`} onClick={() => setAsientoId(a.id)}><span>●</span>{String(a.numero).padStart(2,"0")}</button>)}</div><div className="client-booking-fields"><label>Nombre completo<input value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Tu nombre y apellido"/></label><label>Carnet de identidad<input value={ci} onChange={e => setCi(e.target.value)} required placeholder="Tu número de CI"/></label><button type="submit" disabled={!asientoId}>Confirmar reserva</button></div></form></section>}
      {section === "reservas" && <section className="client-reservations"><div className="client-section-title"><div><h2>Historial de reservas</h2><p>Las reservas realizadas en este navegador aparecen aquí.</p></div></div>{reservas.length === 0 ? <div className="client-empty">Todavía no tienes reservas. Ve a horarios para elegir tu viaje.</div> : reservas.map(r => <article className="client-reservation-card" key={r.id}><div className="client-reservation-code"><span>BOLETO · {r.id}</span><strong>{r.origen} → {r.destino}</strong><small>{r.bus} · {r.horaSalida} · Asiento {r.numeroAsiento}</small></div><span className={`client-reservation-state ${r.estado.toLowerCase()}`}>{r.estado}</span><div className="client-reservation-actions"><button disabled={r.estado !== "Activa"} onClick={() => boleto(r)}>Generar boleto</button><button disabled={r.estado !== "Activa"} onClick={() => cancelar(r)}>Cancelar reserva</button></div></article>)}</section>}
      <footer className="client-footer">© 2026 Andes Bus · Sucre, Bolivia <span>•</span> Seguridad · Puntualidad · Confianza</footer>
    </section>
  </main>;
}
export default ClientePage;
