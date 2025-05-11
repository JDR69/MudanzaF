import React, { useState } from 'react'
import jsPDF from 'jspdf'

const datosServicios = [
    { id: 1, nroFactura: 'F001', fecha: '2025-05-01', cliente: 'Juan Pérez', chofer: 'Carlos Ruiz', placa: 'ABC123', origen: 'La Paz', destino: 'Cochabamba', hora: '08:00' },
    { id: 2, nroFactura: 'F002', fecha: '2025-05-05', cliente: 'María López', chofer: 'Luis Fernández', placa: 'XYZ789', origen: 'Santa Cruz', destino: 'Sucre', hora: '10:30' },
    { id: 3, nroFactura: 'F003', fecha: '2025-05-08', cliente: 'Pedro Gómez', chofer: 'Carlos Ruiz', placa: 'QWE456', origen: 'Oruro', destino: 'Potosí', hora: '13:15' },
]

function ServicioPage() {
    const [busqueda, setBusqueda] = useState('')
    const [busquedaFecha, setBusquedaFecha] = useState('')
    const [detalleServicio, setDetalleServicio] = useState(null)

    const filtrarDatos = () => {
        return datosServicios.filter(item =>
            (item.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.chofer.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.placa.toLowerCase().includes(busqueda.toLowerCase())) &&
            item.fecha.includes(busquedaFecha)
        )
    }

    const exportarArchivo = (contenido, nombre, tipo) => {
        const blob = new Blob([contenido], { type: tipo })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = nombre
        a.click()
        URL.revokeObjectURL(url)
    }

    // === Exportar DETALLE ===
    const generarDetalleHTML = () => {
        if (!detalleServicio) return ''
        return `
            <html>
                <head><meta charset="UTF-8"></head>
                <body>
                    <h2>Detalles del Servicio</h2>
                    <ul>
                        <li><strong>ID:</strong> ${detalleServicio.id}</li>
                        <li><strong>NroFactura:</strong> ${detalleServicio.nroFactura}</li>
                        <li><strong>Fecha:</strong> ${detalleServicio.fecha}</li>
                        <li><strong>Cliente:</strong> ${detalleServicio.cliente}</li>
                        <li><strong>Chofer:</strong> ${detalleServicio.chofer}</li>
                        <li><strong>Placa:</strong> ${detalleServicio.placa}</li>
                        <li><strong>Origen:</strong> ${detalleServicio.origen}</li>
                        <li><strong>Destino:</strong> ${detalleServicio.destino}</li>
                        <li><strong>Hora:</strong> ${detalleServicio.hora}</li>
                    </ul>
                </body>
            </html>
        `
    }
    const exportarPDF = (titulo, datos, esTabla = false) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(titulo, 10, 10);
    
        if (esTabla) {
            let y = 20;
            doc.setFontSize(12);
            const columnas = ['ID', 'NroFactura', 'Fecha', 'Cliente', 'Chofer', 'Placa'];
    
            // Imprimir encabezados
            columnas.forEach((col, i) => {
                doc.text(col, 10 + i * 30, y);
            });
            y += 10;
    
            // Imprimir filas
            datos.forEach((fila) => {
                columnas.forEach((col, i) => {
                    const key = col.toLowerCase();
                    doc.text(String(fila[key] || fila[col]), 10 + i * 30, y);
                });
                y += 10;
            });
        } else {
            let y = 20;
            Object.entries(datos).forEach(([key, value]) => {
                doc.setFontSize(12);
                doc.text(`${key}: ${value}`, 10, y);
                y += 10;
            });
        }
    
        doc.save(`${titulo.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    }
    const exportarDetallePDF = () => {
        if (!detalleServicio) return;
        exportarPDF("Detalles del Servicio", detalleServicio);
    };
    
    const exportarDetalleExcel = () => exportarArchivo(generarDetalleHTML(), 'detalle_servicio.xls', 'application/vnd.ms-excel')
    const exportarDetalleHTML = () => exportarArchivo(generarDetalleHTML(), 'detalle_servicio.html', 'text/html')

    // === Exportar HISTORIAL ===
    const generarHistorialHTML = () => {
        const filas = filtrarDatos().map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.nroFactura}</td>
                <td>${item.fecha}</td>
                <td>${item.cliente}</td>
                <td>${item.chofer}</td>
                <td>${item.placa}</td>
            </tr>
        `).join('')

        return `
            <html>
                <head><meta charset="UTF-8"></head>
                <body>
                    <h2>Historial de Servicios</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NroFactura</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Chofer</th>
                                <th>Placa Vehículo</th>
                            </tr>
                        </thead>
                        <tbody>${filas}</tbody>
                    </table>
                </body>
            </html>
        `
    }

    const exportarHistorialPDF = () => {
        const historial = filtrarDatos();
        exportarPDF("Historial de Servicios", historial, true);
    };
       const exportarHistorialExcel = () => exportarArchivo(generarHistorialHTML(), 'historial_servicios.xls', 'application/vnd.ms-excel')
    const exportarHistorialHTML = () => exportarArchivo(generarHistorialHTML(), 'historial_servicios.html', 'text/html')

    return (
        <div className='contenedoresPrincipales'>
            <div className='contenedorHijo'>
                {detalleServicio ? (
                    <>
                        <h1>Detalles del Servicio</h1>
                        <div className="form-group2">
                            <label>ID:</label>
                            <input type="text" value={detalleServicio.id} readOnly className="form-control" />
                            <label>NroFactura:</label>
                            <input type="text" value={detalleServicio.nroFactura} readOnly className="form-control" />
                            <label>Fecha:</label>
                            <input type="date" value={detalleServicio.fecha} readOnly className="form-control" />
                            <label>Cliente:</label>
                            <input type="text" value={detalleServicio.cliente} readOnly className="form-control" />
                            <label>Chofer:</label>
                            <input type="text" value={detalleServicio.chofer} readOnly className="form-control" />
                            <label>Placa:</label>
                            <input type="text" value={detalleServicio.placa} readOnly className="form-control" />
                            <label>Origen:</label>
                            <input type="text" value={detalleServicio.origen} readOnly className="form-control" />
                            <label>Destino:</label>
                            <input type="text" value={detalleServicio.destino} readOnly className="form-control" />
                            <label>Hora:</label>
                            <input type="time" value={detalleServicio.hora} readOnly className="form-control" />
                        </div>
                        <div className='contenedorHijoFila'>
                            <button onClick={exportarDetallePDF} className="btn btn-danger">Exportar PDF</button>
                            <button onClick={exportarDetalleExcel} className="btn btn-success">Exportar Excel</button>
                            <button onClick={exportarDetalleHTML} className="btn btn-info">Exportar HTML</button>
                            <button onClick={() => setDetalleServicio(null)} className="btn btn-secondary">Volver Atrás</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Historial de Servicios</h1>
                        <div className="contenedorHijoFila">
                            <input
                                type="text"
                                placeholder="Buscar por Cliente, Chofer o Placa"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="form-control"
                            />
                            <input
                                type="date"
                                value={busquedaFecha}
                                onChange={(e) => setBusquedaFecha(e.target.value)}
                                className="form-control"
                            />
                            <button onClick={exportarHistorialPDF} className="btn btn-danger">Exportar PDF</button>
                            <button onClick={exportarHistorialExcel} className="btn btn-success">Exportar Excel</button>
                            <button onClick={exportarHistorialHTML} className="btn btn-info">Exportar HTML</button>
                        </div>

                        <div className='dimensionTable'>
                            <table className="table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NroFactura</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Chofer</th>
                                        <th>Placa Vehículo</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtrarDatos().length > 0 ? (
                                        filtrarDatos().map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.nroFactura}</td>
                                                <td>{item.fecha}</td>
                                                <td>{item.cliente}</td>
                                                <td>{item.chofer}</td>
                                                <td>{item.placa}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => setDetalleServicio(item)}
                                                    >
                                                        Ver Detalles
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No se encontraron resultados.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ServicioPage
