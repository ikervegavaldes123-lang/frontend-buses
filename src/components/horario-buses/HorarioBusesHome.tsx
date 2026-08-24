// src/components/horario-buses/HorarioBusesHome.tsx

import { useMemo, useState } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import HorarioBusesHeader from "./HorarioBusesHeader";
import HorarioBusesTable, { type HorarioBus } from "./HorarioBusesTable";
import { authRepository } from "../../repositories/authRepository";

type HorarioBusesHomeProps = {
  onLogout: () => void;
};

const HORARIOS_STORAGE_KEY = "frontend-buses-horarios";

const horariosIniciales: HorarioBus[] = [
  { id: 1, bus: "Bus 001", placa: "ABC-123", origen: "Sucre", destino: "La Paz", horaSalida: "06:00", horaLlegada: "14:00", estado: "Programado" },
  { id: 2, bus: "Bus 002", placa: "DEF-456", origen: "Sucre", destino: "Cochabamba", horaSalida: "08:30", horaLlegada: "15:30", estado: "En ruta" },
  { id: 3, bus: "Bus 003", placa: "GHI-789", origen: "Sucre", destino: "Santa Cruz", horaSalida: "10:00", horaLlegada: "18:00", estado: "Programado" },
  { id: 4, bus: "Bus 004", placa: "JKL-012", origen: "Sucre", destino: "Potosí", horaSalida: "15:00", horaLlegada: "18:30", estado: "Finalizado" },
];

function cargarHorarios(): HorarioBus[] {
  try {
    const guardados = localStorage.getItem(HORARIOS_STORAGE_KEY);
    if (!guardados) return horariosIniciales;
    const datos = JSON.parse(guardados) as HorarioBus[];
    return Array.isArray(datos) ? datos : horariosIniciales;
  } catch {
    return horariosIniciales;
  }
}

function HorarioBusesHome({ onLogout }: HorarioBusesHomeProps) {
  const user = authRepository.getCurrentUser();
  const [horarios, setHorarios] = useState<HorarioBus[]>(cargarHorarios);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [horarioEditando, setHorarioEditando] = useState<HorarioBus | null>(null);

  const guardarHorarios = (datos: HorarioBus[]) => {
    setHorarios(datos);
    localStorage.setItem(HORARIOS_STORAGE_KEY, JSON.stringify(datos));
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setHorarioEditando(null);
  };

  const guardarHorario = (datos: Omit<HorarioBus, "id">) => {
    if (horarioEditando) {
      guardarHorarios(
        horarios.map((horario) =>
          horario.id === horarioEditando.id
            ? { ...datos, id: horarioEditando.id }
            : horario,
        ),
      );
    } else {
      const nuevoId = horarios.length > 0
        ? Math.max(...horarios.map((horario) => horario.id)) + 1
        : 1;

      guardarHorarios([...horarios, { ...datos, id: nuevoId }]);
    }

    cerrarModal();
  };

  const eliminarHorario = (id: number) => {
    const horario = horarios.find((item) => item.id === id);
    if (!horario) return;

    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el horario de ${horario.origen} a ${horario.destino}?`,
    );

    if (!confirmar) return;
    guardarHorarios(horarios.filter((item) => item.id !== id));
  };

  const horariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return horarios;

    return horarios.filter((horario) =>
      [
        horario.bus,
        horario.placa,
        horario.origen,
        horario.destino,
        horario.horaSalida,
        horario.horaLlegada,
        horario.estado,
      ].some((valor) => valor.toLowerCase().includes(texto)),
    );
  }, [horarios, busqueda]);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        user={user}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <HorarioBusesHeader
          onNuevoHorario={() => {
            setHorarioEditando(null);
            setModalAbierto(true);
          }}
        />

        <HorarioBusesTable
          horarios={horariosFiltrados}
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          onEditar={(horario) => {
            setHorarioEditando(horario);
            setModalAbierto(true);
          }}
          onEliminar={eliminarHorario}
        />
      </main>

      {modalAbierto && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) cerrarModal();
          }}
        >
          <form
            className="driver-form"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);

              guardarHorario({
                bus: String(formData.get("bus") ?? "").trim(),
                placa: String(formData.get("placa") ?? "").trim(),
                origen: String(formData.get("origen") ?? "").trim(),
                destino: String(formData.get("destino") ?? "").trim(),
                horaSalida: String(formData.get("horaSalida") ?? ""),
                horaLlegada: String(formData.get("horaLlegada") ?? ""),
                estado: (formData.get("estado") ?? "Programado") as HorarioBus["estado"],
              });
            }}
          >
            <div className="driver-form-header">
              <div>
                <h2>{horarioEditando ? "Editar Horario" : "Nuevo Horario"}</h2>
                <p>Completa los datos del horario.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                aria-label="Cerrar"
                onClick={cerrarModal}
              >
                ×
              </button>
            </div>

            <label>
              Bus
              <input
                name="bus"
                type="text"
                defaultValue={horarioEditando?.bus ?? ""}
                placeholder="Ej. Bus 005"
                required
              />
            </label>

            <label>
              Placa
              <input
                name="placa"
                type="text"
                defaultValue={horarioEditando?.placa ?? ""}
                placeholder="Ej. ABC-123"
                required
              />
            </label>

            <label>
              Origen
              <input
                name="origen"
                type="text"
                defaultValue={horarioEditando?.origen ?? ""}
                placeholder="Ej. Sucre"
                required
              />
            </label>

            <label>
              Destino
              <input
                name="destino"
                type="text"
                defaultValue={horarioEditando?.destino ?? ""}
                placeholder="Ej. La Paz"
                required
              />
            </label>

            <label>
              Hora de salida
              <input
                name="horaSalida"
                type="time"
                defaultValue={horarioEditando?.horaSalida ?? ""}
                required
              />
            </label>

            <label>
              Hora de llegada
              <input
                name="horaLlegada"
                type="time"
                defaultValue={horarioEditando?.horaLlegada ?? ""}
                required
              />
            </label>

            <label>
              Estado
              <select
                name="estado"
                defaultValue={horarioEditando?.estado ?? "Programado"}
              >
                <option value="Programado">Programado</option>
                <option value="En ruta">En ruta</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>

            <div className="driver-form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={cerrarModal}
              >
                Cancelar
              </button>

              <button type="submit" className="primary-button">
                {horarioEditando ? "Guardar cambios" : "Guardar horario"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HorarioBusesHome;
