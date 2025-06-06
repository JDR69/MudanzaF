import React, { useState } from 'react';
import '../../Css/BitacoraPage.css';
import { useAuth } from '../../context/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BitacoraPage = () => {
    const { bitacora } = useAuth();
    const [searchName, setSearchName] = useState('');
    const [sortByDate, setSortByDate] = useState('asc');

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Bitácora', 14, 10);
        doc.autoTable({
            startY: 20,
            head: [['ID', 'Usuario', 'Correo', 'IP', 'Fecha', 'Hora', 'Acción']],
            body: filteredBitacoras.map(b => [
                b.id, b.usuario.nombre, b.usuario.email, b.ip, b.fecha, b.hora, b.tipo_sesion
            ])
        });
        doc.save('bitacora.pdf');
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredBitacoras);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bitacora');
        XLSX.writeFile(workbook, 'bitacora.xlsx');
    };

    const exportHTML = () => {
        const win = window.open('', '', 'width=900,height=600');
        const html = `
            <html>
            <head>
                <title>Reporte de Bitacora</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Reporte de Bitacora</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Dirección IP</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredBitacoras.map( bitacora => `
                                <tr key=${bitacora.id}>
                                    <td>${bitacora.id}</td>
                                    <td>${bitacora.usuario?.nombre}</td>
                                    <td>${bitacora.usuario?.email}</td>
                                    <td>${bitacora.ip}</td>
                                    <td>${bitacora.fecha}</td>
                                    <td>${bitacora.hora}</td>
                                    <td>${bitacora.tipo_sesion}</td>
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

    const filteredBitacoras = (Array.isArray(bitacora) ? bitacora : [])
        .filter(b => b.usuario?.nombre.toLowerCase().includes(searchName.toLowerCase()))
        .sort((a, b) => {
            if (sortByDate === 'asc') return new Date(a.fecha) - new Date(b.fecha);
            return new Date(b.fecha) - new Date(a.fecha);
        });

    return (
        <div className='contenedoresPrincipales'>
            <h1>Registros de acciones en el Sistema</h1>

            <div className='contenedorHijoFila'>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                />
                <select onChange={e => setSortByDate(e.target.value)} value={sortByDate} className="form-control">

                    <option value="asc">Fecha Ascendente</option>
                    <option value="desc">Fecha Descendente</option>
                </select>
                <button className="btn btn-danger" onClick={handleExportPDF}>Exportar PDF</button>
                <button className="btn btn-success" onClick={handleExportExcel}>Exportar Excel</button>
                <button className="btn btn-info" onClick={exportHTML}>Exportar HTML</button>
      
            </div>

            <div className="table-responsive">
                <table className="bitacora-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Dirección IP</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBitacoras.length > 0 ? (
                            filteredBitacoras.map((bitacora) => (
                                <tr key={bitacora.id}>
                                    <td>{bitacora.id}</td>
                                    <td>{bitacora.usuario?.nombre}</td>
                                    <td>{bitacora.usuario?.email}</td>
                                    <td>{bitacora.ip}</td>
                                    <td>{bitacora.fecha}</td>
                                    <td>{bitacora.hora}</td>
                                    <td>{bitacora.tipo_sesion}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No se encontraron registros de bitácora.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BitacoraPage;
