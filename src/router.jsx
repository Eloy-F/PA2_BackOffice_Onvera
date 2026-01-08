import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/login/Login";
import PeliculaList from "./pages/peliculas/PeliculaList";
import UsuarioList from "./pages/usuarios/UsuarioList";
import CategoriaList from "./pages/categorias/CategoriaList";

const router = createBrowserRouter([
  //LOGIN PÚBLICO
  {
    path: "/login",
    element: <Login />
  },

  //DASHBOARD PROTEGIDO
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="peliculas" /> },
      { path: "peliculas", element: <PeliculaList /> },
      { path: "usuarios", element: <UsuarioList /> },
      { path: "categorias", element: <CategoriaList /> }
    ]
  }
]);

export default router;
