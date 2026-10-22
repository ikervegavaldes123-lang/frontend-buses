import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ChoferDashboardPage from "./pages/ChoferDashboardPage";
import ChoferesPage from "./pages/ChoferesPage";
import AutobusesPage from "./pages/AutobusesPage";
import HorarioBusesPage from "./pages/HorarioBusesPage";
import AsientosPage from "./pages/AsientosPage";
import { authRepository } from "./repositories/authRepository";
import type { UserRole } from "./types/auth";

function RoleRoute({ children, role }: { children: ReactNode; role: UserRole }) {
  const user = authRepository.getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === "ADMIN" ? "/" : "/chofer"} replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RoleRoute role="ADMIN"><HomePage /></RoleRoute>} />
        <Route path="/chofer" element={<RoleRoute role="CHOFER"><ChoferDashboardPage /></RoleRoute>} />
        <Route path="/choferes" element={<RoleRoute role="ADMIN"><ChoferesPage /></RoleRoute>} />
        <Route path="/autobuses" element={<RoleRoute role="ADMIN"><AutobusesPage /></RoleRoute>} />
        <Route path="/horario-buses" element={<RoleRoute role="ADMIN"><HorarioBusesPage /></RoleRoute>} />
        <Route path="/asientos" element={<RoleRoute role="ADMIN"><AsientosPage /></RoleRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
