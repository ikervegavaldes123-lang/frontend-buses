// src/components/asientos/AsientosTable.tsx

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

function AsientosTable({ asientos, onEditar, onEliminar }: AsientosTableProps) {
  const [busqueda, setBusqueda] = useState("");

  const asientosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return asientos;

    return asientos.filter((asiento) =>
      [asiento.bus, asiento.placa, String(asiento.numero), asiento.tipo, asiento.estado]
        .some((valor) => valor.toLowerCase().includes(texto)),
    );
  }, [asientos, busqueda]);

  return (
    <section className="dashboard-panel">
      <div>
        <h2>Lista de Asientos</h2>
        <p>Estado de los asientos de los buses</p>
      </div>

      <input
        type="text"
        placeholder="Buscar asiento..."
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Bus</th>
            <th>Placa</th>
            <th>N° Asiento</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {asientosFiltrados.length === 0 ? (
            <tr>
              <td colSpan={6}>No hay asientos que coincidan con la búsqueda.</td>
            </tr>
          ) : (
            asientosFiltrados.map((asiento) => (
              <tr key={asiento.id}>
                <td>{asiento.bus}</td>
                <td>{asiento.placa}</td>
                <td>{asiento.numero}</td>
                <td>{asiento.tipo}</td>
                <td>{asiento.estado}</td>

                <td>
                  <button type="button" onClick={() => onEditar(asiento)}>
                    Editar
                  </button>

                  <button type="button" onClick={() => onEliminar(asiento.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default AsientosTable;
