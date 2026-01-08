import { useEffect, useState } from "react";
import {crearUsuario,actualizarUsuario} from "../../services/usuario.service";

export default function UsuarioForm({ usuario, onSuccess, onClose }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    estado: "A",
  });

  /* ===========================
     CARGAR DATOS SI ES EDICIÓN
  =========================== */
  useEffect(() => {
    if (usuario) {
      setForm({
        nombres: usuario.nombres || "",
        apellidos: usuario.apellidos || "",
        correo: usuario.correo || "",
        password: "", // nunca mostrar password
        estado: usuario.estado || "A",
      });
    }
  }, [usuario]);

  /* ===========================
     HANDLE CHANGE
  =========================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ===========================
     GUARDAR
  =========================== */
  const guardar = async () => {
    if (!form.nombres || !form.correo) {
      alert("Nombres y correo son obligatorios");
      return;
    }

    try {
      if (usuario) {
        await actualizarUsuario(usuario.id_usuario, form);
      } else {
        await crearUsuario(form);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al guardar usuario");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 15, marginBottom: 20 }}>
      <h3>{usuario ? "✏️ Editar Usuario" : "➕ Nuevo Usuario"}</h3>

      <input
        name="nombres"
        placeholder="Nombres"
        value={form.nombres}
        onChange={handleChange}
      />

      <br />

      <input
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={handleChange}
      />

      <br />

      <input
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
      />

      <br />

      {!usuario && (
        <>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <br />
        </>
      )}

      <select
        name="estado"
        value={form.estado}
        onChange={handleChange}
      >
        <option value="A">Activo</option>
        <option value="I">Inactivo</option>
      </select>

      <br /><br />

      <button onClick={guardar}>
        {usuario ? "Actualizar" : "Guardar"}
      </button>

      <button onClick={onClose} style={{ marginLeft: 10 }}>
        Cancelar
      </button>
    </div>
  );
}
