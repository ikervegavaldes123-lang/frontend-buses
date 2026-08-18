const shifts = [
  { name: "Juan Perez", route: "Ruta 101", time: "08:00-16:00" },
  { name: "Maria Garcia", route: "Ruta 205", time: "09:00-17:00" },
  { name: "Carlos Lopez", route: "Ruta 103", time: "06:00-14:00" },
];

function RecentShifts() {
  return (
    <section className="dashboard-panel recent-panel">
      <h2>Turnos Recientes</h2>
      <div className="shift-list">
        {shifts.map((shift) => (
          <article className="shift-item" key={shift.name}>
            <div>
              <strong>{shift.name}</strong>
              <span>{shift.route}</span>
            </div>
            <div className="shift-status">
              <span>En curso</span>
              <small>{shift.time}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecentShifts;
