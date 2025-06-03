// VehiculosPage.jsx
import React, { useState, useEffect } from 'react';
import '../../Css/VehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { registerVehiculo, obtenerVehiculo, actualizarDatosVehiculo } from '../../api/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formControlClasses } from '@mui/material';

function VehiculosPage() {
    const { tipoVehiculo } = useAuth();

    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);
    const [mostrarRegistrarVehiculos, setMostrarRegistrarVehiculos] = useState(false);
    const [mostrarLista, setMostarLista] = useState(true);
    const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);

    const [filterNombre, setFilterNombre] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterTipo, setFilterTipo] = useState('');

    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        capacidad: '',
        costeKilometraje: '',
        placa: '',
        motor: '',
        modelo: '',
        tipo: '',
        seguro: '',
        estado: '',
        tipoVeh: '',
    });

    useEffect(() => {
        listarVehiculo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: ['capacidad', 'costeKilometraje', 'modelo'].includes(name) ? Number(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (formData.id !== null) {
                console.log(formData.id)
                console.log(formData)
                const data = {
                    nombre : formData.nombre,
                    capacidad: parseInt(formData.capacidad),
                    costeKilometraje: parseFloat(formData.costeKilometraje),
                    placa : formData.placa,
                    motor : formData.motor,
                    modelo : parseInt(formData.modelo),
                    tipoVehID: parseInt(formData.tipoVeh),
                    estado : 1,
                    seguro: 1
                }
                console.log(formData.tipo)
                await actualizarDatosVehiculo(formData.id,data);
                console.log('🚗 Vehículo actualizado');
            } else {
                await registerVehiculo({ ...formData, tipoVehID: formData.tipo });
                console.log('✅ Vehículo registrado');
            }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
            listarVehiculo();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setMostarLista(true)
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            nombre: '',
            capacidad: '',
            costeKilometraje: '',
            placa: '',
            motor: '',
            modelo: '',
            tipo: '',
            seguro: '',
            estado: '',
        });
        setEditIndex(null);
        setMostrarRegistrarVehiculos(false);
        setMostrarFormularioEditar(false);
    };

    const handleEdit = (index) => {
        const vehiculo = vehiculos[index];
        const tipoVeh = tipoVehiculo.filter((t) => t.nombre ===vehiculo.tipo)
        setEditIndex(index);
        setFormData({
            id: vehiculo.id,
            nombre: vehiculo.nombre || '',
            capacidad: vehiculo.capacidad || '',
            costeKilometraje: vehiculo.costeKilometraje || '',
            placa: vehiculo.placa || '',
            motor: vehiculo.motor || '',
            modelo: vehiculo.modelo || '',
            tipo: vehiculo.tipoVehID || '',
            seguro: vehiculo.seguro || '',
            estado: vehiculo.estado || '',
            tipoVeh: tipoVeh[0].id || '',
        });
        setMostrarFormularioEditar(true);
        setMostrarRegistrarVehiculos(false);
        setMostarLista(false);
    };

    const listarVehiculo = async () => {
        try {
            const res = await obtenerVehiculo();
            setVehiculos(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredVehiculos = vehiculos.filter((v) => {
        const matchNombre = v.nombre.toLowerCase().includes(filterNombre.toLowerCase());
        const matchEstado = filterEstado === '' || String(v.estado) === filterEstado;
        const matchTipo = filterTipo === '' || String(v.tipo) === filterTipo;
        return matchNombre && matchEstado && matchTipo;
    });

    const renderFormulario = () => (
        <div className='form-diseño'>
            <div className='form-Vehiculo'>
                {['nombre', 'modelo', 'motor', 'placa', 'capacidad', 'costeKilometraje'].map((field, idx) => (
                    <div className="form-groupVehiculo" key={field}>
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input type={field === 'modelo' || field === 'capacidad' || field === 'costeKilometraje' ? 'number' : 'text'} name={field} className='form-control' value={formData[field]} onChange={handleChange} required />
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button onClick={handleSubmit} className="btn btn-primary">{formData.id ? 'Actualizar Vehículo' : 'Registrar Vehículo'}</button>
                {formData.id && <button onClick={resetForm} className="btn btn-secondary ms-2">Cancelar Edición</button>}
            </div>
        </div>
    );

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Vehículos', 14, 10);
        doc.autoTable({
            startY: 20,
            head: [['Nombre', 'Modelo', 'Motor', 'Placa', 'Seguro', 'Tipo', 'Capacidad', 'Estado', 'Coste']],
            body: filteredVehiculos.map(v => [
                v.nombre, v.modelo, v.motor, v.placa, v.seguro ? 'Sí' : 'No',
                v.tipo, v.capacidad, v.estado === 1 ? 'Disponible' : 'Deshabilitado', v.costeKilometraje
            ]),
        });
        doc.save('vehiculos.pdf');
    };

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredVehiculos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Vehículos');
        XLSX.writeFile(wb, 'vehiculos.xlsx');
    };

    const handleExportHTML = () => {
        let html = `<!DOCTYPE html><html><head><title>Reporte de Vehículos</title><style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #333; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style></head><body><h2>Reporte de Vehículos</h2><table><thead><tr><th>Nombre</th><th>Modelo</th><th>Motor</th><th>Placa</th><th>Seguro</th><th>Tipo</th><th>Capacidad</th><th>Estado</th><th>Coste</th></tr></thead><tbody>`;
        filteredVehiculos.forEach(v => {
            html += `<tr><td>${v.nombre}</td><td>${v.modelo}</td><td>${v.motor}</td><td>${v.placa}</td><td>${v.seguro ? 'Sí' : 'No'}</td><td>${v.tipo}</td><td>${v.capacidad}</td><td>${v.estado === 1 ? 'Disponible' : 'Deshabilitado'}</td><td>${v.costeKilometraje}</td></tr>`;
        });
        html += '</tbody></table></body></html>';
        const newWindow = window.open('', '_blank');
        newWindow.document.write(html);
        newWindow.document.close();
    };

    return (
        <div className='VehiculosConteiner'>
            <div className='Indicaciones-Vehiculos'>
                <button onClick={() => { resetForm(); setMostrarRegistrarVehiculos(true); setMostarLista(false); }}>Nuevo Vehiculo</button>
                <button onClick={() => { resetForm(); setMostarLista(true); }}>Lista de Vehiculos</button>
            </div>

            {mostrarRegistrarVehiculos && <><h2>Registrar Vehículo</h2>{renderFormulario()}</>}
            {mostrarFormularioEditar && <><h2>Editar Vehículo</h2>{renderFormulario()}</>}

            {mostrarLista && (
                <div className='dimensionTable'>
                    <h2>Lista de Vehículos</h2>
                    <div className='form-Vehiculo'>
                        <input type="text" placeholder="Buscar por nombre" className="form-control" value={filterNombre} onChange={(e) => setFilterNombre(e.target.value)} />
                        <select className="form-control" value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="1">Disponible</option>
                            <option value="0">Deshabilitado</option>
                        </select>
                        <select className="form-control" value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
                            <option value="">Todos</option>
                            {tipoVehiculo.map((tipo) => (<option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>))}
                        </select>
                        <div className="botones-reportes">
                            <button className="btn btn-danger" onClick={handleExportPDF}>Reporte PDF</button>
                            <button className="btn btn-success" onClick={handleExportExcel}>Reporte Excel</button>
                            <button className="btn btn-info" onClick={handleExportHTML}>Reporte HTML</button>
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr><th>Nombre</th><th>Modelo</th><th>Motor</th><th>Placa</th><th>Seguro</th><th>Tipo</th><th>Capacidad</th><th>Estado</th><th>Coste</th><th>Acción</th></tr>
                        </thead>
                        <tbody>
                            {filteredVehiculos.map((vehiculo, index) => (
                                <tr key={vehiculo.id}>
                                    <td>{vehiculo.nombre}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td>{vehiculo.motor}</td>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.seguro ? 'Sí' : 'No'}</td>
                                    <td>{vehiculo.tipo }</td>
                                    <td>{vehiculo.capacidad}</td>
                                    <td>{vehiculo.estado ? 'Disponible' : 'Deshabilitado'}</td>
                                    <td>{vehiculo.costeKilometraje}</td>
                                    <td><button className="btn btn-warning" onClick={() => handleEdit(index)}>Editar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {loading && <div className="loading-overlay"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}
            {success && <div className="alert alert-success text-center">¡Vehículo guardado exitosamente! ✅</div>}
        </div>
    );
}

export default VehiculosPage;
