import DashboardSidebar from "../dashboard/DashboardSidebar";
import ChoferesHeader from "./ChoferesHeader";
import ChoferesTable from "./ChoferesTable";
import { authRepository } from "../../repositories/authRepository";

type ChoferesHomeProps = {
  onLogout: () => void;
};

function ChoferesHome({ onLogout }: ChoferesHomeProps) {
  const user = authRepository.getCurrentUser();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        user={user}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <ChoferesHeader />
        <ChoferesTable />
      </main>
    </div>
  );
}

export default ChoferesHome;