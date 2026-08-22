// src/components/choferes/ChoferesTable.tsx

const choferes = [
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

function ChoferesTable() {
  return (
    <section className="dashboard-panel">
      <h2>Lista de Choferes</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Carnet</th>
            <th>Teléfono</th>
            <th>Licencia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {choferes.map((chofer) => (
            <tr key={chofer.id}>
              <td>{chofer.nombre}</td>
              <td>{chofer.carnet}</td>
              <td>{chofer.telefono}</td>
              <td>{chofer.licencia}</td>
              <td>{chofer.estado}</td>

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

export default ChoferesTable;