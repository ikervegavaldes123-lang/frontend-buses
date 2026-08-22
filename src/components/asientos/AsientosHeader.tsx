// src/components/asientos/AsientosHeader.tsx

function AsientosHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Asientos</h1>
        <p>Gestión y administración de asientos de los buses</p>
      </div>

      <button
        className="add-driver-button"
        type="button"
      >
        + Nuevo Asiento
      </button>
    </header>
  );
}

export default AsientosHeader;