
import { useMemo, useState } from "react";

export type Asiento = {
  id: number;
  bus: string;
  placa: string;
  numero: number;
  tipo: "Normal" | "Preferencial";
  estado: "Disponible" | "Ocupado" | "Reservado";
};

type AsientosTableProps = {
  asientos: Asiento[];
  onEditar: (asiento: Asiento) => void;
  onEliminar: (id: number) => void;
};

function AsientosTable({
  asientos,
  onEditar,
  onEliminar,
}: AsientosTableProps) {
  const [busqueda, setBusqueda] = useState("");
  const [busSeleccionado, setBusSeleccionado] = useState("Todos");
  const [asientoSeleccionado, setAsientoSeleccionado] =
    useState<number | null>(null);

  const buses = useMemo(
    () => [...new Set(asientos.map((a) => a.placa))],
    [asientos]
  );

  const asientosBus = useMemo(
    () =>
      asientos.filter(
        (a) =>
          busSeleccionado === "Todos" || a.placa === busSeleccionado
      ),
    [asientos, busSeleccionado]
  );

  const filtrados = asientosBus.filter((a) =>
    `${a.bus} ${a.placa} ${a.numero} ${a.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim())
  );

  const seleccionado = asientos.find(
    (a) => a.id === asientoSeleccionado
  );

  const disponibles = asientosBus.filter(
    (a) => a.estado === "Disponible"
  ).length;

  const ocupados = asientosBus.filter(
    (a) => a.estado === "Ocupado"
  ).length;

  const reservados = asientosBus.filter(
    (a) => a.estado === "Reservado"
  ).length;

  const claseEstado = (estado: Asiento["estado"]) =>
    estado.toLowerCase();

  return (
    <section className="dashboard-panel asientos-panel">
      <div className="asientos-panel-header">
        <div>
          <span className="asientos-eyebrow">
            ANDES BUS · CONTROL DE ASIENTOS
          </span>
          <h2>Asientos</h2>
          <p>Selecciona un asiento para consultar su información.</p>
        </div>

        <label className="asientos-bus-select">
          Autobús
          <select
            value={busSeleccionado}
            onChange={(e) => {
              setBusSeleccionado(e.target.value);
              setAsientoSeleccionado(null);
            }}
          >
            <option value="Todos">Todos los autobuses</option>
            {buses.map((placa) => (
              <option key={placa} value={placa}>
                {placa}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="asientos-summary">
        <div className="seat-summary available">
          <strong>{disponibles}</strong>
          <span>Disponibles</span>
        </div>
        <div className="seat-summary occupied">
          <strong>{ocupados}</strong>
          <span>Ocupados</span>
        </div>
        <div className="seat-summary reserved">
          <strong>{reservados}</strong>
          <span>Reservados</span>
        </div>
      </div>

      <div className="asientos-prototype">
        <div className="bus-layout-card">
          <div className="bus-layout-heading">
            <div>
              <span className="asientos-eyebrow">DISTRIBUCIÓN</span>
              <h3>Mapa del autobús</h3>
            </div>
            <span className="bus-steering" title="Parte delantera">
              VOLANTE ↑
            </span>
          </div>

          <div className="bus-seat-layout">
            <div className="bus-aisle-label">VENTANILLA</div>

            <div className="bus-seat-grid">
              {filtrados.map((asiento) => (
                <button
                  key={asiento.id}
                  type="button"
                  title={`Asiento ${asiento.numero} · ${asiento.estado}`}
                  aria-pressed={asientoSeleccionado === asiento.id}
                  className={[
                    "bus-seat",
                    claseEstado(asiento.estado),
                    asientoSeleccionado === asiento.id
                      ? "selected"
                      : "",
                  ].join(" ")}
                  onClick={() =>
                    setAsientoSeleccionado(asiento.id)
                  }
                >
                  <span>●</span>
                  {asiento.numero}
                </button>
              ))}
            </div>

            {filtrados.length === 0 && (
              <p className="asientos-no-results">
                No hay asientos para mostrar.
              </p>
            )}

            <div className="bus-aisle-label">VENTANILLA</div>
          </div>

          <div className="seat-legend">
            <span>
              <i className="legend-seat selected-legend" />
              Seleccionado
            </span>
            <span>
              <i className="legend-seat available-seat" />
              Disponible
            </span>
            <span>
              <i className="legend-seat occupied-seat" />
              Ocupado
            </span>
            <span>
              <i className="legend-seat reserved-seat" />
              Reservado
            </span>
          </div>
        </div>

        <aside className="seat-information">
          <div className="seat-info-title">
            <span className="asientos-eyebrow">DETALLES</span>
            <h3>Información del asiento</h3>
          </div>

          {seleccionado ? (
            <>
              <div className="seat-info-number">
                <span>💺</span>
                <div>
                  <small>Asiento número</small>
                  <strong>
                    {String(seleccionado.numero).padStart(2, "0")}
                  </strong>
                </div>
              </div>

              <dl className="seat-info-list">
                <div>
                  <dt>Autobús</dt>
                  <dd>{seleccionado.bus}</dd>
                </div>
                <div>
                  <dt>Placa</dt>
                  <dd>{seleccionado.placa}</dd>
                </div>
                <div>
                  <dt>Tipo</dt>
                  <dd>{seleccionado.tipo}</dd>
                </div>
                <div>
                  <dt>Estado</dt>
                  <dd>
                    <span
                      className={`seat-status ${claseEstado(
                        seleccionado.estado
                      )}`}
                    >
                      {seleccionado.estado}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="seat-info-actions">
                <button
                  type="button"
                  className="seat-edit"
                  onClick={() => onEditar(seleccionado)}
                >
                  ✎ Editar
                </button>
                <button
                  type="button"
                  className="seat-delete"
                  onClick={() => onEliminar(seleccionado.id)}
                >
                  × Eliminar
                </button>
              </div>
            </>
          ) : (
            <div className="seat-info-empty">
              <span>💺</span>
              <p>Selecciona un asiento del mapa para ver sus datos.</p>
            </div>
          )}

          <div className="seat-info-note">
            <strong>Nota</strong>
            <p>
              Los colores indican el estado registrado de cada asiento.
            </p>
          </div>
        </aside>
      </div>

      <div className="asientos-search-footer">
        <label htmlFor="buscar-asiento">Buscar asiento</label>
        <input
          id="buscar-asiento"
          type="search"
          placeholder="Buscar por número, autobús o placa..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
    </section>
  );
}

export default AsientosTable;
