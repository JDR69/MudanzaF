import React from 'react'
import '../Css/PerfilDeUsuario.css'




function PerfilDeUsuario() {
    return (
        <div className='PerfilContenedor'>
            <div className='PerfilConteiner'>
                <h1> Perfil del Usuario
                    <div className="form-group">
                        <label htmlFor="Nombre">Nombre</label>
                        <input type="number" name="Nombre" className='form-control'required />
                    </div>
                </h1>
            </div>
        </div>
    )
}

export default PerfilDeUsuario