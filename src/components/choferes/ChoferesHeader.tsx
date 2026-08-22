// src/components/choferes/ChoferesHeader.tsx

function ChoferesHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Choferes</h1>
        <p>Gestión y administración de choferes</p>
      </div>

      <button
        className="add-driver-button"
        type="button"
      >
        + Nuevo Chofer
      </button>
    </header>
  );
}

export default ChoferesHeader;