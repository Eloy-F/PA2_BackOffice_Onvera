import api from "../api/axios";

export const listarCategorias = () => {
  return api.get("/categorias");
};

export const crearCategoria = (data) => {
  return api.post("/categorias", data);
};

export const actualizarCategoria = (id, data) => {
  return api.put(`/categorias/${id}`, data);
};

export const eliminarCategoria = (id) => {
  return api.delete(`/categorias/${id}`);
};

