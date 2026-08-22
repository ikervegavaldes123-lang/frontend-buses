// src/pages/AutobusesPage.tsx

import { useNavigate } from "react-router-dom";
import AutobusesHome from "../components/autobuses/AutobusesHome";
import { authRepository } from "../repositories/authRepository";

function AutobusesPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AutobusesHome
      onLogout={handleLogout}
    />
  );
}

export default AutobusesPage;