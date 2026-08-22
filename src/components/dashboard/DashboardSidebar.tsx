// src/components/dashboard/DashboardSidebar.tsx

import { useNavigate, useLocation } from "react-router-dom";
import type { User } from "../../types/auth";

type DashboardSidebarProps = {
  user: User | null;
  onLogout: () => void;
};

function DashboardSidebar({
  user,
  onLogout,
}: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="sidebar-brand">
          <strong>Sistemas de Gestión</strong>
          <span>Transporte</span>
        </div>

        <nav
          className="sidebar-nav"
          aria-label="Navegación principal"
        >
          {/* DASHBOARD */}
          <button
            className={`sidebar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
            type="button"
            onClick={() => navigate("/")}
          >
            <span>▦</span>
            Dashboard
          </button>

          {/* CHOFERES */}
          <button
            className={`sidebar-link ${
              location.pathname === "/choferes"
                ? "active"
                : ""
            }`}
            type="button"
            onClick={() => navigate("/choferes")}
          >
            <span>♙</span>
            Choferes
          </button>

          {/* AUTOBUSES */}
          <button
            className={`sidebar-link ${
              location.pathname === "/autobuses"
                ? "active"
                : ""
            }`}
            type="button"
            onClick={() => navigate("/autobuses")}
          >
            <span>▣</span>
            Autobuses
          </button>

          {/* HORARIO BUSES */}
          <button
            className={`sidebar-link ${
              location.pathname === "/horario-buses"
                ? "active"
                : ""
            }`}
            type="button"
            onClick={() => navigate("/horario-buses")}
          >
            <span>◷</span>
            Horario Buses
          </button>

          {/* ASIENTOS */}
          <button
            className={`sidebar-link ${
              location.pathname === "/asientos"
                ? "active"
                : ""
            }`}
            type="button"
            onClick={() => navigate("/asientos")}
          >
            <span>▤</span>
            Asientos
          </button>
        </nav>
      </div>

      {/* USUARIO */}
      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase() ?? "A"}
        </div>

        <div className="user-info">
          <strong>
            {user?.name ?? "Administrador"}
          </strong>

          <span>
            {user?.carnet ?? "admin@gmail.com"}
          </span>
        </div>

        <button
          className="logout-button"
          type="button"
          onClick={onLogout}
        >
          Salir
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
