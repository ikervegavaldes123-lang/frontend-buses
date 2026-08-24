// src/components/horario-buses/HorarioBusesHeader.tsx

type HorarioBusesHeaderProps = {
  onNuevoHorario: () => void;
};

function HorarioBusesHeader({ onNuevoHorario }: HorarioBusesHeaderProps) {
  return (
    <header className="dashboard-header horario-header">
      <div>
        <h1>Horario Buses</h1>
        <p>Gestión y administración de horarios de buses</p>
      </div>

      <button
        className="add-driver-button horario-add-button"
        type="button"
        onClick={onNuevoHorario}
      >
        <span>＋</span>
        Nuevo Horario
      </button>
    </header>
  );
}

export default HorarioBusesHeader;
