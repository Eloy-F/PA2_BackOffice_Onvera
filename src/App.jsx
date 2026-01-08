import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

// Usuarios
import UsuarioList from "./pages/usuarios/UsuarioList";
import UsuarioForm from "./pages/usuarios/UsuarioForm";

// Películas
import PeliculaList from "./pages/peliculas/PeliculaList";
import PeliculaForm from "./pages/peliculas/PeliculasForm";

// Categorías
import CategoriaList from "./pages/categorias/CategoriaList";
import CategoriaForm from "./pages/categorias/CategoriaForm";

function App() {
  return (
    <Routes>

      {/* Layout principal */}
      <Route path="/" element={<DashboardLayout />}>

        {/* Redirección */}
        <Route index element={<Navigate to="/peliculas" />} />

        {/* Películas */}
        <Route path="peliculas" element={<PeliculaList />} />
        <Route path="peliculas/nuevo" element={<PeliculaForm />} />
        <Route path="peliculas/editar/:id" element={<PeliculaForm />} />

        {/* Usuarios */}
        <Route path="usuarios" element={<UsuarioList />} />
        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="usuarios/editar/:id" element={<UsuarioForm />} />

        {/* Categorías */}
        <Route path="categorias" element={<CategoriaList />} />
        <Route path="categorias/nuevo" element={<CategoriaForm />} />
        <Route path="categorias/editar/:id" element={<CategoriaForm />} />

      </Route>

    </Routes>
  );
}

export default App;
