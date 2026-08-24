// src/components/asientos/AsientosHeader.tsx

type AsientosHeaderProps = {
  onNuevoAsiento: () => void;
};

function AsientosHeader({ onNuevoAsiento }: AsientosHeaderProps) {
  return (
    <header className="dashboard-header asientos-header">
      <div>
        <h1>Asientos</h1>
        <p>Gestión y administración de asientos de los buses</p>
      </div>

      <button className="add-driver-button asientos-add-button" type="button" onClick={onNuevoAsiento}>
        <span>＋</span>
        Nuevo Asiento
      </button>
    </header>
  );
}

export default AsientosHeader;
