import { useEffect, useState } from "react";
import {
  listarUsuarios,
  eliminarUsuario,
  cambiarEstadoUsuario
} from "../../services/usuario.service";
import UsuarioForm from "./UsuarioForm";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  const cargarUsuarios = async () => {
    try {
      const res = await listarUsuarios();
      if (res.data?.success) {
        setUsuarios(res.data.data || []);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al cargar usuarios", error);
      setUsuarios([]);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtroEstado === "TODOS") return true;
    return u.estado === filtroEstado;
  });

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    await eliminarUsuario(id);
    cargarUsuarios();
  };

  const cambiarEstado = async (id) => {
    await cambiarEstadoUsuario(id);
    cargarUsuarios();
  };

  return (
    <div>
      <h2>👤 Usuarios</h2>

      <button
        onClick={() => setUsuarioEdit({})}
        style={{ marginBottom: "10px" }}
      >
        ➕ Nuevo Usuario
      </button>

      {usuarioEdit !== null && (
        <UsuarioForm
          usuario={Object.keys(usuarioEdit).length ? usuarioEdit : null}
          onClose={() => setUsuarioEdit(null)}
          onSuccess={() => {
            setUsuarioEdit(null);
            cargarUsuarios();
          }}
        />
      )}

      {/* FILTROS */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setFiltroEstado("TODOS")}>📋 Todos</button>
        <button onClick={() => setFiltroEstado("A")}>🟢 Activos</button>
        <button onClick={() => setFiltroEstado("I")}>🔴 Inactivos</button>
      </div>

      <table border="1" cellPadding="8" width="100%">
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
          {usuariosFiltrados.length === 0 && (
            <tr>
              <td colSpan="5">No hay usuarios</td>
            </tr>
          )}

          {usuariosFiltrados.map((u) => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nombres}</td>
              <td>{u.correo}</td>
              <td>{u.estado === "A" ? "🟢 Activo" : "🔴 Inactivo"}</td>
              <td>
                <button onClick={() => setUsuarioEdit(u)}>✏️ Editar</button>
                <button onClick={() => cambiarEstado(u.id_usuario)}>🔄 Cambiar Estado</button>
                <button onClick={() => eliminar(u.id_usuario)}>🗑 Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
