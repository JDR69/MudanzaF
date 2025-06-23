import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

class ReportesService {
  static generarHTMLServicio = (servicio) => {
    console.log("entre al html");
    const itemsHTML = servicio.items
      .map(
        (item, index) => `
    <tr>
      <td>${item.inmueble.nombre} #${index + 1}</td>
      <td>${item.largo}x${item.ancho}x${item.alto} m</td>
      <td>${item.peso} kg</td>
      <td>${item.volumen} m³</td>
      <td>${item.inmueble.material.nombre}</td>
      <td>${item.inmueble.categoria.nombre}</td>
    </tr>
  `
      )
      .join("");

    return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Reporte de Servicio</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        color: #333;
      }
      h1, h2 {
        color: #007bff;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      .seccion {
        margin-top: 40px;
      }
    </style>
  </head>
  <body>
    <h1>Detalle del Servicio</h1>
    <table>
      <tr><th>Fecha Reserva</th><td>${servicio.fecha_reserva}</td></tr>
      <tr><th>Inicio Descarga</th><td>${servicio.fecha_inicio_descarga}</td></tr>
      <tr><th>Fin Descarga</th><td>${servicio.fecha_fin_descarga}</td></tr>
      <tr><th>Origen</th><td>${servicio.origen.str}</td></tr>
      <tr><th>Destino</th><td>${servicio.destino.str}</td></tr>
      <tr><th>Distancia</th><td>${servicio.distancia} km</td></tr>
      <tr><th>Pago</th><td>Bs. ${servicio.pago.monto}</td></tr>
      <tr><th>Material Aislante</th><td>${servicio.material_aislante}</td></tr>
      <tr><th>Tipo de Viaje</th><td>${servicio.tipo_viaje.nombre}</td></tr>
      <tr><th>Tipo de Residencia</th><td>${servicio.tipo_residencia.nombre}</td></tr>
    </table>

    <div class="seccion">
      <h2>Detalle de Usuario</h2>
      <table>
        <tr><th>Nombre</th><td>${servicio.usuario.nombre}</td></tr>
        <tr><th>Email</th><td>${servicio.usuario.email}</td></tr>
        <tr><th>Teléfono</th><td>${servicio.usuario.telefono}</td></tr>
      </table>
    </div>

    <div class="seccion">
      <h2>Detalle de Vehículo</h2>
      <table>
        <tr><th>Modelo</th><td>${servicio.vehiculo.nombre} (${servicio.vehiculo.modelo})</td></tr>
        <tr><th>Placa</th><td>${servicio.vehiculo.placa}</td></tr>
        <tr><th>Motor</th><td>${servicio.vehiculo.motor}</td></tr>
        <tr><th>Chofer</th><td>${servicio.vehiculo.chofer.nombre}</td></tr>
      </table>
    </div>

    <div class="seccion">
      <h2>Detalle de Inmuebles</h2>
      <table>
        <thead>
          <tr>
            <th>Ítem</th><th>Dimensiones</th><th>Peso</th>
            <th>Volumen</th><th>Material</th><th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      <p><strong>Monto Total:</strong> Bs. ${servicio.monto_total}</p>
    </div>
  </body>
  </html>
  `;
  };

  static exportarHTMLServicio = (servicio) => {
    const contenido = ReportesService.generarHTMLServicio(servicio);
    const blob = new Blob([contenido], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `servicio_${servicio.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  static generarPDFServicio = (servicio) => {
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Detalle del Servicio", 14, 20);

    // Detalles principales
    const detalles = [
      ["Fecha Reserva:", servicio.fecha_reserva],
      ["Inicio Descarga:", servicio.fecha_inicio_descarga],
      ["Fin Descarga:", servicio.fecha_fin_descarga],
      ["Origen:", servicio.origen.str],
      ["Destino:", servicio.destino.str],
      ["Distancia:", `${servicio.distancia} km`],
      ["Pago:", `Bs. ${servicio.pago.monto}`],
      ["Material Aislante:", servicio.material_aislante],
      ["Tipo de Viaje:", servicio.tipo_viaje.nombre],
      ["Tipo de Residencia:", servicio.tipo_residencia.nombre],
    ];

    autoTable(doc, {
      startY: 26,
      head: [["Detalle", "Valor"]],
      body: detalles,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 153, 136] },
    });

    // Título sección Usuario
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Detalle de Usuario", 14, doc.lastAutoTable.finalY + 10);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Usuario", "Email", "Teléfono"]],
      body: [
        [
          servicio.usuario.nombre,
          servicio.usuario.email,
          servicio.usuario.telefono,
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [0, 153, 136] },
      styles: { fontSize: 10 },
    });

    // Título sección Vehículo
    // doc.setFontSize(14);
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Detalle de Vehículo", 14, doc.lastAutoTable.finalY + 10);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Vehículo", "Placa", "Motor", "Chofer"]],
      body: [
        [
          `${servicio.vehiculo.nombre} (${servicio.vehiculo.modelo})`,
          servicio.vehiculo.placa,
          servicio.vehiculo.motor,
          servicio.vehiculo.chofer.nombre,
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [0, 153, 136] },
      styles: { fontSize: 10 },
    });

    // Título sección Ítems
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Detalle de Inmuebles", 14, doc.lastAutoTable.finalY + 10);

    const items = servicio.items.map((item, index) => [
      `${item.inmueble.nombre} #${index + 1}`,
      `${item.largo}x${item.ancho}x${item.alto} m`,
      `${item.peso} kg`,
      `${item.volumen} m³`,
      item.inmueble.material.nombre,
      item.inmueble.categoria.nombre,
    ]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 14,
      head: [
        ["Ítem", "Dimensiones", "Peso", "Volumen", "Material", "Categoría"],
      ],
      body: items,
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 153, 136] },
      margin: { bottom: 10 },
    });

    // Monto total después de la tabla de ítems
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      `Monto Total: Bs. ${servicio.monto_total}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      "Reporte generado automáticamente por el sistema.",
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save(`servicio_${servicio.id}.pdf`);
  };
}
export default ReportesService;
