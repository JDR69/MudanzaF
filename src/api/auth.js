import instance from "./axios";

const tiempoEspera = 10000;

export const loginRequest = data => instance.post(`/api/auth/login`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials:true
})

export const registerReques = data => instance.post(`/api/auth/register`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials: true
})

export const obtenerRolesRequest = () => { return instance.get(`/api/rol/get`, {
    withCredentials: true,
    timeout: tiempoEspera
})}


export const obtenerBitacoraRequest = () => { return instance.get(`/api/bitacora/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}


export const registerVehiculo = (data) => instance.post(`/api/veh/reg`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const obtenerTipoVehiculo = () => { return instance.get(`/api/tipoVeh/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

export const obtenerVehiculo = () => { return instance.get(`/api/veh/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

export const registerChofer = (data) => instance.post(`/api/chofer/registrar`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const tipoVehiculoRequest = (data) => instance.post( `/api/tipoVeh/reg`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const actualizarTipoVehiculo = (data,id) => instance.put(`/api/tipoVeh/upd/${id}`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const registrarGaleriaVehiculos = (data,id) => instance.post(`/api/veh/regImg/${id}`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const obtenerCatalogoVehiculo = () => { return instance.get(`/api/veh/getCat`,{
    withCredentials: true,
    timeout: tiempoEspera
})}


export const registrarCategoriaInmueble = (data) => instance.post(`/api/categorias/registrar`,
    data,{
        headers: {
            "Content-Type": "application/json"  },
        withCredentials: true,
        timeout: tiempoEspera
    }
);


export const obtenerCategoriasRequest = () => instance.get(`/api/categorias/get`, {
    withCredentials: true,
    timeout: tiempoEspera
});
