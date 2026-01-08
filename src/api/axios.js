import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1"
});

// 🔐 INTERCEPTOR PARA ENVIAR TOKEN
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


/*import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1" //puerto del backend
});

export default api;*/

