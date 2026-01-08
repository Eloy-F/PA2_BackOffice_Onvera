export default function UsuarioTable({ usuarios, onCambiarEstado }) {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.id_usuario}>
            <td>{u.id_usuario}</td>
            <td>{u.nombres} {u.apellidos}</td>
            <td>{u.correo}</td>
            <td>{u.estado}</td>
            <td>
              <button onClick={() => onCambiarEstado(u.id_usuario)}>
                {u.estado === "A" ? "Desactivar" : "Activar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
