// src/components/asientos/AsientosHome.tsx

import DashboardSidebar from "../dashboard/DashboardSidebar";
import AsientosHeader from "./AsientosHeader";
import AsientosTable from "./AsientosTable";
import { authRepository } from "../../repositories/authRepository";

type AsientosHomeProps = {
  onLogout: () => void;
};

function AsientosHome({ onLogout }: AsientosHomeProps) {
  const user = authRepository.getCurrentUser();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        user={user}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <AsientosHeader />
        <AsientosTable />
      </main>
    </div>
  );
}

export default AsientosHome;