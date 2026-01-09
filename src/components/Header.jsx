import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 15,
        background: "#eee"
      }}
    >
      <strong>Backoffice ONVERA</strong>

      <div>
        {usuario?.nombres} ({usuario?.rol})
        <button
          onClick={logout}
          style={{ marginLeft: 10 }}
        >
           Salir
        </button>
      </div>
    </header>
  );
}
