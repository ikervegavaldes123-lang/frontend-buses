// src/pages/AsientosPage.tsx

import { useNavigate } from "react-router-dom";
import AsientosHome from "../components/asientos/AsientosHome";
import { authRepository } from "../repositories/authRepository";

function AsientosPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AsientosHome
      onLogout={handleLogout}
    />
  );
}

export default AsientosPage;