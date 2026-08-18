import { useNavigate } from "react-router-dom";
import DashboardHome from "../components/dashboard/DashboardHome";
import { authRepository } from "../repositories/authRepository";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return <DashboardHome user={user} onLogout={handleLogout} />;
}

export default HomePage;
