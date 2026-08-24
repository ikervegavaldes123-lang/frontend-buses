// src/components/asientos/AsientosHome.tsx

import { useState } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import AsientosHeader from "./AsientosHeader";
import AsientosTable, { type Asiento } from "./AsientosTable";
import { authRepository } from "../../repositories/authRepository";
import "./asientos.css";

type AsientosHomeProps = { onLogout: () => void };

const ASIENTOS_STORAGE_KEY = "frontend-buses-asientos";

const asientosIniciales: Asiento[] = [
  { id: 1, bus: "Bus 001", placa: "ABC-123", numero: 1, tipo: "Preferencial", estado: "Disponible" },
  { id: 2, bus: "Bus 001", placa: "ABC-123", numero: 2, tipo: "Preferencial", estado: "Ocupado" },
  { id: 3, bus: "Bus 001", placa: "ABC-123", numero: 3, tipo: "Normal", estado: "Disponible" },
  { id: 4, bus: "Bus 002", placa: "DEF-456", numero: 1, tipo: "Preferencial", estado: "Reservado" },
  { id: 5, bus: "Bus 002", placa: "DEF-456", numero: 2, tipo: "Normal", estado: "Disponible" },
  { id: 6, bus: "Bus 003", placa: "GHI-789", numero: 1, tipo: "Normal", estado: "Ocupado" },
];

function cargarAsientos(): Asiento[] {
  try {
    const guardados = localStorage.getItem(ASIENTOS_STORAGE_KEY);
    if (!guardados) return asientosIniciales;
    const datos = JSON.parse(guardados) as Asiento[];
    return Array.isArray(datos) ? datos : asientosIniciales;
  } catch {
    return asientosIniciales;
  }
}

function AsientosHome({ onLogout }: AsientosHomeProps) {
  const user = authRepository.getCurrentUser();
  const [asientos, setAsientos] = useState<Asiento[]>(cargarAsientos);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [asientoEditando, setAsientoEditando] = useState<Asiento | null>(null);

  const guardarAsientos = (nuevos: Asiento[]) => {
    setAsientos(nuevos);
    localStorage.setItem(ASIENTOS_STORAGE_KEY, JSON.stringify(nuevos));
  };

  const cerrarModal = () => { setModalAbierto(false); setAsientoEditando(null); };

  const eliminarAsiento = (id: number) => {
    const asiento = asientos.find((item) => item.id === id);
    if (asiento && window.confirm(`¿Seguro que quieres eliminar el asiento ${asiento.numero} del ${asiento.bus}?`)) {
      guardarAsientos(asientos.filter((item) => item.id !== id));
    }
  };

  const guardarAsiento = (datos: Omit<Asiento, "id">) => {
    if (asientoEditando) {
      guardarAsientos(asientos.map((item) => item.id === asientoEditando.id ? { ...datos, id: item.id } : item));
    } else {
      const nuevoId = asientos.length ? Math.max(...asientos.map((item) => item.id)) + 1 : 1;
      guardarAsientos([...asientos, { ...datos, id: nuevoId }]);
    }
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar user={user} onLogout={onLogout} />
      <main className="dashboard-content">
        <AsientosHeader onNuevoAsiento={() => { setAsientoEditando(null); setModalAbierto(true); }} />
        <AsientosTable asientos={asientos} onEditar={(asiento) => { setAsientoEditando(asiento); setModalAbierto(true); }} onEliminar={eliminarAsiento} />
      </main>

      {modalAbierto && (
        <div className="modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) cerrarModal(); }}>
          <form className="driver-form" onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            guardarAsiento({
              bus: String(formData.get("bus") ?? "").trim(),
              placa: String(formData.get("placa") ?? "").trim(),
              numero: Number(formData.get("numero")),
              tipo: formData.get("tipo") === "Preferencial" ? "Preferencial" : "Normal",
              estado: formData.get("estado") === "Ocupado" ? "Ocupado" : formData.get("estado") === "Reservado" ? "Reservado" : "Disponible",
            });
          }}>
            <div className="driver-form-header">
              <div><h2>{asientoEditando ? "Editar Asiento" : "Nuevo Asiento"}</h2><p>Completa los datos del asiento.</p></div>
              <button type="button" className="modal-close" aria-label="Cerrar" onClick={cerrarModal}>×</button>
            </div>
            <label>Bus<input name="bus" type="text" defaultValue={asientoEditando?.bus ?? ""} placeholder="Ej. Bus 001" required /></label>
            <label>Placa<input name="placa" type="text" defaultValue={asientoEditando?.placa ?? ""} placeholder="Ej. ABC-123" required /></label>
            <label>N° Asiento<input name="numero" type="number" min="1" defaultValue={asientoEditando?.numero ?? ""} required /></label>
            <label>Tipo<select name="tipo" defaultValue={asientoEditando?.tipo ?? "Normal"}><option value="Normal">Normal</option><option value="Preferencial">Preferencial</option></select></label>
            <label>Estado<select name="estado" defaultValue={asientoEditando?.estado ?? "Disponible"}><option value="Disponible">Disponible</option><option value="Ocupado">Ocupado</option><option value="Reservado">Reservado</option></select></label>
            <div className="driver-form-actions"><button type="button" className="secondary-button" onClick={cerrarModal}>Cancelar</button><button type="submit" className="primary-button">{asientoEditando ? "Guardar cambios" : "Guardar asiento"}</button></div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AsientosHome;
