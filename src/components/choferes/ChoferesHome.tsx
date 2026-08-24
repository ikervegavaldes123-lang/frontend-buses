import { useState } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ChoferesHeader from "./ChoferesHeader";
import ChoferesTable from "./ChoferesTable";
import { authRepository } from "../../repositories/authRepository";

type ChoferesHomeProps = {
  onLogout: () => void;
};

export type Chofer = {
  id: number;
  nombre: string;
  carnet: string;
  telefono: string;
  licencia: string;
  estado: "Activo" | "Inactivo";
};

const CHOFERES_STORAGE_KEY = "frontend-buses-choferes";

const choferesIniciales: Chofer[] = [
  {
    id: 1,
    nombre: "Juan Perez",
    carnet: "1234567",
    telefono: "70000001",
    licencia: "C-12345",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Maria Garcia",
    carnet: "2345678",
    telefono: "70000002",
    licencia: "C-23456",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos Lopez",
    carnet: "3456789",
    telefono: "70000003",
    licencia: "C-34567",
    estado: "Inactivo",
  },
  {
    id: 4,
    nombre: "Pedro Martinez",
    carnet: "4567890",
    telefono: "70000004",
    licencia: "C-45678",
    estado: "Activo",
  },
];

function cargarChoferes(): Chofer[] {
  try {
    const guardados = localStorage.getItem(CHOFERES_STORAGE_KEY);

    if (!guardados) {
      return choferesIniciales;
    }

    const datos = JSON.parse(guardados) as Chofer[];
    return Array.isArray(datos) ? datos : choferesIniciales;
  } catch {
    return choferesIniciales;
  }
}

function ChoferesHome({ onLogout }: ChoferesHomeProps) {
  const user = authRepository.getCurrentUser();
  const [choferes, setChoferes] = useState<Chofer[]>(cargarChoferes);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [choferEditando, setChoferEditando] = useState<Chofer | null>(null);

  const guardarChoferes = (nuevosChoferes: Chofer[]) => {
    setChoferes(nuevosChoferes);
    localStorage.setItem(
      CHOFERES_STORAGE_KEY,
      JSON.stringify(nuevosChoferes),
    );
  };

  const abrirNuevoChofer = () => {
    setChoferEditando(null);
    setModalAbierto(true);
  };

  const abrirEditarChofer = (chofer: Chofer) => {
    setChoferEditando(chofer);
    setModalAbierto(true);
  };

  const eliminarChofer = (id: number) => {
    const chofer = choferes.find((item) => item.id === id);

    if (!chofer) return;

    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar a ${chofer.nombre}?`,
    );

    if (!confirmar) return;

    guardarChoferes(choferes.filter((item) => item.id !== id));
  };

  const guardarChofer = (datos: Omit<Chofer, "id">) => {
    if (choferEditando) {
      guardarChoferes(
        choferes.map((chofer) =>
          chofer.id === choferEditando.id
            ? { ...datos, id: choferEditando.id }
            : chofer,
        ),
      );
    } else {
      const nuevoId =
        choferes.length > 0
          ? Math.max(...choferes.map((chofer) => chofer.id)) + 1
          : 1;

      guardarChoferes([
        ...choferes,
        {
          ...datos,
          id: nuevoId,
        },
      ]);
    }

    setModalAbierto(false);
    setChoferEditando(null);
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        user={user}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <ChoferesHeader onNuevoChofer={abrirNuevoChofer} />

        <ChoferesTable
          choferes={choferes}
          onEditar={abrirEditarChofer}
          onEliminar={eliminarChofer}
        />
      </main>

      {modalAbierto && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalAbierto(false);
              setChoferEditando(null);
            }
          }}
        >
          <form
            className="driver-form"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);

              guardarChofer({
                nombre: String(formData.get("nombre") ?? "").trim(),
                carnet: String(formData.get("carnet") ?? "").trim(),
                telefono: String(formData.get("telefono") ?? "").trim(),
                licencia: String(formData.get("licencia") ?? "").trim(),
                estado:
                  formData.get("estado") === "Inactivo"
                    ? "Inactivo"
                    : "Activo",
              });
            }}
          >
            <div className="driver-form-header">
              <div>
                <h2>
                  {choferEditando ? "Editar Chofer" : "Nuevo Chofer"}
                </h2>
                <p>Completa los datos del chofer.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                aria-label="Cerrar"
                onClick={() => {
                  setModalAbierto(false);
                  setChoferEditando(null);
                }}
              >
                ×
              </button>
            </div>

            <label>
              Nombre completo
              <input
                name="nombre"
                type="text"
                defaultValue={choferEditando?.nombre ?? ""}
                placeholder="Ej. Juan Perez"
                required
              />
            </label>

            <label>
              Carnet de identidad
              <input
                name="carnet"
                type="text"
                defaultValue={choferEditando?.carnet ?? ""}
                placeholder="Ej. 1234567"
                required
              />
            </label>

            <label>
              Teléfono
              <input
                name="telefono"
                type="tel"
                defaultValue={choferEditando?.telefono ?? ""}
                placeholder="Ej. 70000000"
                required
              />
            </label>

            <label>
              Licencia
              <input
                name="licencia"
                type="text"
                defaultValue={choferEditando?.licencia ?? ""}
                placeholder="Ej. C-12345"
                required
              />
            </label>

            <label>
              Estado
              <select
                name="estado"
                defaultValue={choferEditando?.estado ?? "Activo"}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </label>

            <div className="driver-form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setModalAbierto(false);
                  setChoferEditando(null);
                }}
              >
                Cancelar
              </button>

              <button type="submit" className="primary-button">
                {choferEditando ? "Guardar cambios" : "Guardar chofer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChoferesHome;
