import React from 'react'
import '../../Css/BitacoraPage.css'
import { useAuth } from '../../context/AuthContext'

const BitacoraPage = () => {

    const {bitacora} = useAuth();

    const bitacoras = bitacora;

        return (
            <div className="bitacora-container">
                <div>
                    <h2>Registros de acciones en el Sistema</h2>
                    <div className="table-responsive"> {/* Contenedor para el scroll horizontal */}
                        <table className="bitacora-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Dirección IP</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(bitacoras) && bitacoras.length > 0 ? (
                                    bitacoras.map((bitacora) => (
                                        <tr key={bitacora.id}>
                                            <td>{bitacora.id}</td>
                                            <td>{bitacora.nombre}</td>
                                            <td>{bitacora.email}</td>
                                            <td>{bitacora.ip}</td>
                                            <td>{bitacora.fecha}</td>
                                            <td>{bitacora.hora}</td>
                                            <td>{bitacora.tipo_sesion}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No se encontraron registros de bitácora.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
    export default BitacoraPage;