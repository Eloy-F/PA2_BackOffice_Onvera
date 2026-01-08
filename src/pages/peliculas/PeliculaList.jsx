import { useEffect, useState } from "react";
import {
  listarPeliculas,
  eliminarPelicula, cambiarEstadoPelicula
} from "../../services/pelicula.service";
import PeliculaForm from "./PeliculasForm";

export default function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  const cargarPeliculas = async () => {
    try {
      const res = await listarPeliculas();

      if (res.data?.success) {
        setPeliculas(res.data.data || []);
      } else {
        setPeliculas([]);
      }
    } catch (error) {
      console.error("Error al cargar películas", error);
      setPeliculas([]);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const cambiarEstado = async (id) => {
  await cambiarEstadoPelicula(id);
  cargarPeliculas(); // recargar
};

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar película?")) return;
    await eliminarPelicula(id);
    cargarPeliculas();
  };

  return (
    <div>
      <h2>🎬 Películas</h2>

      {/* FORMULARIO */}
      <PeliculaForm
        peliculaSeleccionada={peliculaSeleccionada}
        onSuccess={() => {
          setPeliculaSeleccionada(null);
          cargarPeliculas();
        }}
      />

      {/* TABLA */}
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>ID</th>
             <th>Imagen</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Estado</th>
           
            <th>Video</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {peliculas.length === 0 && (
            <tr>
              <td colSpan="6">No hay películas registradas</td>
            </tr>
          )}

          {peliculas.map((p) => (
            <tr key={p.id_pelicula}>
              <td>{p.id_pelicula}</td>

 {/* 🖼 IMAGEN */}
      <td>
        {p.imagen_url ? (
          <img
            src={`http://localhost:3000${p.imagen_url}`}
            alt={p.titulo}
            style={{
              width: 80,
              height: 60,
              objectFit: "cover",
              borderRadius: 6
            }}
          />
        ) : (
          "—"
        )}
      </td>

              <td>{p.titulo}</td>

              {/* 🔥 NOMBRE DE CATEGORÍA */}
              <td>{p.categoria}</td>

              <td>
                {p.estado === "A" ? "🟢 Activa" : "🔴 Inactiva"}
              </td>
             <td>
                {p.video_url ? (
                  <a
                    href={p.video_url}
                    target="_blank"
                    rel="noopener noreferrer">
                    Ver</a>
                ) : (
                  "—"
                )}
              </td>

              <td>
                <button onClick={() => setPeliculaSeleccionada(p)}>
                  ✏️ Editar
                </button>

                <button onClick={() => cambiarEstado(p.id_pelicula)}>
                  {p.estado === "A" ? "🔴 Desactivar" : "🟢 Activar"}
                </button>

                <button onClick={() => eliminar(p.id_pelicula)}>
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
