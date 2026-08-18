import DashboardSidebar from "./DashboardSidebar";
import StatCard from "./StatCard";
import RecentShifts from "./RecentShifts";
import WeeklyPerformance from "./WeeklyPerformance";
import type { User } from "../../types/auth";

 type DashboardHomeProps = {
  user: User | null;
  onLogout: () => void;
};

function DashboardHome({ user, onLogout }: DashboardHomeProps) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar user={user} onLogout={onLogout} />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Resumen general del sistema</p>
          </div>
        </header>

        <section className="stats-grid" aria-label="Resumen">
          <StatCard label="Choferes activos" value="24" icon="P" tone="blue" />
          <StatCard label="Turnos Hoy" value="18" icon="T" tone="green" />
          <StatCard label="Pasajes Vendidos" value="342" icon="P" tone="purple" />
          <StatCard label="Ingresos Hoy" value="$1,250" icon="$" tone="orange" />
        </section>

        <section className="dashboard-grid">
          <RecentShifts />
          <WeeklyPerformance />
        </section>
      </main>
    </div>
  );
}

export default DashboardHome;
