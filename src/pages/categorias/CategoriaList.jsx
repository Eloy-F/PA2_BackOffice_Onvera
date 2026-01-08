import { useEffect, useState } from "react";
import {
  listarCategorias,
  eliminarCategoria
} from "../../services/categoria.service";
import CategoriaForm from "./CategoriaForm";

export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  /* ===========================
     CARGAR CATEGORÍAS
  =========================== */
  const cargarCategorias = async () => {
    try {
      const res = await listarCategorias();
      setCategorias(res.data.data);
    } catch (error) {
      console.error("Error al listar categorías", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  /* ===========================
     ELIMINAR
  =========================== */
  const eliminar = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;

    try {
      await eliminarCategoria(id);
      cargarCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría", error);
      alert("No se pudo eliminar la categoría");
    }
  };

  return (
    <div>
      <h2>📂 Categorías</h2>

      {/* FORMULARIO */}
      <CategoriaForm
        categoriaSeleccionada={categoriaSeleccionada}
        onSuccess={() => {
          setCategoriaSeleccionada(null);
          cargarCategorias();
        }}
      />

      {/* LISTADO */}
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.length === 0 && (
            <tr>
              <td colSpan="5" align="center">
                No hay categorías registradas
              </td>
            </tr>
          )}

          {categorias.map((c) => (
            <tr key={c.idCategoria}>
              <td>{c.idCategoria}</td>
              <td>{c.nombre}</td>
              <td>{c.tipo}</td>
              <td>{c.estado}</td>
              <td>
                <button onClick={() => setCategoriaSeleccionada(c)}>
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminar(c.idCategoria)}
                  style={{ marginLeft: 8 }}
                >
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
