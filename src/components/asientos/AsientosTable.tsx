// src/components/asientos/AsientosTable.tsx

import { useMemo, useState } from "react";

export type Asiento = {
  id: number;
  bus: string;
  placa: string;
  numero: number;
  tipo: "Normal" | "Preferencial";
  estado: "Disponible" | "Ocupado" | "Reservado";
};

type AsientosTableProps = {
  asientos: Asiento[];
  onEditar: (asiento: Asiento) => void;
  onEliminar: (id: number) => void;
};

function AsientosTable({ asientos, onEditar, onEliminar }: AsientosTableProps) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const asientosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    return asientos.filter((asiento) => {
      const coincideTexto = !texto ||
        [asiento.bus, asiento.placa, String(asiento.numero), asiento.tipo, asiento.estado]
          .some((valor) => valor.toLowerCase().includes(texto));
      const coincideEstado = filtroEstado === "Todos" || asiento.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  }, [asientos, busqueda, filtroEstado]);

  const buses = useMemo(() => {
    const grupos = new Map<string, Asiento[]>();
    asientosFiltrados.forEach((asiento) => {
      const grupo = grupos.get(asiento.bus) ?? [];
      grupo.push(asiento);
      grupos.set(asiento.bus, grupo);
    });
    return Array.from(grupos.entries()).map(([nombre, lista]) => ({
      nombre,
      placa: lista[0]?.placa ?? "",
      asientos: lista.sort((a, b) => a.numero - b.numero),
    }));
  }, [asientosFiltrados]);

  const disponibles = asientos.filter((a) => a.estado === "Disponible").length;
  const ocupados = asientos.filter((a) => a.estado === "Ocupado").length;
  const reservados = asientos.filter((a) => a.estado === "Reservado").length;

  return (
    <section className="dashboard-panel asientos-panel">
      <div className="asientos-panel-header">
        <div>
          <span className="asientos-eyebrow">CONTROL DE PASAJEROS</span>
          <h2>Gestión de Asientos</h2>
          <p>Cada autobús tiene su propio cuadro con sus asientos.</p>
        </div>
        <div className="asientos-summary">
          <div className="seat-summary available"><strong>{disponibles}</strong><span>Disponibles</span></div>
          <div className="seat-summary occupied"><strong>{ocupados}</strong><span>Ocupados</span></div>
          <div className="seat-summary reserved"><strong>{reservados}</strong><span>Reservados</span></div>
        </div>
      </div>

      <div className="asientos-toolbar">
        <div className="asientos-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Buscar por bus, placa, asiento o estado..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            aria-label="Buscar asiento"
          />
          {busqueda && <button type="button" className="asientos-clear" onClick={() => setBusqueda("")}>×</button>}
        </div>
        <select className="asientos-filter" value={filtroEstado} onChange={(event) => setFiltroEstado(event.target.value)} aria-label="Filtrar por estado">
          <option value="Todos">Todos los estados</option>
          <option value="Disponible">Disponibles</option>
          <option value="Ocupado">Ocupados</option>
          <option value="Reservado">Reservados</option>
        </select>
      </div>

      <div className="seat-legend">
        <span><i className="legend-seat available-seat" /> Disponible</span>
        <span><i className="legend-seat occupied-seat" /> Ocupado</span>
        <span><i className="legend-seat reserved-seat" /> Reservado</span>
      </div>

      {buses.length === 0 ? (
        <div className="asientos-empty-card">
          <span>💺</span>
          <strong>No se encontraron asientos</strong>
          <small>Prueba con otra búsqueda o cambia el filtro.</small>
        </div>
      ) : (
        <div className="bus-seat-cards">
          {buses.map((bus) => (
            <article className="bus-seat-card" key={bus.nombre}>
              <header className="bus-seat-card-header">
                <div className="bus-seat-card-icon">🚌</div>
                <div>
                  <h3>{bus.nombre}</h3>
                  <p>Placa: {bus.placa}</p>
                </div>
                <span className="bus-seat-count">{bus.asientos.length} asientos</span>
              </header>

              <div className="bus-seat-map">
                <div className="bus-seat-front"><span>▲</span> PARTE DELANTERA · VOLANTE</div>
                <div className="bus-seat-grid">
                  {bus.asientos.map((asiento) => (
                    <div className="bus-seat-item" key={asiento.id}>
                      <button
                        type="button"
                        className={`bus-seat ${asiento.estado.toLowerCase()}`}
                        title={`Asiento ${asiento.numero}: ${asiento.estado}`}
                        aria-label={`Asiento ${asiento.numero}, ${asiento.estado}`}
                      >
                        <span>•</span>
                        <strong>{String(asiento.numero).padStart(2, "0")}</strong>
                      </button>
                      <span className="bus-seat-status">{asiento.estado}</span>
                      <div className="bus-seat-actions">
                        <button type="button" onClick={() => onEditar(asiento)}>Editar</button>
                        <button type="button" onClick={() => onEliminar(asiento.id)}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
                <footer className="bus-seat-card-footer">
                  <span>{bus.asientos.filter((a) => a.estado === "Disponible").length} disponibles</span>
                  <span>{bus.asientos.filter((a) => a.estado === "Ocupado").length} ocupados</span>
                  <span>{bus.asientos.filter((a) => a.estado === "Reservado").length} reservados</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AsientosTable;
