// src/components/autobuses/AutobusesHeader.tsx

function AutobusesHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Autobuses</h1>
        <p>Gestión y administración de los autobuses</p>
      </div>

      <button
        className="add-driver-button"
        type="button"
      >
        + Nuevo Autobús
      </button>
    </header>
  );
}

export default AutobusesHeader;