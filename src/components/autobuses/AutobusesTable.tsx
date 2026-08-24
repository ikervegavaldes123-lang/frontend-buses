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
      <div className="panel-title-row">
        <div>
          <h2>Lista de Autobuses</h2>
          <p>{autobuses.length} autobuses registrados</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autobuses.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-table">
                  No hay autobuses registrados. Presiona “Nuevo Autobús” para agregar uno.
                </td>
              </tr>
            ) : (
              autobuses.map((autobus) => (
                <tr key={autobus.id}>
                  <td>{autobus.placa}</td>
                  <td>{autobus.marca}</td>
                  <td>{autobus.modelo}</td>
                  <td>{autobus.capacidad} pasajeros</td>
                  <td>
                    <span className={`status-badge ${autobus.estado === "Activo" ? "active" : "inactive"}`}>
                      {autobus.estado}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="edit-button" onClick={() => onEditar(autobus)}>
                        Editar
                      </button>
                      <button type="button" className="delete-button" onClick={() => onEliminar(autobus.id)}>
                        Eliminar
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
