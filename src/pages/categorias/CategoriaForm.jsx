import { useEffect, useState } from "react";
import {
  crearCategoria,
  actualizarCategoria
} from "../../services/categoria.service";

export default function CategoriaForm({ categoriaSeleccionada, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipo: ""
  });

  /* ===========================
     CARGAR DATOS SI ES EDICIÓN
  =========================== */
  useEffect(() => {
    if (categoriaSeleccionada) {
      setForm({
        nombre: categoriaSeleccionada.nombre || "",
        descripcion: categoriaSeleccionada.descripcion || "",
        tipo: categoriaSeleccionada.tipo || ""
      });
    } else {
      setForm({ nombre: "", descripcion: "", tipo: "" });
    }
  }, [categoriaSeleccionada]);

  /* ===========================
     HANDLE CHANGE
  =========================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ===========================
     GUARDAR (CREAR / ACTUALIZAR)
  =========================== */
  const guardar = async () => {
    try {
      if (!form.nombre || !form.tipo) {
        alert("Nombre y tipo son obligatorios");
        return;
      }

      if (categoriaSeleccionada) {
        // 🔥 CLAVE: idCategoria (TypeORM)
        await actualizarCategoria(categoriaSeleccionada.idCategoria, form);
      } else {
        await crearCategoria(form);
      }

      onSuccess();
      setForm({ nombre: "", descripcion: "", tipo: "" });
    } catch (error) {
      console.error("Error al guardar categoría", error);
      alert("No se pudo guardar la categoría");
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>
        {categoriaSeleccionada ? "✏️ Editar Categoría" : "➕ Nueva Categoría"}
      </h3>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
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

      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
      >
        <option value="">-- Seleccione tipo --</option>
        <option value="ADULTOS">ADULTOS</option>
        <option value="NIÑOS">NIÑOS</option>
      </select>

      <br /><br />

      <button onClick={guardar}>
        {categoriaSeleccionada ? "Actualizar" : "Guardar"}
      </button>
    </div>
  );
}
