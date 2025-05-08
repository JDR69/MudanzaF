import React, { useState, useEffect } from 'react';
import { obtenerVehiculo } from '../../api/auth';

function InformacionTecnicaVehiculoPage() {
    const [vehiculos, setVehiculos] = useState([]);
    const [searchPlaca, setSearchPlaca] = useState('');
    const [vehiculo, setVehiculo] = useState(null);

    useEffect(() => {
        const listarVehiculo = async () => {
            try {
                const res = await obtenerVehiculo();
                setVehiculos(res.data);
            } catch (error) {
                console.error('Error al obtener vehículos:', error);
            }
        };
        listarVehiculo();
    }, []);

    const buscarVehiculo = () => {
        const encontrado = vehiculos.find(v =>
            v.placa.toLowerCase() === searchPlaca.toLowerCase()
        );
        setVehiculo(encontrado || null);
    };

    return (
        <div className='contenedoresPrincipales'>
            <div className='contenedorHijoDos'>
                <h1>Información Técnica del Vehículo</h1>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar por Placa"
                    value={searchPlaca}
                    onChange={e => setSearchPlaca(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && buscarVehiculo()}
                />
                <button className='btn btn-primary' onClick={buscarVehiculo}>
                    Buscar
                </button>
            </div>
    
            {vehiculo && (
                <>
                    {/* Imagen centrada debajo del botón */}
                    <div className="text-center mt-4">
                        <img
                            src={vehiculo.imagen || 'https://res.cloudinary.com/ddltlpsy1/image/upload/v1744404253/samples/ecommerce/car-interior-design.jpg'}
                            alt="Vehículo"
                            width={200}
                            height={200}
                            className="img-fluid rounded img-thumbnail"
                        />
                    </div>
    
                    {/* Información del vehículo */}
                    <div className='contenedorHijoFila'>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="nombre">Nombre</label>
                            <input className="input-perfil" readOnly value={vehiculo.nombre || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="tipo">Tipo Vehículo</label>
                            <input className="input-perfil" readOnly value={vehiculo.tipo || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="capacidad">Capacidad</label>
                            <input className="input-perfil" readOnly value={vehiculo.capacidad || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="costeKilometraje">Costo por Kilometraje</label>
                            <input className="input-perfil" readOnly value={vehiculo.costeKilometraje || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="placa">Placa</label>
                            <input className="input-perfil" readOnly value={vehiculo.placa || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="motor">Motor</label>
                            <input className="input-perfil" readOnly value={vehiculo.motor || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="modelo">Modelo</label>
                            <input className="input-perfil" readOnly value={vehiculo.modelo || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="seguro">Seguro</label>
                            <input className="input-perfil" readOnly value={vehiculo.seguro || ''} />
                        </div>
                        <div className='contenedorHijoDos'>
                            <label htmlFor="estado">Estado</label>
                            <input className="input-perfil" readOnly value={vehiculo.estado || ''} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}       
 export default InformacionTecnicaVehiculoPage;
