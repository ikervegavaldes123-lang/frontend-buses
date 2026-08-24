// src/components/autobuses/AutobusesTable.tsx

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
  return (
    <section className="dashboard-panel">
      <div>
        <h2>Lista de Autobuses</h2>
        <p>Autobuses registrados en el sistema</p>
      </div>

      <input
        type="text"
        placeholder="Buscar autobús..."
      />

      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {autobuses.map((autobus) => (
            <tr key={autobus.id}>
              <td>{autobus.placa}</td>
              <td>{autobus.marca}</td>
              <td>{autobus.modelo}</td>
              <td>{autobus.capacidad} pasajeros</td>
              <td>{autobus.estado}</td>

              <td>
                <button type="button" onClick={() => onEditar(autobus)}>
                  Editar
                </button>

                <button type="button" onClick={() => onEliminar(autobus.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AutobusesTable;
