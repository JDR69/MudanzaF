import React, { useState } from 'react';
import '../../Css/UsuariosPage.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const listaUsuarios = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        telefono: '71234567',
        direccion: 'Calle Falsa 123',
        rol: { nombre: 'Administrador' },
        profile_icon: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 2,
        nombre: 'María López',
        email: 'maria.lopez@example.com',
        telefono: '76543210',
        direccion: 'Av. Libertad 456',
        rol: { nombre: 'Vendedor' },
        profile_icon: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
];

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    const [imagenExpandida, setImagenExpandida] = useState(null);

    const handleListarUsuarios = () => {
        setUsuarios(listaUsuarios);
    };

    const handleCerrarImagen = () => {
        setImagenExpandida(null);
    };

    const usuariosFiltrados = usuarios.filter((u) => {
        const coincideNombre = u.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideRol = filtroRol ? u.rol.nombre === filtroRol : true;
        return coincideNombre && coincideRol;
    });

    const exportarPDF = () => {
        if (usuariosFiltrados.length === 0) {
            alert("No hay usuarios para exportar.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Reporte de Usuarios", 14, 16);

        const columns = ["ID", "Nombre", "Email", "Teléfono", "Dirección", "Rol"];
        const rows = usuariosFiltrados.map(u => [
            u.id,
            u.nombre,
            u.email,
            u.telefono,
            u.direccion,
            u.rol?.nombre || ""
        ]);

        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 20
        });

        doc.save('reporte_usuarios.pdf');
    };



    const exportarExcel = () => {
        const data = usuariosFiltrados.map(u => ({
            ID: u.id,
            Nombre: u.nombre,
            Email: u.email,
            Teléfono: u.telefono,
            Dirección: u.direccion,
            Rol: u.rol.nombre
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, 'usuarios.xlsx');
    };

    const rolesUnicos = [...new Set(listaUsuarios.map(u => u.rol.nombre))];

    return (
        <div className='contenedoresPrincipales'>
            <h1>Usuarios</h1>
            <div className='contenedorHijo'>
                <div className="contenedorHijoFila">
                    <button onClick={handleListarUsuarios} className="btn-primary">Listar Usuarios</button>
                    <button onClick={exportarPDF} className="btn-danger">Exportar PDF</button>
                    <button onClick={exportarExcel} className="btn-success">Exportar Excel</button>

                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="form-control"
                    />
                    <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)} className="form-select">
                        <option value="">Todos los Roles</option>
                        {rolesUnicos.map((rol, index) => (
                            <option key={index} value={rol}>{rol}</option>
                        ))}
                    </select>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Rol</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.length > 0 ? (
                            usuariosFiltrados.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.direccion}</td>
                                    <td>{usuario.rol.nombre}</td>
                                    <td>
                                        <img
                                            src={usuario.profile_icon}
                                            alt="Perfil"
                                            className="imagen-miniatura"
                                            onClick={() => setImagenExpandida(usuario.profile_icon)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay usuarios que coincidan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {imagenExpandida && (
                <div className="imagen-modal" onClick={handleCerrarImagen}>
                    <img src={imagenExpandida} alt="Imagen ampliada" className="imagen-ampliada" />
                </div>
            )}
        </div>
    );
}

export default UsuariosPage;
