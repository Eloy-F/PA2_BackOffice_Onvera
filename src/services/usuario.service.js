import api from "../api/axios";


//LOGIN
export const loginUsuario = (data) => {
  return api.post("/usuarios/login", data);
};

// LISTAR
export const listarUsuarios = () => {
  return api.get("/usuarios");
};

// CREAR
export const crearUsuario = (data) => {
  return api.post("/usuarios", data);
};

// ACTUALIZAR
export const actualizarUsuario = (id, data) => {
  return api.put(`/usuarios/${id}`, data);
};

// CAMBIAR ESTADO
export const cambiarEstadoUsuario = (id) => {
  return api.put(`/usuarios/${id}/estado`);
};

// ELIMINAR (opcional)
export const eliminarUsuario = (id) => {
  return api.delete(`/usuarios/${id}`);
};
