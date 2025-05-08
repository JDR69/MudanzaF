import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function VehiculosPage() {
    const datosFicticios = [
        { id: 1, placa: 'ABC123', chofer: 'Juan Pérez', origen: 'La Paz', destino: 'Cochabamba', distancia: '370 km', fechaReservada: '2025-05-01', fechaLlegada: '2025-05-02' },
        { id: 2, placa: 'XYZ789', chofer: 'Luis Gómez', origen: 'Santa Cruz', destino: 'Sucre', distancia: '500 km', fechaReservada: '2025-05-03', fechaLlegada: '2025-05-04' },
        { id: 3, placa: 'LMN456', chofer: 'Ana Torres', origen: 'Tarija', destino: 'Potosí', distancia: '280 km', fechaReservada: '2025-05-02', fechaLlegada: '2025-05-03' },
    ];
    const [searchName, setSearchName] = useState('');
    const [searchPlaca, setSearchPlaca] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredSorted = datosFicticios
        .filter(item => item.chofer.toLowerCase().includes(searchName.toLowerCase()))
        .filter(item => item.placa.toLowerCase().includes(searchPlaca.toLowerCase()))
        .sort((a, b) =>
            sortOrder === 'asc'
                ? new Date(a.fechaReservada) - new Date(b.fechaReservada)
                : new Date(b.fechaReservada) - new Date(a.fechaReservada)
        );

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Vehículos', 14, 10);
        doc.autoTable({
            startY: 20,
            head: [['ID', 'Placa', 'Chofer', 'Origen', 'Destino', 'Distancia', 'Fecha Reservada', 'Fecha Llegada']],
            body: filteredSorted.map(v => [
                v.id, v.placa, v.chofer, v.origen, v.destino, v.distancia, v.fechaReservada, v.fechaLlegada
            ]),
        });
        doc.save('vehiculos.pdf');
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredSorted);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehiculos');
        XLSX.writeFile(workbook, 'vehiculos.xlsx');
    };

    const exportHTML = () => {
        const win = window.open('', '', 'width=900,height=600');
        const html = `
            <html>
            <head>
                <title>Reporte de Vehículos</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Reporte de Vehículos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Chofer</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Distancia</th>
                            <th>Fecha Reservada</th>
                            <th>Fecha Llegada</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredSorted.map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.placa}</td>
                                <td>${item.chofer}</td>
                                <td>${item.origen}</td>
                                <td>${item.destino}</td>
                                <td>${item.distancia}</td>
                                <td>${item.fechaReservada}</td>
                                <td>${item.fechaLlegada}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        win.document.write(html);
        win.document.close();
        win.focus();
    };

    return (
        <div className='contenedoresPrincipales'>
            <h1>Bitacora de Vehículos</h1>
            <div className='contenedorHijo'>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar por chofer"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                />
                 <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar por Placa"
                    value={searchPlaca}
                    onChange={e => setSearchPlaca(e.target.value)}
                />
                <select className="form-control" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="asc">Fecha Ascendente</option>
                    <option value="desc">Fecha Descendente</option>
                </select>
                <button className="btn btn-danger" onClick={exportPDF}>Exportar PDF</button>
                <button className="btn btn-success" onClick={exportExcel}>Exportar Excel</button>
                <button className="btn btn-info" onClick={exportHTML}>Ver Reporte HTML</button>
            </div>
            <div className='dimensionTable'>
                <table className='table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Chofer</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Distancia</th>
                            <th>Fecha Reservada</th>
                            <th>Fecha Llegada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSorted.length > 0 ? (
                            filteredSorted.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.placa}</td>
                                    <td>{item.chofer}</td>
                                    <td>{item.origen}</td>
                                    <td>{item.destino}</td>
                                    <td>{item.distancia}</td>
                                    <td>{item.fechaReservada}</td>
                                    <td>{item.fechaLlegada}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No se encontraron registros de vehículos.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VehiculosPage;
