import axios from 'axios';

// Crear una instancia de axios con configuración básica
const axiosInstance = axios.create({
  baseURL: 'https://api.polygon.io/v2/aggs/ticker/O:SPY251219C00650000/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=8yz8VWhwVib720bkCz_oNLAoIrcmcREj',  // URL base de la API
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${yourToken}`, // Si necesitas un token
  },
});

// Puedes agregar interceptores si es necesario
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores
    return Promise.reject(error);
  }
);

export default axiosInstance;
