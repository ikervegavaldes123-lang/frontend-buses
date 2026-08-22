import { useNavigate } from "react-router-dom";
import ChoferesHome from "../components/choferes/ChoferesHome";
import { authRepository } from "../repositories/authRepository";

function ChoferesPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <ChoferesHome
      onLogout={handleLogout}
    />
  );
}

export default ChoferesPage;