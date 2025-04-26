import React, { useState } from 'react';
import CardCarusel from './CarruselCamon';
import '../Css/CatalogoVehiculoPage.css';

const CatalogoVehiculoPage = () => {
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('todos');
    const [habilitado, setHabilitado] = useState(true);
    const categorias = [
        { value: 'todos', label: 'Todos los vehículos' },
        { value: 'furgoneta', label: 'Furgoneta cerrada' },
        { value: 'camion35', label: 'Camión de 3.5 toneladas' },
        { value: 'camion58', label: 'Camión de 5-8 toneladas' },
        { value: 'torton', label: 'Camión tipo "torton"' },
        { value: 'trailer', label: 'Trailer o tractocamión con caja seca' },
        { value: 'plataforma', label: 'Camiones de plataforma' },
    ];

    const vehiculos = [
        {
            id: 1,
            nombre: 'Toyota',
            descripcion: 'Todo terreno',
            tipo: 'furgoneta',
            img: [
                { id: 1, url: './camion2.png' },
                { id: 2, url: './camion3.png' },
            ],
        },
        {
            id: 2,
            nombre: 'RAM',
            descripcion: 'Todo terreno',
            tipo: 'camion35',
            img: [
                { id: 1, url: './ram1.png' },
                { id: 2, url: './ram2.png' },
            ],
        },
        {
            id: 3,
            nombre: 'Ford',
            descripcion: 'Carga pesada',
            tipo: 'camion58',
            img: [
                { id: 1, url: './camion2.png' },
                { id: 2, url: './camion3.png' },
            ],
        },
        {
            id: 4,
            nombre: 'Mercedes',
            descripcion: 'Transporte eficiente',
            tipo: 'torton',
            img: [
                { id: 1, url: './camion2.png' },
                { id: 2, url: './camion3.png' },
            ],
        },
        {
            id: 5,
            nombre: 'Volvo',
            descripcion: 'Larga distancia',
            tipo: 'trailer',
            img: [
                { id: 1, url: './camion2.png' },
                { id: 2, url: './camion3.png' },
            ],
        },
        {
            id: 6,
            nombre: 'Scania',
            descripcion: 'Carga especializada',
            tipo: 'plataforma',
            img: [
                { id: 1, url: './camion2.png' },
                { id: 2, url: './camion3.png' },
            ],
        },
    ];

    const vehiculosFiltrados =
        vehiculoSeleccionado === 'todos'
            ? vehiculos
            : vehiculos.filter((vehiculo) => vehiculo.tipo === vehiculoSeleccionado);

    return (
        <div className="containerCatalago">
            {/* Banner superior */}
            <div className="contextCatalago">
                <img src="./catalogo.jpg" alt="Catálogo de vehículos" />
                <div className="textosCatalogo">
                    <h2>Te presentamos todos los vehículos disponibles</h2>
                    <h2>⭐⭐⭐⭐⭐</h2>
                </div>
            </div>

            {/* Select de categorías */}
            <div className="seleccionVehiculo">
                <select
                    name="Nase"
                    id="selectNase"
                    className="form-select"
                    value={vehiculoSeleccionado}
                    onChange={(e) => setVehiculoSeleccionado(e.target.value)}
                >
                    {categorias.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostrar vehículos filtrados */}
            <div className="conteinerFurgoneta">
                <h1>
                    {categorias.find((cat) => cat.value === vehiculoSeleccionado)?.label}
                </h1>
                <div className="cantidadCamiones">
                    {vehiculosFiltrados.map((vehiculo) => (
                        <div key={vehiculo.id} className="camiones">
                            <div>
                                <h2>{vehiculo.nombre}</h2>
                                <div className="descripcionTrailer">
                                    <h2>{vehiculo.descripcion}</h2>
                                </div>
                            </div>
                            <div className="entro">
                                <CardCarusel card={vehiculo} />
                            </div>
                            <div className='estado'>
                                <button>Estado</button>
                                {habilitado ? (
                                    <div className='disponible'>
                                        <h3>Disponible</h3>
                                    </div>

                                ) : (
                                    <div className='noDisponible'>
                                        <h3>No Disponible</h3>
                                    </div>
                                )}
                            </div>
                            <div>
                                <a href="solicitar" style={{ textDecoration: 'underline' }}>Solicitar</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CatalogoVehiculoPage;



// import React from 'react'
// import CardCarusel from './CarruselCamon'
// import '../Css/CatalogoVehiculoPage.css'

// const CatalogoVehiculoPage = () => {

//     const cards2 = [
//         {
//             id: 1,
//             nombre: "Toyota",
//             descripcion: "todo terreno",
//             img: [
//                 { id: 1, url: "./camion2.png" },
//                 { id: 2, url: "./camion3.png" }
//             ]
//         },
//         {
//             id: 2,
//             nombre: "RAM",
//             descripcion: "todo terreno",
//             img: [
//                 { id: 1, url: "./ram1.png" },
//                 { id: 2, url: "./ram2.png" }
//             ]
//         },
//         {
//             id: 3,
//             nombre: "RAM",
//             descripcion: "todo terreno",
//             img: [
//                 { id: 1, url: "./ram1.png" },
//                 { id: 2, url: "./ram2.png" }
//             ]
//         }
//     ];


//     return (
//         <div className='containerCatalago'>
//             <div className="contextCatalago">
//                 <img src="./catalogo.jpg" alt="" />
//                 <div className="textosCatalogo">
//                     <h2>Te presentamos todos los vehículos Disponibles</h2>
//                     <h2>⭐⭐⭐⭐⭐</h2>
//                 </div>
//             </div>
//             <div className='seleccionVehiculo'>
//                 <select name="Nase" id="selectNase" className="form-select" >
//                     <option value="">Seleccionar tipo de vehículo</option>
//                     <option value="furgoneta">Furgoneta cerrada</option>
//                     <option value="camion35">Camión de 3.5 toneladas</option>
//                     <option value="camion58">Camión de 5-8 toneladas</option>
//                     <option value="torton">Camión tipo "torton" (dos ejes traseros)</option>
//                     <option value="trailer">Trailer o tractocamión con caja seca</option>
//                     <option value="plataforma">Camiones de plataforma</option>
//                 </select>
//             </div>

//             <div className='conteinerFurgoneta'>
//                 <h1>Furgoneta cerrada</h1>
//                 <div className="cantidadCamiones">
//                     {cards2.map((card) => (
//                         <div key={card.id} className="camiones">
//                             <div>
//                                 <div>
//                                     <h2>{card.nombre}</h2>
//                                 </div>
//                                 <div className="descripcionTrailer">
//                                     <h2>{card.descripcion}</h2>
//                                 </div>
//                             </div>
//                             <div className='entro'>
//                                 <CardCarusel card={card} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='conteinerFurgoneta'>
//                 <h1>Camión de 3.5 toneladas</h1>
//                 <div className="cantidadCamiones">
//                     {cards2.map((card) => (
//                         <div key={card.id} className="camiones">
//                             <div>
//                                 <div>
//                                     <h2>{card.nombre}</h2>
//                                 </div>
//                                 <div className="descripcionTrailer">
//                                     <h2>{card.descripcion}</h2>
//                                 </div>
//                             </div>
//                             <div className='entro'>
//                                 <CardCarusel card={card} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='conteinerFurgoneta'>
//                 <h1>Camión de 5-8 toneladas</h1>
//                 <div className="cantidadCamiones">
//                     {cards2.map((card) => (
//                         <div key={card.id} className="camiones">
//                             <div>
//                                 <div>
//                                     <h2>{card.nombre}</h2>
//                                 </div>
//                                 <div className="descripcionTrailer">
//                                     <h2>{card.descripcion}</h2>
//                                 </div>
//                             </div>
//                             <div className='entro'>
//                                 <CardCarusel card={card} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='conteinerFurgoneta'>
//                 <h1>Camión tipo "torton"</h1>
//                 <div className="cantidadCamiones">
//                     {cards2.map((card) => (
//                         <div key={card.id} className="camiones">
//                             <div>
//                                 <div>
//                                     <h2>{card.nombre}</h2>
//                                 </div>
//                                 <div className="descripcionTrailer">
//                                     <h2>{card.descripcion}</h2>
//                                 </div>
//                             </div>
//                             <div className='entro'>
//                                 <CardCarusel card={card} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='conteinerFurgoneta'>
//                 <h1>Trailer o tractocamión con caja seca</h1>
//                 <div className="cantidadCamiones">
//                     {cards2.map((card) => (
//                         <div key={card.id} className="camiones">
//                             <div>
//                                 <div>
//                                     <h2>{card.nombre}</h2>
//                                 </div>
//                                 <div className="descripcionTrailer">
//                                     <h2>{card.descripcion}</h2>
//                                 </div>
//                             </div>
//                             <div className='entro'>
//                                 <CardCarusel card={card} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='conteinerFurgoneta'>
//                 <h1>Camiones de plataforma</h1>
//                 <div className="cantidadCamiones">
//                     {cards2.map((card) => (
//                         <div key={card.id} className="camiones">
//                             <div>
//                                 <div>
//                                     <h2>{card.nombre}</h2>
//                                 </div>
//                                 <div className="descripcionTrailer">
//                                     <h2>{card.descripcion}</h2>
//                                 </div>
//                             </div>
//                             <div className='entro'>
//                                 <CardCarusel card={card} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CatalogoVehiculoPage
