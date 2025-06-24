import instance from "./axios";

const tiempoEspera = 10000;

// LOGIN
export const loginRequest = data => instance.post(`/api/auth/login`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials:true
})
// USUARIOS
export const obtenerUsuariosRequest = () => { return instance.get(`/api/usuario/getUsers`,{
    withCredentials:true,
    timeout: tiempoEspera
})}

export const actualizarUsuarioRequest = (data,id) => instance.patch(`/api/usuario/updUser/${id}`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const eliminarUsuarioRequest = (id) => instance.patch(`/api/usuario/delUser/${id}`,
    {
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)
// REGISTER CLIENTE
export const registerReques = data => instance.post(`/api/auth/register`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials: true
})
// ROLES
export const obtenerRolesRequest = () => { return instance.get(`/api/rol/get`, {
    withCredentials: true,
    timeout: tiempoEspera
})}

export const obtenerPermisosRequest = () => { return instance.get(`/api/permiso/getPermiso`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

// BITACORA
export const obtenerBitacoraRequest = () => { return instance.get(`/api/bitacora/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}
export const bitacoraVerificacionRequest = (data) => instance.post(`/api/bitacora/acceder`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    })
// VEHICULO
export const registerVehiculo = (data) => instance.put(`/api/veh/reg`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)
export const obtenerVehiculo = () => { return instance.get(`/api/veh/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

export const actualizarDatosVehiculo = (id,data) => instance.put(`/api/veh/${id}/update` ,
    data,{
         headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

// TIPO VEHICULO
export const obtenerTipoVehiculo = () => { return instance.get(`/api/tipoVeh/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

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

// CHOFER
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
  



// GALERIA DE VEHICULOS
export const registrarGaleriaVehiculos = (data,id) => instance.post(`/api/veh/regImg/${id}`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const eliminarVehiculoConcedido = (id) => instance.delete(`/api/veh/delImg/${id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  });
// CATALOGO DE VEHICULOS
export const obtenerCatalogoVehiculo = () => { return instance.get(`/api/veh/getCat`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

// CATEGORIA DE INMUEBLES
export const registrarCategoriaInmueble = (data) => instance.post(`/api/categorias/registrar`,
    data,{
        headers: {
            "Content-Type": "application/json"  },
        withCredentials: true,
        timeout: tiempoEspera
    }
);

export const actualizarCategoriaInmuebles = (data,id) => instance.put(`/api/categorias/${id}/update`,
    data,
    {
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

//OBTENER TODAS LAS CATEGORIAS SIN IMPORTAR EL ESTADO

export const obtenerCategoriasCompletaRequest = () => instance.get(`/api/categorias/get`, {
    withCredentials: true,
    timeout: tiempoEspera
});

//OBTENER TODAS LAS CATEGORIAS CON EL ESTADO
export const obtenerCategoriasRequest = () => instance.get(`/api/categorias/get-partial`, {
    withCredentials: true,
    timeout: tiempoEspera
});

export const eliminarCategoriaInmuebles = (id) => instance.delete(`/api/categorias/${id}/delete`,
    {
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)
// SEGUROS
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
// MATERIAL
export const registrarMaterial = (data) => instance.post(`/api/materiales/registrar`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const actualizarMaterialRequest = (data,id) => instance.put(`/api/materiales/${id}/update`,
    data,{
        headers:{
            "Content-Type": "application/json"
        },
        withCredentials:true
    }
)

export const eliminarMaterialRequest = (id) => instance.delete(`/api/materiales/${id}/delete`,
    {
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

//OBTENER TODOS LOS MATERIALES SIN IMPOTAR EL ESTADO
export const obtenerMaterialesCompletasRequest = () => { return instance.get(`/api/materiales/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

//OBTENER TODOS LOS MATERIALES CON EL ESTADO
export const obtenerMaterialesRequest = () => { return instance.get(`/api/materiales/get-partial`,{
    withCredentials: true,
    timeout: tiempoEspera
})}

// INMUEBLES
export const registarInmueble = (data) => instance.post(`/api/inmuebles/registrar`,
    data,{
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials:true
    }
)

export const obtenerInmuebles = () => { return instance.get(`/api/inmuebles/get`,{
    withCredentials: true,
    timeout: tiempoEspera
})}


// BACKUP

export const obtenerBackups=async ()=>{
    const response=await fetch("https://pruebabackup.onrender.com/api/backup/getAll",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    return response;
}


export const deleteBackup=async (id)=>{
    return await fetch(`https://pruebabackup.onrender.com/api/backup/del/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export const downloadBackup=async (id)=>{
    return await fetch(`https://pruebabackup.onrender.com/api/backup/download/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })

}

export const generarBackup=async ()=>{
    const response=await fetch("https://pruebabackup.onrender.com/api/backup/reg",{
        method:"POST",
        headers:{
            "Content-Type":"aplication/json"
        }
    })
    const data=response.json()  ;
    return data;
}

//Comentarios
export const obtenerComentarios = () => { return instance.get('/api/comentario/getAllComentario',{
    withCredentials: true,
    timeout: tiempoEspera
})}


export const regComentario = (data) => { return instance.post('/api/comentario/registrar',
    data,{
        headers: {
            "Content-Type": "application/json"  },
        withCredentials: true,
        timeout: tiempoEspera
    })}