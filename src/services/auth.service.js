import api from "../api/axios";

// LOGIN
export const login = (data) => {
  return api.post("/usuarios/login", data);
};

// VERIFICAR TOKEN
export const verificar = () => {
  return api.get("/usuarios/verificar");
};
