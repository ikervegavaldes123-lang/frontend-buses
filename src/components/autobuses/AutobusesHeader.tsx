// src/components/autobuses/AutobusesHeader.tsx

type AutobusesHeaderProps = {
  onNuevoAutobus: () => void;
};

function AutobusesHeader({ onNuevoAutobus }: AutobusesHeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Autobuses</h1>
        <p>Gestión y administración de los autobuses</p>
      </div>

      <button
        className="add-driver-button"
        type="button"
        onClick={onNuevoAutobus}
      >
        + Nuevo Autobús
      </button>
    </header>
  );
}

export default AutobusesHeader;
