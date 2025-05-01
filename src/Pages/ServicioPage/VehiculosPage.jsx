import React, { useState } from 'react';
import '../../Css/VehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { registerVehiculo } from '../../api/auth';

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
        Placa: '',
        TipoVehiculo: '',
        PesoDeCarga: '',
        Estado: '',
        Coste_Kilometraje: '',
        Modelo: '',
        Capacidad_Maxima: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); //muestra mientras inserta

        const data = {
            placa: formData.Placa,
            tipoVehiculoId: Number(formData.TipoVehiculo),
            peso: Number(formData.PesoDeCarga),
            estado: true,
            kilometraje: Number(formData.Coste_Kilometraje),
            choferId: 1
        }

        try {
            // const res = await registerVehiculo(data);
            // console.log("✅ Vehículo registrado:", res.data);
            setLoading(false)
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000)

        } catch (err) {
            throw err;
        }

        setFormData({
            Placa: '',
            TipoVehiculo: '',
            PesoDeCarga: '',
            Estado: '',
            Coste_Kilometraje: '',
            Modelo: '',
            Capacidad_Maxima: ''
        });
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(vehiculos2[index]);
    };


    return (
        <div className='VehiculosConteiner'>
            <div className='VehiculosConteiner2'>
                <div className='tituloVehiculos'>
                    <h1>Registro de Vehiculos</h1>
                    <i className="bi bi-truck"></i>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Placa">Modelo</label>
                        <input type="text" name="Modelo" className='form-control' value={formData.Modelo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Placa">Placa</label>
                        <input type="text" name="Placa" className='form-control' value={formData.Placa} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="TipoVehiculo">Tipo Vehiculo</label>
                        {/* <select
                            name="TipoVehiculo"
                            className="form-control"
                            value={formData.TipoVehiculo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            {tipoVehiculo.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="PesoDeCarga">Peso de carga</label>
                        <input type="number" name="PesoDeCarga" className='form-control' value={formData.PesoDeCarga} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="PesoDeCarga">Capacidad Maxima</label>
                        <input type="number" name="Capacidad_Maxima" className='form-control' value={formData.Capacidad_Maxima} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Estado">Estado del Vehiculo</label>
                        <select name="Estado" className='form-control' value={formData.Estado} onChange={handleChange} required>
                            <option value="">Seleccione</option>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Usado">Usado</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Kilometraje">Coste Kilometraje</label>
                        <input type="number" name="Coste_Kilometraje" className='form-control' value={formData.Coste_Kilometraje} onChange={handleChange} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            {editIndex !== null ? 'Actualizar Vehiculo' : 'Agregar Vehiculo'}
                        </button>
                    </div>
                </form>
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