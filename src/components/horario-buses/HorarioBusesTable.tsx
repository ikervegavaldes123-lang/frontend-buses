// src/components/horario-buses/HorarioBusesTable.tsx

type HorarioBus = {
  id: number;
  bus: string;
  placa: string;
  origen: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
  estado: "Programado" | "En ruta" | "Finalizado";
};

const horarios: HorarioBus[] = [
  {
    id: 1,
    bus: "Bus 001",
    placa: "ABC-123",
    origen: "Sucre",
    destino: "La Paz",
    horaSalida: "06:00",
    horaLlegada: "14:00",
    estado: "Programado",
  },
  {
    id: 2,
    bus: "Bus 002",
    placa: "DEF-456",
    origen: "Sucre",
    destino: "Cochabamba",
    horaSalida: "08:30",
    horaLlegada: "15:30",
    estado: "En ruta",
  },
  {
    id: 3,
    bus: "Bus 003",
    placa: "GHI-789",
    origen: "Sucre",
    destino: "Santa Cruz",
    horaSalida: "10:00",
    horaLlegada: "18:00",
    estado: "Programado",
  },
  {
    id: 4,
    bus: "Bus 004",
    placa: "JKL-012",
    origen: "Sucre",
    destino: "Potosí",
    horaSalida: "15:00",
    horaLlegada: "18:30",
    estado: "Finalizado",
  },
];

function HorarioBusesTable() {
  return (
    <section className="dashboard-panel">
      <h2>Horario Buses</h2>

      <p>Horarios de salida y llegada de los buses</p>

      <input
        type="text"
        placeholder="Buscar horario..."
      />

      <table>
        <thead>
          <tr>
            <th>Bus</th>
            <th>Placa</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Hora Salida</th>
            <th>Hora Llegada</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id}>
              <td>{horario.bus}</td>
              <td>{horario.placa}</td>
              <td>{horario.origen}</td>
              <td>{horario.destino}</td>
              <td>{horario.horaSalida}</td>
              <td>{horario.horaLlegada}</td>
              <td>{horario.estado}</td>

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

export default HorarioBusesTable;