// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChoferesPage from "./pages/ChoferesPage";
import AutobusesPage from "./pages/AutobusesPage";
import HorarioBusesPage from "./pages/HorarioBusesPage";
import AsientosPage from "./pages/AsientosPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/choferes"
          element={<ChoferesPage />}
        />

        <Route
          path="/autobuses"
          element={<AutobusesPage />}
        />

        <Route
          path="/horario-buses"
          element={<HorarioBusesPage />}
        />

        <Route
          path="/asientos"
          element={<AsientosPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;