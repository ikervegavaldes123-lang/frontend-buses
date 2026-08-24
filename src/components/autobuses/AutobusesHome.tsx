// src/components/autobuses/AutobusesHome.tsx

import { useState } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import AutobusesHeader from "./AutobusesHeader";
import AutobusesTable, { type Autobus } from "./AutobusesTable";
import { authRepository } from "../../repositories/authRepository";
import "./autobuses.css";

type AutobusesHomeProps = {
  onLogout: () => void;
};

const STORAGE_KEY = "frontend-buses-autobuses";

const autobusesIniciales: Autobus[] = [
  { id: 1, placa: "ABC-123", modelo: "2022", marca: "Mercedes Benz", capacidad: 45, estado: "Activo" },
  { id: 2, placa: "DEF-456", modelo: "2021", marca: "Volvo", capacidad: 40, estado: "Activo" },
  { id: 3, placa: "GHI-789", modelo: "2020", marca: "Scania", capacidad: 45, estado: "Inactivo" },
  { id: 4, placa: "JKL-012", modelo: "2023", marca: "Mercedes Benz", capacidad: 50, estado: "Activo" },
];

function cargarAutobuses(): Autobus[] {
  try {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (!guardados) return autobusesIniciales;
    const datos = JSON.parse(guardados) as Autobus[];
    return Array.isArray(datos) ? datos : autobusesIniciales;
  } catch {
    return autobusesIniciales;
  }
}

function AutobusesHome({ onLogout }: AutobusesHomeProps) {
  const user = authRepository.getCurrentUser();
  const [autobuses, setAutobuses] = useState<Autobus[]>(cargarAutobuses);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [autobusEditando, setAutobusEditando] = useState<Autobus | null>(null);

  const guardarAutobuses = (datos: Autobus[]) => {
    setAutobuses(datos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAutobusEditando(null);
  };

  const guardarAutobus = (datos: Omit<Autobus, "id">) => {
    if (autobusEditando) {
      guardarAutobuses(autobuses.map((item) =>
        item.id === autobusEditando.id ? { ...datos, id: item.id } : item
      ));
    } else {
      const nuevoId = autobuses.length ? Math.max(...autobuses.map((item) => item.id)) + 1 : 1;
      guardarAutobuses([...autobuses, { ...datos, id: nuevoId }]);
    }
    cerrarModal();
  };

  const eliminarAutobus = (id: number) => {
    const autobus = autobuses.find((item) => item.id === id);
    if (!autobus) return;
    if (window.confirm(`¿Seguro que quieres eliminar el autobús ${autobus.placa}?`)) {
      guardarAutobuses(autobuses.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar user={user} onLogout={onLogout} />

      <main className="dashboard-content">
        <AutobusesHeader onNuevoAutobus={() => { setAutobusEditando(null); setModalAbierto(true); }} />
        <AutobusesTable
          autobuses={autobuses}
          onEditar={(autobus) => { setAutobusEditando(autobus); setModalAbierto(true); }}
          onEliminar={eliminarAutobus}
        />
      </main>

      {modalAbierto && (
        <div className="modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) cerrarModal();
        }}>
          <form className="driver-form" onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const capacidad = Number(formData.get("capacidad"));
            guardarAutobus({
              placa: String(formData.get("placa") ?? "").trim(),
              marca: String(formData.get("marca") ?? "").trim(),
              modelo: String(formData.get("modelo") ?? "").trim(),
              capacidad: Number.isFinite(capacidad) ? capacidad : 0,
              estado: formData.get("estado") === "Inactivo" ? "Inactivo" : "Activo",
            });
          }}>
            <div className="driver-form-header">
              <div>
                <h2>{autobusEditando ? "Editar Autobús" : "Nuevo Autobús"}</h2>
                <p>Completa los datos del autobús.</p>
              </div>
              <button type="button" className="modal-close" onClick={cerrarModal}>×</button>
            </div>

            <label>Placa
              <input name="placa" type="text" defaultValue={autobusEditando?.placa ?? ""} placeholder="Ej. ABC-123" required />
            </label>
            <label>Marca
              <input name="marca" type="text" defaultValue={autobusEditando?.marca ?? ""} placeholder="Ej. Mercedes Benz" required />
            </label>
            <label>Modelo
              <input name="modelo" type="text" defaultValue={autobusEditando?.modelo ?? ""} placeholder="Ej. 2024" required />
            </label>
            <label>Capacidad de pasajeros
              <input name="capacidad" type="number" min="1" defaultValue={autobusEditando?.capacidad ?? ""} placeholder="Ej. 45" required />
            </label>
            <label>Estado
              <select name="estado" defaultValue={autobusEditando?.estado ?? "Activo"}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </label>

            <div className="driver-form-actions">
              <button type="button" className="secondary-button" onClick={cerrarModal}>Cancelar</button>
              <button type="submit" className="primary-button">
                {autobusEditando ? "Guardar cambios" : "Guardar autobús"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AutobusesHome;
