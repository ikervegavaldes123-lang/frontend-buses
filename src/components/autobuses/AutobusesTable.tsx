// src/components/autobuses/AutobusesTable.tsx

import { useMemo, useState } from "react";

export type Autobus = {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  capacidad: number;
  estado: "Activo" | "Inactivo";
};

type AutobusesTableProps = {
  autobuses: Autobus[];
  onEditar: (autobus: Autobus) => void;
  onEliminar: (id: number) => void;
};

function AutobusesTable({ autobuses, onEditar, onEliminar }: AutobusesTableProps) {
  const [busqueda, setBusqueda] = useState("");

  const autobusesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) return autobuses;

    return autobuses.filter((autobus) =>
      [
        autobus.placa,
        autobus.marca,
        autobus.modelo,
        autobus.capacidad.toString(),
        autobus.estado,
      ].some((valor) => valor.toLowerCase().includes(texto))
    );
  }, [autobuses, busqueda]);

  return (
    <section className="dashboard-panel autobuses-panel">
      <div className="autobuses-panel-header">
        <div>
          <span className="section-eyebrow">TRANSPORTE</span>
          <h2>Lista de Autobuses</h2>
          <p>Autobuses registrados en el sistema</p>
        </div>
        <div className="autobuses-count">
          <strong>{autobusesFiltrados.length}</strong>
          <span>{busqueda ? "encontrados" : "registrados"}</span>
        </div>
      </div>

      <div className="autobuses-toolbar">
        <div className="autobus-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Buscar autobús..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            aria-label="Buscar autobús"
          />
          {busqueda && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setBusqueda("")}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper autobuses-table-wrapper">
        <table className="autobuses-table">
          <thead>
            <tr>
              <th>PLACA</th>
              <th>MARCA</th>
              <th>MODELO</th>
              <th>CAPACIDAD</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {autobusesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-table">
                  {busqueda
                    ? `No se encontraron autobuses para “${busqueda}”.`
                    : "No hay autobuses registrados."}
                </td>
              </tr>
            ) : (
              autobusesFiltrados.map((autobus) => (
                <tr key={autobus.id}>
                  <td>
                    <span className="bus-plate">{autobus.placa}</span>
                  </td>
                  <td>
                    <div className="bus-brand">
                      <span className="bus-icon">🚌</span>
                      <strong>{autobus.marca}</strong>
                    </div>
                  </td>
                  <td>{autobus.modelo}</td>
                  <td>{autobus.capacidad} pasajeros</td>
                  <td>
                    <span className={`status-badge ${autobus.estado === "Activo" ? "active" : "inactive"}`}>
                      <i /> {autobus.estado}
                    </span>
                  </td>

                  <td>
                    <div className="autobus-actions">
                      <button type="button" className="autobus-edit" onClick={() => onEditar(autobus)}>
                        ✎ Editar
                      </button>
                      <button type="button" className="autobus-delete" onClick={() => onEliminar(autobus.id)}>
                        × Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AutobusesTable;
