// src/components/horario-buses/HorarioBusesTable.tsx

export type HorarioBus = {
  id: number;
  bus: string;
  placa: string;
  origen: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
  estado: "Programado" | "En ruta" | "Finalizado";
};

type HorarioBusesTableProps = {
  horarios: HorarioBus[];
  busqueda: string;
  onBusqueda: (valor: string) => void;
  onEditar: (horario: HorarioBus) => void;
  onEliminar: (id: number) => void;
};

function HorarioBusesTable({
  horarios,
  busqueda,
  onBusqueda,
  onEditar,
  onEliminar,
}: HorarioBusesTableProps) {
  return (
    <section className="dashboard-panel">
      <h2>Horario Buses</h2>

      <p>Horarios de salida y llegada de los buses</p>

      <input
        type="text"
        placeholder="Buscar horario..."
        value={busqueda}
        onChange={(event) => onBusqueda(event.target.value)}
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
          {horarios.length === 0 ? (
            <tr>
              <td colSpan={8}>No se encontraron horarios.</td>
            </tr>
          ) : (
            horarios.map((horario) => (
              <tr key={horario.id}>
                <td>{horario.bus}</td>
                <td>{horario.placa}</td>
                <td>{horario.origen}</td>
                <td>{horario.destino}</td>
                <td>{horario.horaSalida}</td>
                <td>{horario.horaLlegada}</td>
                <td>{horario.estado}</td>

                <td>
                  <button type="button" onClick={() => onEditar(horario)}>
                    Editar
                  </button>

                  <button type="button" onClick={() => onEliminar(horario.id)}>
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

export default HorarioBusesTable;
