import { useState } from "react";
import { loginUsuario } from "../../services/usuario.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });

  const login = async () => {
    try {
      const res = await loginUsuario(form);

      if (res.data.success) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem(
          "usuario",
          JSON.stringify(res.data.data.usuario)
        );

        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Correo"
        onChange={(e) =>
          setForm({ ...form, correo: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <button onClick={login}>Ingresar</button>
    </div>
  );
}


