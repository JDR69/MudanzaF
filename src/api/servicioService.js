import instance from "./axios";

const timeout = 10000;

class ServicioService {
  
  static obtenerDetalleDeServicio = (id) => {
    return instance.get(`/api/servicios/${id}/invoice`, {
      withCredentials: true,
      timeout,
    });
  };
  static obtenerMisServicios = (data) => {
    return instance.get("/api/servicios/mis-servicios", data, {
      withCredentials: true,
      timeout,
    });
  };
  
}

export default ServicioService;
