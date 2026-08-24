// src/components/asientos/AsientosHeader.tsx

type AsientosHeaderProps = {
  onNuevoAsiento: () => void;
};

function AsientosHeader({ onNuevoAsiento }: AsientosHeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Asientos</h1>
        <p>Gestión y administración de asientos de los buses</p>
      </div>

      <button
        className="add-driver-button"
        type="button"
        onClick={onNuevoAsiento}
      >
        + Nuevo Asiento
      </button>
    </header>
  );
}

export default AsientosHeader;
