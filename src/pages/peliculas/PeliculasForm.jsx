import { useEffect, useState } from "react";
import { listarCategorias } from "../../services/categoria.service";
import {
  crearPelicula,
  actualizarPelicula
} from "../../services/pelicula.service";

export default function PeliculaForm({ peliculaSeleccionada, onSuccess }) {
  const [form, setForm] = useState({
    titulo: "",
    id_categoria: "",
    descripcion: "",
    video_url: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ===========================
     CARGAR CATEGORÍAS
  =========================== */
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const res = await listarCategorias();
        if (res.data?.success) {
          setCategorias(res.data.data);
        }
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    cargarCategorias();
  }, []);

  /* ===========================
     CARGAR DATOS SI ES EDICIÓN
  =========================== */
  useEffect(() => {
    if (peliculaSeleccionada) {
      setForm({
        titulo: peliculaSeleccionada.titulo || "",
        id_categoria: peliculaSeleccionada.id_categoria || "",
        descripcion: peliculaSeleccionada.descripcion || "",
        video_url: peliculaSeleccionada.video_url || ""
      });

      if (peliculaSeleccionada.imagen_url) {
        setPreview(
          `http://localhost:3000/uploads/${peliculaSeleccionada.imagen_url}`
        );
      }
    } else {
      setForm({
        titulo: "",
        id_categoria: "",
        descripcion: "",
        video_url: ""
      });
      setPreview(null);
      setImagen(null);
    }
  }, [peliculaSeleccionada]);

  /* ===========================
     HANDLE INPUTS
  =========================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ===========================
     GUARDAR (CREAR / ACTUALIZAR)
  =========================== */
  const guardar = async () => {
    try {
      if (!form.titulo || !form.id_categoria) {
        alert("Título y categoría son obligatorios");
        return;
      }

      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("id_categoria", Number(form.id_categoria)); // 🔥 clave
      formData.append("descripcion", form.descripcion);
      formData.append("video_url", form.video_url);

      if (imagen) {
        formData.append("imagen", imagen);
      }

      if (peliculaSeleccionada) {
        await actualizarPelicula(
          peliculaSeleccionada.id_pelicula,
          formData
        );
      } else {
        await crearPelicula(formData);
      }

      onSuccess();

      // limpiar
      setForm({
        titulo: "",
        id_categoria: "",
        descripcion: "",
        video_url: ""
      });
      setImagen(null);
      setPreview(null);
    } catch (error) {
      console.error("Error al guardar película", error);
      alert("No se pudo guardar la película");
    }
  };

  return (
    <div style={{ marginBottom: 20, border: "1px solid #ccc", padding: 15 }}>
      <h3>
        {peliculaSeleccionada ? "✏️ Editar Película" : "➕ Nueva Película"}
      </h3>

      <input
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
      />

      <br /><br />

      {/* SELECT CATEGORÍAS */}
      <select
        name="id_categoria"
        value={form.id_categoria}
        onChange={handleChange}
      >
        <option value="">-- Seleccione categoría --</option>

        {categorias.map((c) => (
          <option key={c.idCategoria} value={c.idCategoria}>
            {c.nombre} ({c.tipo})
          </option>
        ))}
      </select>

      <br /><br />

      {/* IMAGEN */}
      <input type="file" accept="image/*" onChange={handleImagen} />

      {/* PREVIEW */}
      {preview && (
        <div style={{ marginTop: 10 }}>
          <img
            src={preview}
            alt="preview"
            style={{ width: 200, borderRadius: 8 }}
          />
        </div>
      )}

      <br /><br />

      <input
        name="video_url"
        placeholder="URL YouTube"
        value={form.video_url}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={guardar}>
        {peliculaSeleccionada ? "Actualizar" : "Guardar"}
      </button>
    </div>
  );
}
