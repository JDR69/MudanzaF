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

export const registerChofer = (data) => instance.post(`/api/chofer/reg`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const actualizarDatosDelChofer = (data,id) => instance.put(`/api/chofer/${id}/update`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const obtenerChofer = () => { return instance.get(`/api/chofer/get-all`  ,{
    withCredentials: true,
    timeout: tiempoEspera
})}

export const concederVehiculo = (data,id) => instance.post(`/api/chofer/${id}/asignar`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const eliminarConcecido = (data, id) =>
    instance.delete(`/api/chofer/${id}/eliminar-asignacion`, {
      data: data,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  

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

export const eliminarTipoVehiculo = (id) => instance.delete(`/api/tipoVeh/del/${id}`,
    {
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




export const insertarNuevoSeguro = (data) => instance.post(`/api/seguro/reg`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const obtenerSeguros = () => { return instance.get(`/api/seguro/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

export const actualizarSeguroBackend = (data,id) => instance.patch(`/api/seguro/upd/${id}`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const eliminarSeguroBackend = (id) => instance.delete(`/api/seguro/del/${id}`,
    {
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)