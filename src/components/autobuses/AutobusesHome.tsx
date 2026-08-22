// src/components/autobuses/AutobusesHome.tsx

import DashboardSidebar from "../dashboard/DashboardSidebar";
import AutobusesHeader from "./AutobusesHeader";
import AutobusesTable from "./AutobusesTable";
import { authRepository } from "../../repositories/authRepository";

type AutobusesHomeProps = {
  onLogout: () => void;
};

function AutobusesHome({ onLogout }: AutobusesHomeProps) {
  const user = authRepository.getCurrentUser();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        user={user}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <AutobusesHeader />
        <AutobusesTable />
      </main>
    </div>
  );
}

export default AutobusesHome;