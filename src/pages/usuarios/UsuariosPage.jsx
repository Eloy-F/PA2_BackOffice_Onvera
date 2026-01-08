import { useEffect, useState } from "react";
import {
  listarUsuarios,
  cambiarEstadoUsuario
} from "../../services/usuario.service";

import UsuarioTable from "./UsuarioTable";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = () => {
    listarUsuarios().then(res => {
      setUsuarios(res.data.data);
    });
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const onCambiarEstado = async (id) => {
    await cambiarEstadoUsuario(id);
    cargarUsuarios();
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <UsuarioTable
        usuarios={usuarios}
        onCambiarEstado={onCambiarEstado}
      />
    </div>
  );
}
