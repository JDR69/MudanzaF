import instance from "./axios";

const timeout = 10000;

class AyudanteService {
    static getAyudantesDisponibles = () => {
        return instance.get(`/api/ayudante/list`,{
            withCredentials:true,
            timeout
        });
    }    
    static getIntegrantes = (id) => {
        return instance.get(`/api/ayudante/servicio/${id}/list`,{
            withCredentials:true,
            timeout
        });
    }
    static eliminarAsignacion = (id) => {
        return instance.delete(`/api/ayudante/eliminar-asignacion/${id}`,{
            withCredentials:true,
            timeout
        })
    }
    static asignarAyudante = (data) => {
        return instance.post('/api/ayudante/asignar',data,{
            withCredentials:true,
            timeout
        })
    
    }
    static getServicios = () => {
        return instance.get(`/api/servicios/list`,{
            withCredentials:true,
            timeout
        })
    }

   
    
}


export default AyudanteService;
