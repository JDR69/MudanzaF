//componente de fernando
import React, { useEffect, useState } from "react";
import "../../Css/ServicioModificadoPage.css"
import { useNavigate } from "react-router-dom";
import AyudanteService from "../../api/ayudanteService";



function ServicioModificadoPage() {
    const navigate = useNavigate();
    const [servicios,setServicios] = useState([]);
    const handleClick = (id) => {
        
        navigate(`/dasboard/servicioModificado/${id}/detalle`);
    }

    useEffect(() => {
      AyudanteService.getServicios().then((res) => {
        console.log("ejecucion de listar servicios");
        setServicios(res.data);
        console.log(servicios)
      })
      .catch((err) =>
          console.error("Error al cargar ayudantes disponibles:", err)
      );

    },[])
  return (
    <div className="contenedor-servicio">
      <h1 className="titulo">Servicios</h1>
      <div className="tabla-container">
        <table className="tabla-servicios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Chofer</th>
              <th>Vehículo</th>
              <th>Placa</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.id}</td>
                <td>{servicio.chofer}</td>
                <td>{servicio.vehiculo}</td>
                <td>{servicio.placa}</td>
                <td>{servicio.cliente}</td>
                <td>{servicio.fecha}</td>
                <td>{servicio.hora}</td>
                <td>{servicio.estado}</td>
                <td>
                  <button className="btn-ver" onClick={() => handleClick(servicio.id)}>Ver Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServicioModificadoPage;
