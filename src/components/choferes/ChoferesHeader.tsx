// src/components/choferes/ChoferesHeader.tsx

type ChoferesHeaderProps = {
  onNuevoChofer: () => void;
};

function ChoferesHeader({ onNuevoChofer }: ChoferesHeaderProps) {
  return (
    <header className="dashboard-header choferes-header">
      <div>
        <h1>Choferes</h1>
        <p>Gestión y administración de choferes</p>
      </div>

      <button
        className="add-driver-button"
        type="button"
        onClick={onNuevoChofer}
      >
        + Nuevo Chofer
      </button>
    </header>
  );
}

export default ChoferesHeader;
