import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#111",
        color: "#fff",
        height: "100vh",
        padding: 15
      }}
    >
      <h3>ONVERA</h3>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link style={linkStyle} to="/peliculas"> Películas</Link></li>
          <li><Link style={linkStyle} to="/usuarios">Usuarios</Link></li>
          <li><Link style={linkStyle} to="/categorias"> Categorías</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  padding: "8px 0"
};
