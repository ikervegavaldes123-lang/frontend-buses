// src/components/autobuses/AutobusesTable.tsx

type Autobus = {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  capacidad: number;
  estado: "Activo" | "Inactivo";
};

const autobuses: Autobus[] = [
  {
    id: 1,
    placa: "ABC-123",
    modelo: "2022",
    marca: "Mercedes Benz",
    capacidad: 45,
    estado: "Activo",
  },
  {
    id: 2,
    placa: "DEF-456",
    modelo: "2021",
    marca: "Volvo",
    capacidad: 40,
    estado: "Activo",
  },
  {
    id: 3,
    placa: "GHI-789",
    modelo: "2020",
    marca: "Scania",
    capacidad: 45,
    estado: "Inactivo",
  },
  {
    id: 4,
    placa: "JKL-012",
    modelo: "2023",
    marca: "Mercedes Benz",
    capacidad: 50,
    estado: "Activo",
  },
];

function AutobusesTable() {
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
                <button type="button">
                  Editar
                </button>

                <button type="button">
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