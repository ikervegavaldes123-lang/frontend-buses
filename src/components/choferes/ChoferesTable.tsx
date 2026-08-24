// src/components/choferes/ChoferesTable.tsx

import type { Chofer } from "./ChoferesHome";

type ChoferesTableProps = {
  choferes: Chofer[];
  onEditar: (chofer: Chofer) => void;
  onEliminar: (id: number) => void;
};

function ChoferesTable({
  choferes,
  onEditar,
  onEliminar,
}: ChoferesTableProps) {
  return (
    <section className="dashboard-panel choferes-panel">
      <div className="panel-title-row">
        <div>
          <h2>Lista de Choferes</h2>
          <p>{choferes.length} choferes registrados</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Carnet</th>
              <th>Teléfono</th>
              <th>Licencia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {choferes.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-table">
                  No hay choferes registrados. Presiona “Nuevo Chofer” para agregar uno.
                </td>
              </tr>
            ) : (
              choferes.map((chofer) => (
                <tr key={chofer.id}>
                  <td>{chofer.nombre}</td>
                  <td>{chofer.carnet}</td>
                  <td>{chofer.telefono}</td>
                  <td>{chofer.licencia}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        chofer.estado === "Activo" ? "active" : "inactive"
                      }`}
                    >
                      {chofer.estado}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => onEditar(chofer)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => onEliminar(chofer.id)}
                      >
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

export default ChoferesTable;
