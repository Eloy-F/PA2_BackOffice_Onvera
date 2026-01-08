import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // No logueado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // No es ADMIN- validamos los array  de roles
  if (!usuario.roles || !usuario.roles.includes("ADMIN")) {    
     <h2>Solo administradores</h2>;
    return <Navigate to="/login" replace />;
  }

  //  ADMIN
  return children;
}
