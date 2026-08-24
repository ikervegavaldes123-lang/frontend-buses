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

  const disponibles = asientos.filter((a) => a.estado === "Disponible").length;
  const ocupados = asientos.filter((a) => a.estado === "Ocupado").length;
  const reservados = asientos.filter((a) => a.estado === "Reservado").length;

  return (
    <section className="dashboard-panel asientos-panel">
      <div className="asientos-panel-header">
        <div>
          <span className="asientos-eyebrow">CONTROL DE PASAJEROS</span>
          <h2>Gestión de Asientos</h2>
          <p>Consulta y administra la disponibilidad de los asientos</p>
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
          {busqueda && (
            <button type="button" className="asientos-clear" onClick={() => setBusqueda("")}>×</button>
          )}
        </div>

        <select
          className="asientos-filter"
          value={filtroEstado}
          onChange={(event) => setFiltroEstado(event.target.value)}
          aria-label="Filtrar por estado"
        >
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

      <div className="table-wrapper asientos-table-wrapper">
        <table className="asientos-table">
          <thead>
            <tr>
              <th>ASIENTO</th>
              <th>AUTOBÚS</th>
              <th>PLACA</th>
              <th>TIPO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {asientosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="asientos-empty">
                  <span>💺</span>
                  <strong>No se encontraron asientos</strong>
                  <small>Prueba con otra búsqueda o cambia el filtro.</small>
                </td>
              </tr>
            ) : (
              asientosFiltrados.map((asiento) => (
                <tr key={asiento.id}>
                  <td>
                    <div className={`seat-number ${asiento.estado.toLowerCase()}`}>
                      <span>💺</span><strong>{String(asiento.numero).padStart(2, "0")}</strong>
                    </div>
                  </td>
                  <td><div className="seat-bus"><span>🚌</span><strong>{asiento.bus}</strong></div></td>
                  <td><span className="seat-plate">{asiento.placa}</span></td>
                  <td><span className="seat-type">{asiento.tipo}</span></td>
                  <td><span className={`seat-status ${asiento.estado.toLowerCase()}`}><i />{asiento.estado}</span></td>
                  <td>
                    <div className="seat-actions">
                      <button type="button" className="seat-edit" onClick={() => onEditar(asiento)}>✎ Editar</button>
                      <button type="button" className="seat-delete" onClick={() => onEliminar(asiento.id)}>× Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AsientosTable;
