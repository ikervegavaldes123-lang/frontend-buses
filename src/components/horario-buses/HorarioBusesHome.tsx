// src/components/horario-buses/HorarioBusesHome.tsx

import DashboardSidebar from "../dashboard/DashboardSidebar";
import HorarioBusesHeader from "./HorarioBusesHeader";
import HorarioBusesTable from "./HorarioBusesTable";
import { authRepository } from "../../repositories/authRepository";

type HorarioBusesHomeProps = {
  onLogout: () => void;
};

function HorarioBusesHome({
  onLogout,
}: HorarioBusesHomeProps) {
  const user = authRepository.getCurrentUser();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        user={user}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <HorarioBusesHeader />
        <HorarioBusesTable />
      </main>
    </div>
  );
}

export default HorarioBusesHome;