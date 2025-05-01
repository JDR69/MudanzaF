import React, { useState } from 'react';
import '../../Css/GestionInmueblePage.css';

function GestionInmueblePage() {
    const [electrodomesticos, setElectrodomesticos] = useState([]);
    const [nuevoElectrodomestico, setNuevoElectrodomestico] = useState('Heladera');
    const [contadores, setContadores] = useState({
        Heladera: 1,
        Microondas: 1,
        Tostadora: 1
    });

    const agregarElectrodomestico = () => {
        const contadorActual = contadores[nuevoElectrodomestico];

        const nuevo = { 
            id: `${nuevoElectrodomestico}-${contadorActual}`, 
            tipo: nuevoElectrodomestico, 
            numero: contadorActual 
        };

        setElectrodomesticos([...electrodomesticos, nuevo]);

        setContadores({
            ...contadores,
            [nuevoElectrodomestico]: contadorActual + 1
        });
    };

    const handleSelectChange = (e) => {
        setNuevoElectrodomestico(e.target.value);
    };

    return (
        <div className='containerGestionInmueble'>
            <h1>Gestiona tu Inmueble</h1>
            <div className='GestionElectrodomesticos'>
                <h2 id='titleGestiones'>Electrodomésticos</h2>

                {electrodomesticos.map((item) => (
                    <div className="seccionInmueble" key={item.id}>
                        <h2 className='tituloHeladera'>{item.tipo} {item.numero}</h2>
                        <div className="form-group">
                            <label htmlFor={`nombre-${item.id}`}>Tamaño</label>
                            <select name="nombre" className='form-control'>
                                <option>Pequeño</option>
                                <option>Mediano</option>
                                <option>Grande</option>
                            </select>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id={`check-${item.id}`} />
                            <label className="form-check-label" htmlFor={`check-${item.id}`}>
                                Embalaje
                            </label>
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <select 
                        className='form-control select-item' 
                        value={nuevoElectrodomestico} 
                        onChange={handleSelectChange}
                    >
                        <option value="Heladera">Heladera</option>
                        <option value="Microondas">Microondas</option>
                        <option value="Tostadora">Tostadora</option>
                    </select>
                    <button className="btn-agregar" onClick={agregarElectrodomestico}>Agregar</button>
                </div>
            </div>
        </div>
    );
}

export default GestionInmueblePage;
