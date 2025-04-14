import React, { useState } from 'react';
import '../Css/VehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';
import { registerVehiculo } from '../api/auth';

function VehiculosPage() {

    const { tipoVehiculo } = useAuth()

    const [editIndex, setEditIndex] = useState(null);
    const [vehiculos, setVehiculos] = useState([]);
    const [formData, setFormData] = useState({
        Placa: '',
        TipoVehiculo: '',
        PesoDeCarga: '',
        Estado: '',
        Kilometraje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedVehiculos = vehiculos.map((vehiculo, index) =>
                index === editIndex ? formData : vehiculo
            );
            setVehiculos(updatedVehiculos);
            setEditIndex(null);
        } else {
            setVehiculos([...vehiculos, formData]);
        }
        console.log(vehiculos)
        setFormData({
            Placa: '',
            TipoVehiculo: '',
            PesoDeCarga: '',
            Estado: '',
            Kilometraje: ''
        });
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(vehiculos[index]);
    };

    const handleDelete = (index) => {
        const updatedVehiculos = vehiculos.filter((_, i) => i !== index);
        setVehiculos(updatedVehiculos);
    };

    return (
        <div className='VehiculosConteiner'>
            <div className='VehiculosConteiner2'>
                <h1>Registro de Vehiculos</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Placa">Placa</label>
                        <input type="text" name="Placa" className='form-control' value={formData.Placa} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="TipoVehiculo">Tipo Vehiculo</label>
                        <select
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
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="PesoDeCarga">Peso de carga</label>
                        <input type="number" name="PesoDeCarga" className='form-control' value={formData.PesoDeCarga} onChange={handleChange} required />
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
                        <label htmlFor="Kilometraje">Kilometraje</label>
                        <input type="number" name="Kilometraje" className='form-control' value={formData.Kilometraje} onChange={handleChange} required />
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
                                <th>Placa</th>
                                <th>Tipo</th>
                                <th>Peso de Carga</th>
                                <th>Estado</th>
                                <th>Kilometraje</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo, index) => (
                                <tr key={index}>
                                    <td>{vehiculo.Placa}</td>
                                    <td>{vehiculo.TipoVehiculo}</td>
                                    <td>{vehiculo.PesoDeCarga}</td>
                                    <td>{vehiculo.Estado}</td>
                                    <td>{vehiculo.Kilometraje}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleEdit(index)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VehiculosPage;