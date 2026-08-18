const metrics = [
  { label: "Pasajes vendidos", value: 85, tone: "blue" },
  { label: "Turnos completados", value: 92, tone: "green" },
  { label: "Satisfacción del cliente", value: 74, tone: "purple" },
];

function WeeklyPerformance() {
  return (
    <section className="dashboard-panel performance-panel">
      <h2>Rendimiento Semanal</h2>
      {metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <div className="metric-heading">
            <span>{metric.label}</span>
            <strong>{metric.value}%</strong>
          </div>
          <div className="metric-track">
            <div
              className={`metric-fill ${metric.tone}`}
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      ))}
      <div className="panel-divider" />
    </section>
  );
}

export default WeeklyPerformance;
