import React, { useState } from 'react';
import '../../Css/VehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { registerVehiculo, obtenerVehiculo } from '../../api/auth';

function VehiculosPage() {

    const { tipoVehiculo } = useAuth()

    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const vehiculos2 = [
        {
            "Placa": "ABC-123",
            "TipoVehiculo": "Camión",
            "PesoDeCarga": 5000,
            "Estado": "Activo",
            "Kilometraje": 120000
        },
        {
            "Placa": "XYZ-456",
            "TipoVehiculo": "Furgoneta",
            "PesoDeCarga": 2000,
            "Estado": "En mantenimiento",
            "Kilometraje": 80000
        },
        {
            "Placa": "JKL-789",
            "TipoVehiculo": "Pickup",
            "PesoDeCarga": 1000,
            "Estado": "Activo",
            "Kilometraje": 45000
        }
    ]

    const [formData, setFormData] = useState({
        nombre: '',
        capacidad: 0 || '',
        costeKilometraje: 0 || '',
        placa: '',
        motor: '',
        modelo: 0 || '',
        tipoVehID: 0 || 0, 
        seguro: 0 || '',
        estado: 0 || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: ['capacidad', 'costeKilometraje', 'modelo', 'tipoVehID', 'seguro', 'estado'].includes(name)
            ? Number(value)
            : value,
        });
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); //muestra mientras inserta

        try {
            console.log(formData);
            const res = await registerVehiculo(formData);
            console.log("✅ Vehículo registrado:", res.data);
            setLoading(false)
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000)

        } catch (err) {
            throw err;

        } finally {
            setLoading(false)
        }

        setFormData({
            nombre: '',
            capacidad: 0 || '',
            costeKilometraje: 0 || '',
            placa: '',
            motor: '',
            modelo: 0 || '',
            tipoVehID: 0 || 0, 
            seguro: 0 || '',
            estado: 0 || '',
        });
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(vehiculos2[index]);
    };

    const listarVehiculo = async() =>{
        try {
            const res = obtenerVehiculo();
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='VehiculosConteiner'>
            <div className='VehiculosConteiner2'>
                <div className='tituloVehiculos'>
                    <h1>Registro de Vehiculos</h1>
                    <i className="bi bi-truck"></i>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del Vehiculo</label>
                        <input type="text" name="nombre" className='form-control' value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modelo">Modelo</label>
                        <input type="number" name="modelo" className='form-control' value={formData.modelo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="motor">Motor</label>
                        <input type="text" name="motor" className='form-control' value={formData.motor} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="placa">Placa</label>
                        <input type="text" name="placa" className='form-control' value={formData.placa} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipoVehID">Tipo Vehiculo</label>
                        <select
                            name="tipoVehID"
                            className="form-control"
                            value={formData.tipoVehID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            {tipoVehiculo.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacidad">Capacidad Maxima</label>
                        <input type="number" name="capacidad" className='form-control' value={formData.capacidad} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Estado">Estado del Vehiculo</label>
                        <select name="estado" className='form-control' value={formData.estado} onChange={handleChange} required>
                            <option value="">Seleccione</option>
                            <option value={1}>Disponible</option>
                            <option value={0}>Deshabilitado</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="seguro">Contiene seguro el vehiculo</label>
                        <select name="seguro" className='form-control' value={formData.seguro} onChange={handleChange} required>
                            <option value="">Seleccione</option>
                            <option value={1}>Si</option>
                            <option value={0}>No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="costeKilometraje">Coste Kilometraje</label>
                        <input type="number" name="costeKilometraje" className='form-control' value={formData.costeKilometraje} onChange={handleChange} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            {editIndex !== null ? 'Actualizar Vehiculo' : 'Agregar Vehiculo'}
                        </button>
                    </div>
                </form>
                <button onClick={listarVehiculo}>listar</button>
                <div className='tablaVehiculos'>
                    <h2 className="mt-4">Lista de Vehículos</h2>
                    <table className="vehiculos-table">
                        <thead>
                            <tr>
                                <th>Modelo</th>
                                <th>Placa</th>
                                <th>Tipo Vehiculo</th>
                                <th>Peso de Carga</th>
                                <th>Capacidad Max</th>
                                <th>Estado</th>
                                <th>Coste Kilometraje</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos2.map((vehiculo, index) => (
                                <tr key={index}>
                                    <td>AWAI</td>
                                    <td>{vehiculo.Placa}</td>
                                    <td>{vehiculo.TipoVehiculo}</td>
                                    <td>{vehiculo.PesoDeCarga}</td>
                                    <td>2500</td>
                                    <td>{vehiculo.Estado}</td>
                                    <td>{vehiculo.Kilometraje}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleEdit(index)}>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {
                success && (
                    <div className="loading-overlay">
                        <div className="alert alert-success" role="alert">
                            ¡Vehículo guardado exitosamente! ✅
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default VehiculosPage;