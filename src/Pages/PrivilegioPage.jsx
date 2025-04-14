import React, { useState, useEffect } from 'react';
import '../Css/PrivilegioPage.css'
import { useAuth } from '../context/AuthContext';

function PrivilegioPage() {

    
    const {roles} = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [privilegios, setPrivilegios] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(roles[0].nombre);
    const [mensajeExitoso, setMensajeExitoso] = useState("");

    useEffect(() => {
        const permisosSimulados = {
            administrador: [
                { id: 1, Descripcion: 'Acceso total', Estado: true },
                { id: 2, Descripcion: 'Gestión de usuarios', Estado: true },
                { id: 3, Descripcion: 'Configuración del sistema', Estado: true },
            ],
            empleado: [
                { id: 4, Descripcion: 'Acceso limitado', Estado: false },
                { id: 5, Descripcion: 'Ver reportes', Estado: true },
                { id: 6, Descripcion: 'Modificar perfil', Estado: true },
            ],
            cliente: [
                { id: 7, Descripcion: 'Acceso básico', Estado: true },
                { id: 8, Descripcion: 'Ver productos', Estado: true },
                { id: 9, Descripcion: 'Realizar pedidos', Estado: false },
            ],
        };
        setPrivilegios(permisosSimulados[rolSeleccionado] || []);
    }, [rolSeleccionado]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const manejarCambio = (id) => {
        setPrivilegios((prevState) =>
            prevState.map((privilegio) =>
                privilegio.id === id ? { ...privilegio, Estado: !privilegio.Estado } : privilegio
            )
        );
    };

    const manejarCambioRol = (event) => {
        setRolSeleccionado(event.target.value);
    };

    return (
        <div className='principalPrivilegio'>
            <h1>Gestión de Privilegios</h1>
            <div className='contenedorPrivilegios'>
                <div className='contenedorRol'>
                    <h2>Seleccionar Rol</h2>
                    <select name="rol" id='soyRol' value={rolSeleccionado} onChange={manejarCambioRol}>
                        <option value="administrador">{roles[0].nombre}</option>
                        <option value="usuario">{roles[1].nombre}</option>
                        <option value="cliente">{roles[2].nombre}</option>
                        <option value="ayudante">{roles[3].nombre}</option>
                        <option value="chofer">{roles[4].nombre}</option>
                    </select>
                </div>
                <div className='contenedorPrivilegios'>
                    <button onClick={toggleMenu} className="toggle-menu">
                        Privilegios {isMenuOpen ? "▲" : "▼"}
                    </button>
                    {isMenuOpen && (
                        <div className="submenu">
                            <ul className="privileges-list">
                                {privilegios.map((privilegio) => (
                                    <li key={privilegio.id} className="privilege-item">
                                        <span className="privilege-name">{privilegio.Descripcion}</span>
                                        <button
                                            onClick={() => manejarCambio(privilegio.id)}
                                            className={`privilege-button ${privilegio.Estado ? 'active' : 'inactive'}`}
                                        >
                                            {privilegio.Estado ? 'OK' : 'NO'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setMensajeExitoso("Cambios guardados exitosamente")} className="save-changes">
                                Guardar Cambios
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Mostrar el mensaje de éxito si existe */}
            {mensajeExitoso && (
                <div className="mensaje-exito">
                    {mensajeExitoso}
                </div>
            )}
        </div>
    );
}

export default PrivilegioPage;