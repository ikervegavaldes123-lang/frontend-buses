import type { Chofer } from "./ChoferesHome";

type ChoferesTableProps = {
  choferes: Chofer[];
  onEditar: (chofer: Chofer) => void;
  onEliminar: (id: number) => void;
};

function ChoferesTable({ choferes, onEditar, onEliminar }: ChoferesTableProps) {
  return (
    <section className="dashboard-panel choferes-panel">
      <div className="panel-title-row"><div><h2>Carnets de Identidad</h2><p>{choferes.length} choferes registrados</p></div></div>
      {choferes.length === 0 ? (
        <div className="empty-driver-cards"><div className="empty-driver-icon">🪪</div><strong>No hay choferes registrados</strong><span>Presiona “Nuevo Chofer” para agregar el primer carnet.</span></div>
      ) : (
        <div className="driver-cards-grid">
          {choferes.map((chofer) => (
            <article className="driver-id-card" key={chofer.id}>
              <div className="driver-id-top">
                <div className="driver-id-brand"><span className="driver-id-emblem">🪪</span><div><strong>IDENTIFICACIÓN DEL CHOFER</strong><small>SISTEMA DE TRANSPORTE</small></div></div>
                <span className={`status-badge ${chofer.estado === "Activo" ? "active" : "inactive"}`}>{chofer.estado}</span>
              </div>
              <div className="driver-id-body">
                <div className="driver-avatar">{chofer.nombre.split(" ").filter(Boolean).slice(0, 2).map((parte) => parte[0]?.toUpperCase()).join("")}</div>
                <div className="driver-id-info"><span className="driver-id-label">NOMBRE COMPLETO</span><strong>{chofer.nombre}</strong>
                  <div className="driver-id-data"><div><span className="driver-id-label">CARNET DE IDENTIDAD</span><strong>{chofer.carnet}</strong></div><div><span className="driver-id-label">LICENCIA</span><strong>{chofer.licencia}</strong></div></div>
                </div>
              </div>
              <div className="driver-id-contact"><span>📞 {chofer.telefono}</span><span>🚍 Conductor autorizado</span></div>
              <div className="driver-id-actions">
                <button type="button" className="edit-button" onClick={() => onEditar(chofer)}>✏️ Editar</button>
                <button type="button" className="delete-button" onClick={() => onEliminar(chofer.id)}>🗑️ Eliminar</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ChoferesTable;