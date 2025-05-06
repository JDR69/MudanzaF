import React from 'react'
import { useNavigate } from 'react-router-dom'

const VerificacionPage = () => {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/dasboard/homeda');
    }
    const verificar = () => {
        navigate('/dasboard/bitacora');
    }
    return (
        <div className="form-gris">
            <div className="form-flotante">
                <h1>Colocar contraseña</h1>
                <form action="">
                    <input
                        type="password"
                        className="input-perfil"
                        placeholder='Colocar contraseña' />
                    <div className='contenedorHijoFila'>
                        <button
                            type="submit"
                            onClick={verificar}
                            className="btn btn-primary">Enviar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={handleClose}
                        >Cancelar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default VerificacionPage
