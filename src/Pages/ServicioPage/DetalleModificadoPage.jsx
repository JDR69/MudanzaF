import React, { useEffect, useState } from "react";
import "../../Css/DetalleServicioModificado.css";
import { useNavigate, useParams } from "react-router-dom";
import ServicioService from "../../api/servicioService";
import ReportesService from "../../api/ReporteService";

function DetalleServicio() {
  const [servicio, setServicio] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ServicioService.obtenerDetalleDeServicio(id)
      .then((res) => setServicio(res.data))
      .catch((err) => console.error("Error al cargar servicio", err));
  }, [id]);

  const handleClick = () => {
    navigate(`/dasboard/ServicioModificado/${id}/asignacion`);
  };

  // utils/generarPDFServicio.js
  

  // const generarPDFServicio = (servicio) => {
  //   const doc = new jsPDF();

  //   // Encabezado
  //   doc.setFontSize(18);
  //   doc.text("Detalle del Servicio", 14, 20);
  //   doc.setFontSize(12);
  //   doc.setTextColor(100);

  //   // Datos principales
  //   const detalles = [
  //     [`ID Servicio:`, servicio.id],
  //     [`Fecha Reserva:`, servicio.fecha_reserva],
  //     [`Inicio Descarga:`, servicio.fecha_inicio_descarga],
  //     [`Fin Descarga:`, servicio.fecha_fin_descarga],
  //     [`Monto Total:`, `Bs. ${servicio.monto_total}`],
  //     [`Pago:`, `Bs. ${servicio.pago.monto}`],
  //     [`Material Aislante:`, servicio.material_aislante],
  //     [`Tipo de Viaje:`, servicio.tipo_viaje.nombre],
  //     [`Tipo de Residencia:`, servicio.tipo_residencia.nombre],
  //   ];

  //   autoTable(doc, {
  //     startY: 26,
  //     head: [["Detalle", "Valor"]],
  //     body: detalles,
  //     theme: "grid",
  //     styles: { fontSize: 10 },
  //     headStyles: { fillColor: [0, 123, 255] },
  //   });

  //   // Información del cliente
  //   autoTable(doc, {
  //     startY: doc.lastAutoTable.finalY + 10,
  //     head: [["Usuario", "Email", "Teléfono"]],
  //     body: [
  //       [
  //         servicio.usuario.nombre,
  //         servicio.usuario.email,
  //         servicio.usuario.telefono,
  //       ],
  //     ],
  //     theme: "striped",
  //     headStyles: { fillColor: [0, 150, 136] },
  //     styles: { fontSize: 10 },
  //   });

  //   // Información del vehículo
  //   autoTable(doc, {
  //     startY: doc.lastAutoTable.finalY + 10,
  //     head: [["Vehículo", "Placa", "Motor", "Chofer"]],
  //     body: [
  //       [
  //         `${servicio.vehiculo.nombre} (${servicio.vehiculo.modelo})`,
  //         servicio.vehiculo.placa,
  //         servicio.vehiculo.motor,
  //         servicio.vehiculo.chofer.nombre,
  //       ],
  //     ],
  //     theme: "striped",
  //     headStyles: { fillColor: [255, 193, 7] },
  //     styles: { fontSize: 10 },
  //   });

  //   // Ubicaciones
  //   autoTable(doc, {
  //     startY: doc.lastAutoTable.finalY + 10,
  //     head: [["Origen", "Destino", "Distancia"]],
  //     body: [
  //       [servicio.origen.str, servicio.destino.str, `${servicio.distancia} km`],
  //     ],
  //     theme: "striped",
  //     headStyles: { fillColor: [76, 175, 80] },
  //     styles: { fontSize: 10 },
  //   });

  //   // Ítems
  //   const items = servicio.items.map((item, index) => [
  //     `${item.inmueble.nombre} #${index + 1}`,
  //     `${item.largo}x${item.ancho}x${item.alto} m`,
  //     `${item.peso} kg`,
  //     `${item.volumen} m³`,
  //     item.inmueble.material.nombre,
  //     item.inmueble.categoria.nombre,
  //   ]);

  //   autoTable(doc, {
  //     startY: doc.lastAutoTable.finalY + 12,
  //     head: [
  //       ["Ítem", "Dimensiones", "Peso", "Volumen", "Material", "Categoría"],
  //     ],
  //     body: items,
  //     theme: "grid",
  //     styles: { fontSize: 9 },
  //     headStyles: { fillColor: [33, 150, 243] },
  //     margin: { bottom: 20 },
  //   });

  //   // Footer
  //   doc.setFontSize(10);
  //   doc.setTextColor(150);
  //   doc.text(
  //     "Reporte generado automáticamente por el sistema",
  //     14,
  //     doc.internal.pageSize.height - 10
  //   );

  //   // Guardar
  //   doc.save(`servicio_${servicio.id}.pdf`);
  // };

  



  if (!servicio)
    return <div className="loading-spinner">Cargando servicio...</div>;

  return (
    <div className="detalle-contenedor">
      <h1 className="detalle-titulo">🛠️ Servicio #{servicio.id}</h1>
      <div className="detalle-boton-contenedor">
        <button className="detalle-boton" onClick={handleClick}>
          ✨ Asignar Ayudantes
        </button>

        <button
          className="detalle-boton"
          onClick={() => ReportesService.generarPDFServicio(servicio)}
        >
          📄 Generar PDF
        </button>
        <button
          className="detalle-boton"
          onClick={() => ReportesService.exportarHTMLServicio(servicio)}
        >
          🌐 Exportar HTML
        </button>
      </div>
      <br />
      <br />
      <div className="detalle-grid">
        <section className="detalle-card">
          <h2>📍 Ubicaciones</h2>
          <p>
            <strong>Origen:</strong> {servicio.origen.str}
          </p>
          <p>
            <strong>Destino:</strong> {servicio.destino.str}
          </p>
          <p>
            <strong>Distancia:</strong> {servicio.distancia} km
          </p>
        </section>

        <section className="detalle-card">
          <h2>🗓️ Fechas</h2>
          <p>
            <strong>Reserva:</strong> {servicio.fecha_reserva}
          </p>
          <p>
            <strong>Inicio Descarga:</strong> {servicio.fecha_inicio_descarga}
          </p>
          <p>
            <strong>Fin Descarga:</strong> {servicio.fecha_fin_descarga}
          </p>
        </section>

        <section className="detalle-card">
          <h2>🚚 Vehículo</h2>
          <p>
            <strong>Modelo:</strong> {servicio.vehiculo.nombre} (
            {servicio.vehiculo.modelo})
          </p>
          <p>
            <strong>Placa:</strong> {servicio.vehiculo.placa}
          </p>
          <p>
            <strong>Motor:</strong> {servicio.vehiculo.motor}
          </p>
          <p>
            <strong>Chofer:</strong> {servicio.vehiculo.chofer.nombre} |{" "}
            {servicio.vehiculo.chofer.telefono}
          </p>
        </section>

        <section className="detalle-card">
          <h2>👤 Usuario</h2>
          <p>
            <strong>Nombre:</strong> {servicio.usuario.nombre}
          </p>
          <p>
            <strong>Email:</strong> {servicio.usuario.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {servicio.usuario.telefono}
          </p>
        </section>

        <section className="detalle-card wide">
          <h2>📋 Detalles del Servicio</h2>
          <p>
            <strong>Monto Total:</strong> Bs. {servicio.monto_total}
          </p>
          <p>
            <strong>Pago:</strong> Bs. {servicio.pago.monto}
          </p>
          <p>
            <strong>Material Aislante:</strong> {servicio.material_aislante}
          </p>
          <p>
            <strong>Tipo de Viaje:</strong> {servicio.tipo_viaje.nombre}
          </p>
          <p>
            <strong>Tipo de Residencia:</strong>{" "}
            {servicio.tipo_residencia.nombre}
          </p>
        </section>

        <section className="detalle-card wide">
          <h2>📦 Ítems Transportados</h2>
          {servicio.items.map((item, index) => (
            <div key={index} className="item-ficha">
              <h4>
                {item.inmueble.nombre} #{index + 1}
              </h4>
              <div className="item-info-grid">
                <span>
                  📐 Dimensiones: {item.largo} x {item.ancho} x {item.alto} m
                </span>
                <span>⚖️ Peso: {item.peso} kg</span>
                <span>🔲 Volumen: {item.volumen} m³</span>
                <span>🧱 Material: {item.inmueble.material.nombre}</span>
                <span>🏷️ Categoría: {item.inmueble.categoria.nombre}</span>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* <div className="detalle-boton-contenedor">
        <button className="detalle-boton" onClick={handleClick}>
          ✨ Asignar Ayudantes
        </button>

        <button
          className="detalle-boton"
          onClick={() => ReportesService.generarPDFServicio(servicio)}
        >
          📄 Generar PDF
        </button>
        <button
          className="detalle-boton"
          onClick={() => ReportesService.exportarHTMLServicio(servicio)}
        >
          🌐 Exportar HTML
        </button>
      </div> */}
    </div>
  );
}

export default DetalleServicio;
