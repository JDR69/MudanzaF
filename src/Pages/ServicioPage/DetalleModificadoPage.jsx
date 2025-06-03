// componente de fernando
import React from "react";
import "../../Css/DetalleServicioModificado.css";
import { useNavigate, useParams } from "react-router-dom";

const detalleServicio = {
  id: 1,
  fecha: "2025-05-01",
  cliente: "Juan Pérez",
  items: [
    { nombre: "Heladera", largo: 0.7, ancho: 0.6, alto: 1.8, peso: 70 },
    { nombre: "Heladera", largo: 0.8, ancho: 0.6, alto: 1.9, peso: 75 },
    { nombre: "Cocina", largo: 0.5, ancho: 0.5, alto: 1.0, peso: 40 },
    { nombre: "Caja de ropa", largo: 0.4, ancho: 0.3, alto: 0.5, peso: 10 },
    {
      nombre: "Caja de herramientas",
      largo: 0.3,
      ancho: 0.3,
      alto: 0.4,
      peso: 12,
      volumen:0.036
    },
  ],
};

function DetalleServicio() {
  const agrupados = {};

  // Agrupar ítems por nombre
  detalleServicio.items.forEach((item) => {
    if (!agrupados[item.nombre]) agrupados[item.nombre] = [];
    agrupados[item.nombre].push(item);
  });
  const {id} = useParams();
  console.log(`id ${id}`);
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(`go asignacion ${id}`);
    navigate(`/dasboard/ServicioModificado/${id}/asignacion`);
  }
  return (
    <div className="contenedor-detalle">
      <h1 className="titulo-detalle">Detalle de Servicio</h1>

      <div className="grupo-items">
        {Object.entries(agrupados).map(([nombre, items], index) => (
          <div key={index} className="item-grupo">
            <h3>{nombre}</h3>
            {items.map((item, i) => (
              <div key={i} className="item-card">
                <p>
                  <strong>
                    {nombre} #{i + 1}
                  </strong>
                </p>
                <p>Alto: {item.alto} m</p>
                <p>Largo: {item.largo} m</p>
                <p>Ancho: {item.ancho} m</p>
                <p>Peso: {item.peso} kg</p>
                <p>Volumen: {item.peso} m³</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="contenedor-boton">
        <button className="btn-ayudantes" onClick={handleClick} >Asignación de Ayudantes</button>
      </div>
    </div>
  )
}

export default DetalleServicio;
