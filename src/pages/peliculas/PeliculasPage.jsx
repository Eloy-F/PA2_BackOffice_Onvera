import { useState } from "react";
import PeliculaForm from "./PeliculaForm";
import PeliculaList from "./PeliculaList";

export default function PeliculasPage() {

  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  const recargar = () => {
    setPeliculaSeleccionada(null);
  };

  return (
    <>
      <PeliculaForm
        peliculaSeleccionada={peliculaSeleccionada}
        onSuccess={recargar}
      />

      <PeliculaList onEditar={setPeliculaSeleccionada} />
    </>
  );
}
