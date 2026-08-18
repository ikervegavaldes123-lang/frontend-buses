import type { User } from "../../types/auth";

type DashboardSidebarProps = {
  user: User | null;
  onLogout: () => void;
};

function DashboardSidebar({ user, onLogout }: DashboardSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="sidebar-brand">
          <strong>Sistemas de Gestión</strong>
          <span>Transporte</span>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          <button className="sidebar-link active" type="button">
            <span>▦</span> Dashboard
          </button>
          <button className="sidebar-link" type="button">
            <span>♙</span> Choferes
          </button>
          <button className="sidebar-link" type="button">
            <span>▣</span> Buses
          </button>
          <button className="sidebar-link" type="button">
            <span>◷</span> Horario Buses
          </button>
          <button className="sidebar-link" type="button">
            <span>▤</span> Asientos
          </button>
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{user?.name?.charAt(0).toUpperCase() ?? "A"}</div>
        <div className="user-info">
          <strong>{user?.name ?? "Administrador"}</strong>
          <span>{user?.carnet ?? "admin@gmail.com"}</span>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}>
          Salir
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
