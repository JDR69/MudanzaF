import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useAuth } from '../../context/AuthContext';
import { actualizarUsuarioRequest, eliminarUsuarioRequest } from '../../api/auth';


function UsuariosPage() {
    const { usuarios, roles } = useAuth();
    const [nuevoUsuario, setNuevoUsuario] = useState({
        id: '',
        nombre: '',
        email: '',
        rol: '', 
        telefono:'', 
        direccion:""
      });
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    const [imagenExpandida, setImagenExpandida] = useState(null);

    const handleListarUsuarios = () => {
    };

    const handleCerrarImagen = () => {
        setImagenExpandida(null);
    };

    const usuariosFiltrados = usuarios.filter((u) => {
        const coincideNombre = u.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideRol = filtroRol ? u.rol === filtroRol : true;
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
            Rol: u.rol
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, 'usuarios.xlsx');
    };

    const rolesUnicos = [...new Set(usuarios.map(u => u.rol))];

    const EditarUsuario = (usuario) => {
        console.log(roles);

        const datos ={
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.correo,
            rol: usuario.rol,
            telefono: usuario.telefono,
            direccion: usuario.direccion
        }
        setNuevoUsuario(datos);
        setMostrarActualizar(true);
    }

    const handleActualizarUsuario = async() => {

        const obtenerIdrol = roles.find((rol) => rol.nombre === nuevoUsuario.rol);

        try {
            const datos = {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: obtenerIdrol.id,
                telefono: nuevoUsuario.telefono,
                direccion: nuevoUsuario.direccion,
                urlImg: "aaaaaaaaaaaaaaa"
            }
            console.log(datos);
            const res = await actualizarUsuarioRequest(datos,nuevoUsuario.id);
            console.log(res.data);
            setNuevoUsuario({
                id: '',
                nombre: '',
                email: '',
                rol: '', 
                telefono:'', 
                direccion:""
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert(error.response.data.error);
        }finally{
            setMostrarActualizar(false);
        }
    }

    const eliminarUsuario = async(id) => {
        try {
            const res = await eliminarUsuarioRequest(id);
            console.log(res.data);
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert(error.response.data.error);
        }
    }

    
    return (
        <div className='contenedoresPrincipales'>
            <h1>Usuarios</h1>
            <div className='contenedorHijo'>
                <div className="contenedorHijoFila">
                    <button onClick={handleListarUsuarios} className="btn btn-primary">Listar Usuarios</button>
                    <button onClick={exportarPDF} className="btn btn-danger">Exportar PDF</button>
                    <button onClick={exportarExcel} className="btn btn-success">Exportar Excel</button>

                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="form-control"
                    />
                    <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)} className='form-control'>
                        <option value="">Seleccion un Rol </option>
                        {rolesUnicos.map((rol, index) => (
                            <option key={index} value={rol}>{rol}</option>
                        ))}
                    </select>
                </div>

                <div className='dimensionTable'>
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Rol</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.length > 0 ? (
                                usuariosFiltrados.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.direccion}</td>
                                        <td>{usuario.rol}</td>
                                        <td>
                                            <img
                                                src={usuario.urlImg}
                                                alt="Perfil"
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary"  onClick={ () => EditarUsuario(usuario)}><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" onClick={ () => eliminarUsuario(usuario.id)}><i className="bi bi-trash3-fill"></i></button>
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
            </div>

            {imagenExpandida && (
                <div className="imagen-modal" onClick={handleCerrarImagen}>
                    <img src={imagenExpandida} alt="Imagen ampliada" className="imagen-ampliada" />
                </div>
            )}
            {
                mostrarActualizar && (
                    <div className='form-gris'>
                        <div className='form-flotante'>
                            <h1>Actualizar Usuario</h1>
                            <form className='Usuario-actualizar'>
                                <div >
                                    <label >Nombre</label>
                                    <input type="text" className="form-control" id="nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
                                </div>
                                <div >
                                    <label >Correo</label>
                                    <input type="email" className="form-control" id="email" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} />
                                </div>
                                <div >
                                    <label >Rol</label>
                                    <select className="form-select" id="rol" value={nuevoUsuario.rol} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                                        <option value="">Selecciona un rol </option>
                                        {roles.map((rol, index) => (
                                            <option key={index} value={rol.nombre}>{rol.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div >
                                    <label >Teléfono</label>
                                    <input type="text" className="form-control" id="telefono" value={nuevoUsuario.telefono ?? ""} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })} />
                                </div>
                                <div >
                                    <label >Dirección</label>
                                    <input type="text" className="form-control" id="direccion" value={nuevoUsuario.direccion ?? ""} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, direccion: e.target.value })} />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleActualizarUsuario}>Actualizar</button>
                                <button type="button" className="btn btn-danger" onClick={() => setMostrarActualizar(false)}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default UsuariosPage;
