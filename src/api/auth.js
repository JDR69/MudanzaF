import instance from "./axios";

const tiempoEspera = 10000;

export const loginRequest = data => instance.post(`/api/auth/login`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials:true
})

export const registerReques = data => instance.post(`/api/cliente/registrar`,data,{
    withCredentials: true
})

export const obtenerRolesRequest = () => { return instance.get(`/api/rol`, {
    withCredentials: true,
    timeout: tiempoEspera
})}


export const obtenerBitacoraRequest = () => { return instance.get(`/api/auth/getBitacora`,{
    withCredentials: true,
    timeout: tiempoEspera
})}


export const registerVehiculo = (data) => instance.post(`/api/vehiculo/registrar`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const obtenerTipoVehiculo = () => { return instance.get(`/api/vehiculo/get-all-tipo-vehiculo`,{
    withCredentials: true,
    timeout: tiempoEspera
})}