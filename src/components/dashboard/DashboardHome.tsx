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
    <div className="dashboard-layout dashboard-main">
      <DashboardSidebar user={user} onLogout={onLogout} />

      <main className="dashboard-content dashboard-main-content">
        <header className="dashboard-header dashboard-main-header">
          <div>
            <span className="dashboard-eyebrow">PANEL DE CONTROL</span>
            <h1>Dashboard</h1>
            <p>Resumen general del sistema de transporte</p>
          </div>
          <div className="dashboard-welcome">
            <span>Estado del sistema</span>
            <strong><i /> Operativo</strong>
          </div>
        </header>

        <section className="stats-grid dashboard-stats" aria-label="Resumen">
          <StatCard label="Choferes activos" value="24" icon="👨‍✈️" tone="blue" />
          <StatCard label="Turnos Hoy" value="18" icon="🕐" tone="green" />
          <StatCard label="Pasajes Vendidos" value="342" icon="🎫" tone="purple" />
          <StatCard label="Ingresos Hoy" value="$1,250" icon="💰" tone="orange" />
        </section>

        <section className="dashboard-grid dashboard-main-grid">
          <RecentShifts />
          <WeeklyPerformance />
        </section>
      </main>
    </div>
  );
}

export default DashboardHome;
