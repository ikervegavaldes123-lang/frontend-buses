// src/components/horario-buses/HorarioBusesTable.tsx

export type HorarioBus = {
  id: number;
  bus: string;
  placa: string;
  origen: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
  estado: "Programado" | "En ruta" | "Finalizado";
};

type HorarioBusesTableProps = {
  horarios: HorarioBus[];
  busqueda: string;
  onBusqueda: (valor: string) => void;
  onEditar: (horario: HorarioBus) => void;
  onEliminar: (id: number) => void;
};

function HorarioBusesTable({
  horarios,
  busqueda,
  onBusqueda,
  onEditar,
  onEliminar,
}: HorarioBusesTableProps) {
  return (
    <section className="dashboard-panel horario-panel">
      <div className="horario-panel-header">
        <div>
          <span className="horario-eyebrow">OPERACIONES</span>
          <h2>Horarios de Buses</h2>
          <p>Control de salidas y llegadas programadas</p>
        </div>

        <div className="horario-count">
          <strong>{horarios.length}</strong>
          <span>{busqueda ? "encontrados" : "horarios"}</span>
        </div>
      </div>

      <div className="horario-toolbar">
        <div className="horario-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Buscar horario, bus, placa, origen o destino..."
            value={busqueda}
            onChange={(event) => onBusqueda(event.target.value)}
            aria-label="Buscar horario"
          />
          {busqueda && (
            <button
              type="button"
              className="horario-search-clear"
              onClick={() => onBusqueda("")}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper horario-table-wrapper">
        <table className="horario-table">
          <thead>
            <tr>
              <th>BUS</th>
              <th>PLACA</th>
              <th>RUTA</th>
              <th>SALIDA</th>
              <th>LLEGADA</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {horarios.length === 0 ? (
              <tr>
                <td colSpan={7} className="horario-empty">
                  <span>🕐</span>
                  <strong>{busqueda ? "No se encontraron horarios" : "No hay horarios registrados"}</strong>
                  <small>
                    {busqueda
                      ? `No hay resultados para “${busqueda}”.`
                      : "Agrega un nuevo horario para comenzar."}
                  </small>
                </td>
              </tr>
            ) : (
              horarios.map((horario) => (
                <tr key={horario.id}>
                  <td>
                    <div className="horario-bus-cell">
                      <span className="horario-bus-icon">🚌</span>
                      <strong>{horario.bus}</strong>
                    </div>
                  </td>

                  <td>
                    <span className="horario-plate">{horario.placa}</span>
                  </td>

                  <td>
                    <div className="route-cell">
                      <strong>{horario.origen}</strong>
                      <span className="route-arrow">→</span>
                      <strong>{horario.destino}</strong>
                    </div>
                  </td>

                  <td>
                    <div className="time-cell">
                      <span>Salida</span>
                      <strong>{horario.horaSalida}</strong>
                    </div>
                  </td>

                  <td>
                    <div className="time-cell">
                      <span>Llegada</span>
                      <strong>{horario.horaLlegada}</strong>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`horario-status ${
                        horario.estado === "Programado"
                          ? "programado"
                          : horario.estado === "En ruta"
                            ? "ruta"
                            : "finalizado"
                      }`}
                    >
                      <i />
                      {horario.estado}
                    </span>
                  </td>

                  <td>
                    <div className="horario-actions">
                      <button
                        type="button"
                        className="horario-edit"
                        onClick={() => onEditar(horario)}
                      >
                        ✎ Editar
                      </button>
                      <button
                        type="button"
                        className="horario-delete"
                        onClick={() => onEliminar(horario.id)}
                      >
                        × Eliminar
                      </button>
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

export default HorarioBusesTable;
