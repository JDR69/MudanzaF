import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backendsi2-mudanza.onrender.com',
    timeout:10000
})

instance.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Enviar el token en la cabecera
    }
    return config;
}, (error) => {
    return Promise.reject(error);
} 
)

export default instance;