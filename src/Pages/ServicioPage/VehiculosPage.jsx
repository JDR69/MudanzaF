import React, { useState, useEffect } from 'react';
import '../../Css/VehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { registerVehiculo, obtenerVehiculo } from '../../api/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function VehiculosPage() {
    const { tipoVehiculo } = useAuth();

    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);
    const [mostrarRegistrarVehiculos, setMostrarRegistrarVehiculos] = useState(false)
    const [mostrarLista, setMostarLista] = useState(true);

    const [filterNombre, setFilterNombre] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterTipo, setFilterTipo] = useState('');

    const [formData, setFormData] = useState({
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

    useEffect(() => {
        listarVehiculo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: ['capacidad', 'costeKilometraje', 'modelo', 'tipoVehID'].includes(name)
                ? Number(value)
                : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(formData);
            const res = await registerVehiculo(formData);
            console.log("✅ Vehículo registrado:", res.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
            listarVehiculo();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

        setFormData({
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
    };

    const handleEdit = (index) => {
        const vehiculo = vehiculos[index];
        setEditIndex(index);
        setFormData({
            nombre: vehiculo.nombre || '',
            capacidad: vehiculo.capacidad || '',
            costeKilometraje: vehiculo.costeKilometraje || '',
            placa: vehiculo.placa || '',
            motor: vehiculo.motor || '',
            modelo: vehiculo.modelo || '',
            tipo: vehiculo.tipo || '',
            seguro: vehiculo.seguro || '',
            estado: vehiculo.estado || '',
        });
    };

    const listarVehiculo = async () => {
        try {
            const res = await obtenerVehiculo();
            setVehiculos(res.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const filteredVehiculos = vehiculos.filter((v) => {
        const matchNombre = v.nombre.toLowerCase().includes(filterNombre.toLowerCase());
        const matchEstado = filterEstado === '' || String(v.estado) === filterEstado;
        const matchTipo = filterTipo === '' || String(v.tipo) === filterTipo;
        return matchNombre && matchEstado && matchTipo;
    });

    const handleCambioLista = () => {
        setMostrarRegistrarVehiculos(false);
        setMostarLista(true);
    }
    const handleCambioNuevo = () => {
        setMostrarRegistrarVehiculos(true);
        setMostarLista(false);
    }

    return (
        <div className='VehiculosConteiner'>
            <div className='VehiculosConteiner2'>
                <div className='Indicaciones-Vehiculos'>
                    <button onClick={handleCambioNuevo}>Nuevo Vehiculo</button>
                    <button onClick={handleCambioLista}>Lista de Vehiculos</button>
                    <button>Actualizar datos del Vehiculo</button>
                </div>

                {
                    mostrarRegistrarVehiculos && (
                        <div >
                            <div className='tituloVehiculos'>
                                <h1>Registro de Vehiculos</h1>
                                <i className="bi bi-truck"></i>
                            </div>

                            <div className='form-diseño'>
                                <div className='form-Vehiculo'>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="nombre">Nombre del Vehiculo</label>
                                        <input type="text" name="nombre" className='form-control' value={formData.nombre} onChange={handleChange} required />
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="modelo">Modelo</label>
                                        <input type="number" name="modelo" className='form-control' value={formData.modelo} onChange={handleChange} required />
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="motor">Motor</label>
                                        <input type="text" name="motor" className='form-control' value={formData.motor} onChange={handleChange} required />
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="placa">Placa</label>
                                        <input type="text" name="placa" className='form-control' value={formData.placa} onChange={handleChange} required />
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="tipo">Tipo Vehiculo</label>
                                        <select
                                            name="tipo"
                                            className="form-control"
                                            value={formData.tipo}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="tipo">Seleccione</option>
                                            {tipoVehiculo.map((tipo) => (
                                                <option key={tipo.id} value={tipo.nombre}>
                                                    {tipo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="capacidad">Capacidad Maxima</label>
                                        <input type="number" name="capacidad" className='form-control' value={formData.capacidad} onChange={handleChange} required />
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="estado">Estado del Vehiculo</label>
                                        <select name="estado" className='form-control' value={formData.estado} onChange={handleChange} required>
                                            <option value="">Seleccione</option>
                                            <option value="Disponible">Disponible</option>
                                            <option value="No Disponible">Deshabilitado</option>
                                        </select>
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="seguro">Contiene seguro el vehiculo</label>
                                        <select name="seguro" className='form-control' value={formData.seguro} onChange={handleChange} required>
                                            <option value="">Seleccione</option>
                                            <option value="SI">Sí</option>
                                            <option value="NO">No</option>
                                        </select>
                                    </div>
                                    <div className="form-groupVehiculo">
                                        <label htmlFor="costeKilometraje">Coste Kilometraje</label>
                                        <input type="number" name="costeKilometraje" className='form-control' value={formData.costeKilometraje} onChange={handleChange} required />
                                    </div>

                                </div>

                                <div className="text-center">
                                    <button onClick={handleSubmit} className="btn btn-primary">
                                        Registrar
                                    </button>
                                </div>
                            </div>
                        </div>

                    )
                }

                {
                    mostrarLista && (
                        <div className='form-diseño'>
                            <div className='tituloVehiculos'>
                                <h1>Lista de Vehículos</h1>
                            </div>
                            <div className='form-Vehiculo'>
                                <div>
                                    <label>Buscar por nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={filterNombre}
                                        onChange={(e) => setFilterNombre(e.target.value)}
                                    />
                                </div>
                                <div className='form-groupVehiculo'>
                                    <label>Filtrar por estado:</label>
                                    <select
                                        className="form-control"
                                        value={filterEstado}
                                        onChange={(e) => setFilterEstado(e.target.value)}
                                    >
                                        <option value="">Todos</option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="No Disponible">Deshabilitado</option>
                                    </select>
                                </div>
                                <div className='form-groupVehiculo'>
                                    <label>Filtrar por tipo de vehículo:</label>
                                    <select
                                        className="form-control"
                                        value={filterTipo}
                                        onChange={(e) => setFilterTipo(e.target.value)}
                                    >
                                        <option value="">Todos</option>
                                        {tipoVehiculo.map((tipo) => (
                                            <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="botones-reportes">
                                    <button className="btn btn-danger" onClick={handleExportPDF}>
                                        Reporte PDF
                                    </button>
                                    <button className="btn btn-success" onClick={handleExportExcel}>
                                        Reporte Excel
                                    </button>
                                </div>

                            </div>

                            <div className='dimensionTable'>
                                <table className="table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Modelo</th>
                                            <th>Motor</th>
                                            <th>Placa</th>
                                            <th>Seguro</th>
                                            <th>Tipo Vehiculo</th>
                                            <th>Capacidad Max</th>
                                            <th>Estado</th>
                                            <th>Coste Kilometraje</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredVehiculos.map((vehiculo, index) => (
                                            <tr key={index}>
                                                <td>{vehiculo.nombre}</td>
                                                <td>{vehiculo.modelo}</td>
                                                <td>{vehiculo.motor}</td>
                                                <td>{vehiculo.placa}</td>
                                                <td>{vehiculo.seguro ? 'Sí' : 'No'}</td>
                                                <td>{vehiculo.tipo}</td>
                                                <td>{vehiculo.capacidad}</td>
                                                <td>{vehiculo.estado === "Disponible" ? 'Disponible' : 'Deshabilitado'}</td>
                                                <td>{vehiculo.costeKilometraje}</td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => handleEdit(index)}>Editar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    )
                }

            </div>

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {success && (
                <div className="loading-overlay">
                    <div className="alert alert-success" role="alert">
                        ¡Vehículo guardado exitosamente! ✅
                    </div>
                </div>
            )}
        </div>
    );
}

export default VehiculosPage;
