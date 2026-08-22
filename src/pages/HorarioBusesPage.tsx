// src/pages/HorarioBusesPage.tsx

import { useNavigate } from "react-router-dom";
import HorarioBusesHome from "../components/horario-buses/HorarioBusesHome";
import { authRepository } from "../repositories/authRepository";

function HorarioBusesPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <HorarioBusesHome
      onLogout={handleLogout}
    />
  );
}

export default HorarioBusesPage;