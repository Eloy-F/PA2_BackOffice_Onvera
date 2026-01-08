import api from "../api/axios";

/* ===========================
   LISTADOS
=========================== */

// Listar todas las películas
export const listarPeliculas = () => {
  return api.get("/peliculas/admin");
};

// Listar por tipo (ADULTOS | NIÑOS)
export const listarPeliculasPorTipo = (tipo) => {
  return api.get(`/peliculas/tipo/${tipo}`);
};

//ADD
export const crearPelicula = (data) => {
  return api.post("/peliculas", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
//update
export const actualizarPelicula = (id, data) => {
  return api.put(`/peliculas/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const cambiarEstadoPelicula = (id) => {
  return api.put(`/peliculas/${id}/estado`);
};

/* ===========================
   ELIMINAR (opcional)
=========================== */

export const eliminarPelicula = (id) => {
  return api.delete(`/peliculas/${id}`);
};
