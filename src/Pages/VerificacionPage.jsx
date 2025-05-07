import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bitacoraVerificacionRequest } from '../api/auth';

const VerificacionPage = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        navigate('/dasboard/homeda');
    }
    const verificar = async () => {
        setLoading(true);
        try {
            const data = {
                password: password
            }
            const res = await bitacoraVerificacionRequest(data);
            console.log(res);
            if (res.status === 200) {
                setLoading(false);
                setPassword('');
                navigate('/dasboard/bitacora');
                return;
            }
        } catch (error) {
            alert("Contraseña incorrecta");
            setLoading(false);
            setPassword('');
            navigate('/dasboard/homeda');
        }
    }
    return (
        <div className="form-gris">
            <div className="form-flotante">
                <h1>Colocar contraseña</h1>
                <form className='contenedorHijoColumna'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-perfil"
                        placeholder='Colocar contraseña' />
                    <div className='contenedorHijoFila'>
                        <button
                            type='button'
                            onClick={verificar}
                            className="btn btn-primary"
                            disabled={loading}>
                            {loading ? 'Verificando...' : 'Enviar'}
                        </button>
                        <button
                            type='button'
                            onClick={handleClose}
                            className="btn btn-danger"
                        >Cancelar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default VerificacionPage
