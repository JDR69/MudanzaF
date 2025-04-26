import React from 'react'
import CardCarusel from './CarruselCamon'
import '../Css/CatalogoVehiculoPage.css'

const CatalogoVehiculoPage = () => {

    const cards2 = [
        {
            id: 1,
            nombre: "Toyota",
            descripcion: "todo terreno",
            img: [
                { id: 1, url: "./camion2.png" },
                { id: 2, url: "./camion3.png" }
            ]
        },
        {
            id: 2,
            nombre: "RAM",
            descripcion: "todo terreno",
            img: [
                { id: 1, url: "./ram1.png" },
                { id: 2, url: "./ram2.png" }
            ]
        },
        {
            id: 3,
            nombre: "RAM",
            descripcion: "todo terreno",
            img: [
                { id: 1, url: "./ram1.png" },
                { id: 2, url: "./ram2.png" }
            ]
        }
    ];


    return (
        <div className='containerCatalago'>
            <div className="contextCatalago">
                <img src="./catalogo.jpg" alt="" />
                <div className="textosCatalogo">
                    <h2>Te presentamos todos los vehículos Disponibles</h2>
                    <h2>⭐⭐⭐⭐⭐</h2>
                </div>
            </div>

            <div className='conteinerTrailer'>
                <div className="cantidadCamiones">
                    {cards2.map((card) => (
                        <div key={card.id} className="camiones">
                            <div>
                                <div>
                                    <h2>{card.nombre}</h2>
                                </div>
                                <div className="descripcionTrailer">
                                    <h2>{card.descripcion}</h2>
                                </div>
                            </div>
                            <div className='entro'>
                                <CardCarusel card={card} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CatalogoVehiculoPage
