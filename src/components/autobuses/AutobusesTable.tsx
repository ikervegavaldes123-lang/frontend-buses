// src/components/autobuses/AutobusesTable.tsx

export type Autobus = {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  capacidad: number;
  estado: "Activo" | "Inactivo";
};

type AutobusesTableProps = {
  autobuses: Autobus[];
  onEditar: (autobus: Autobus) => void;
  onEliminar: (id: number) => void;
};

function AutobusesTable({ autobuses, onEditar, onEliminar }: AutobusesTableProps) {
  return (
    <section className="dashboard-panel autobuses-panel">
      <div className="autobuses-panel-header">
        <div>
          <span className="section-eyebrow">TRANSPORTE</span>
          <h2>Lista de Autobuses</h2>
          <p>Autobuses registrados en el sistema</p>
        </div>
        <div className="autobuses-count">
          <strong>{autobuses.length}</strong>
          <span>registrados</span>
        </div>
      </div>

      <div className="autobuses-toolbar">
        <div className="autobus-search">
          <span>⌕</span>
          <input type="text" placeholder="Buscar autobús..." />
        </div>
      </div>

      <div className="table-wrapper autobuses-table-wrapper">
        <table className="autobuses-table">
          <thead>
            <tr>
              <th>PLACA</th>
              <th>MARCA</th>
              <th>MODELO</th>
              <th>CAPACIDAD</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {autobuses.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-table">
                  No hay autobuses registrados.
                </td>
              </tr>
            ) : (
              autobuses.map((autobus) => (
                <tr key={autobus.id}>
                  <td>
                    <span className="bus-plate">{autobus.placa}</span>
                  </td>
                  <td>
                    <div className="bus-brand">
                      <span className="bus-icon">🚌</span>
                      <strong>{autobus.marca}</strong>
                    </div>
                  </td>
                  <td>{autobus.modelo}</td>
                  <td>{autobus.capacidad} pasajeros</td>
                  <td>
                    <span className={`status-badge ${autobus.estado === "Activo" ? "active" : "inactive"}`}>
                      <i /> {autobus.estado}
                    </span>
                  </td>

                  <td>
                    <div className="autobus-actions">
                      <button type="button" className="autobus-edit" onClick={() => onEditar(autobus)}>
                        ✎ Editar
                      </button>
                      <button type="button" className="autobus-delete" onClick={() => onEliminar(autobus.id)}>
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

export default AutobusesTable;
