type StatCardProps = {
  label: string;
  value: string;
  icon: string;
  tone: "blue" | "green" | "purple" | "orange";
};

function StatCard({ label, value, icon, tone }: StatCardProps) {
  return (
    <article className="stat-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <span className={`stat-icon ${tone}`}>{icon}</span>
    </article>
  );
}

export default StatCard;
