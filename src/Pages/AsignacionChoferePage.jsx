import React, { useState } from 'react';
import '../Css/AsignacionChoferePage.css';
import Cloudinary from '../Cloudinary';

const AsignacionChoferePage = () => {

    const { image, loading, message, handleFileChange, uploadImage } = Cloudinary();

    const moviles = [
        { id: '1', placa: '123ABC', modelo: '2023', estado: 'En línea' },
        { id: '2', placa: '456DEF', modelo: '2022', estado: 'Fuera de línea' }
    ];

    const [estado, setEstado] = useState('En Linea');
    const [busqueda, setBusqueda] = useState('')

    const filtrados = moviles.filter((movil) =>
        movil.placa.includes(busqueda) || movil.modelo.includes(busqueda)
    );

    
    const onSubmit = (data) =>{
        console.log(data)
    }
    return (
        <div className="container-chofer">
            <div className="titulo-chofer">
                <i className="bi bi-person-fill-check icon-titulo"></i>
                <h2>Asignación de nuevo Chofer</h2>
            </div>

            <form className="formulario-chofer"  onSubmit={onSubmit}>
                <input type="text" placeholder="Nombre completo" />
                <input type="email" placeholder="Correo electrónico" />
                <input type="password" placeholder="Contraseña" />
                <input
                    type="file"
                    name="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <input type="text" placeholder="Carnet de Identidad" />
                <input type="text" placeholder="Dirección / Vivienda" />

                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value='En Linea'>En Línea</option>
                    <option value='Fuera de Linea'>Fuera de Línea</option>
                </select>

                <input type="number" value="0" disabled />
            </form>

            <div className="buscar-vehiculo">
                <h3>Seleccionar el Móvil</h3>
                <input
                    type='text'
                    placeholder='Buscar por placa o modelo'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <table className="tabla-moviles">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Estado del Móvil</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.map((movil) => (
                        <tr key={movil.id}>
                            <td>{movil.id}</td>
                            <td>{movil.placa}</td>
                            <td>{movil.modelo}</td>
                            <td>{movil.estado}</td>
                            <td>
                                <button className="btn-quitar">Quitar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='registerChofer'>
                <button class="btn btn-success" type="submit" >Registrar</button>
            </div>
        </div>
    );
};

export default AsignacionChoferePage;
