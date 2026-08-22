// src/components/asientos/AsientosTable.tsx

type Asiento = {
  id: number;
  bus: string;
  placa: string;
  numero: number;
  tipo: "Normal" | "Preferencial";
  estado: "Disponible" | "Ocupado" | "Reservado";
};

const asientos: Asiento[] = [
  {
    id: 1,
    bus: "Bus 001",
    placa: "ABC-123",
    numero: 1,
    tipo: "Preferencial",
    estado: "Disponible",
  },
  {
    id: 2,
    bus: "Bus 001",
    placa: "ABC-123",
    numero: 2,
    tipo: "Preferencial",
    estado: "Ocupado",
  },
  {
    id: 3,
    bus: "Bus 001",
    placa: "ABC-123",
    numero: 3,
    tipo: "Normal",
    estado: "Disponible",
  },
  {
    id: 4,
    bus: "Bus 002",
    placa: "DEF-456",
    numero: 1,
    tipo: "Preferencial",
    estado: "Reservado",
  },
  {
    id: 5,
    bus: "Bus 002",
    placa: "DEF-456",
    numero: 2,
    tipo: "Normal",
    estado: "Disponible",
  },
  {
    id: 6,
    bus: "Bus 003",
    placa: "GHI-789",
    numero: 1,
    tipo: "Normal",
    estado: "Ocupado",
  },
];

function AsientosTable() {
  return (
    <section className="dashboard-panel">
      <div>
        <h2>Lista de Asientos</h2>
        <p>Estado de los asientos de los buses</p>
      </div>

      <input
        type="text"
        placeholder="Buscar asiento..."
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
          {asientos.map((asiento) => (
            <tr key={asiento.id}>
              <td>{asiento.bus}</td>
              <td>{asiento.placa}</td>
              <td>{asiento.numero}</td>
              <td>{asiento.tipo}</td>
              <td>{asiento.estado}</td>

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

export default AsientosTable;