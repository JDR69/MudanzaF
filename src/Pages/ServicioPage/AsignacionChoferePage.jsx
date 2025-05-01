import React, { useState } from 'react';
import '../../Css/AsignacionChoferePage.css';
import Cloudinary from '../../Cloudinary';
import { registerChofer } from '../../api/auth';

const AsignacionChoferePage = () => {
  const { image, handleFileChange, uploadImage } = Cloudinary();

  const moviles = [
    { id: '1', placa: '123ABC', modelo: '2023', estado: 'En línea' },
    { id: '2', placa: '456DEF', modelo: '2022', estado: 'Fuera de línea' }
  ];

  const [estado, setEstado] = useState('En Línea');
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    carnet: '',
    direccion: '',
  });

  const filtrados = moviles.filter((movil) =>
    movil.placa.includes(busqueda) || movil.modelo.includes(busqueda)
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        dirrecion: formData.direccion,
        estado: true,
        ci: formData.carnet,
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        url_profile: "ffdsfdsfdsf",
      };

      const res = await registerChofer(data);
      alert("✅ Chofer registrado correctamente");

      // limpiar campos
      setFormData({
        nombre: '',
        email: '',
        password: '',
        carnet: '',
        direccion: '',
      });

    } catch (err) {
      console.error("❌ Error al registrar chofer:", err);
      alert("Error al registrar chofer");
    }
  };

  return (
    <div className="container-chofer">
      <div className="titulo-chofer">
        <i className="bi bi-person-fill-check icon-titulo"></i>
        <h2>Asignación de nuevo Chofer</h2>
      </div>

      <form className="formulario-chofer" onSubmit={onSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          required
        />

        <input
          type="file"
          name="file"
          className="form-control"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        <input
          type="text"
          name="carnet"
          placeholder="Carnet de Identidad"
          value={formData.carnet}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección / Vivienda"
          value={formData.direccion}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value='En Línea'>En Línea</option>
          <option value='Fuera de Línea'>Fuera de Línea</option>
        </select>

        <input type="number" value="0" disabled />

        <div className='registerChofer'>
          <button className="btn btn-success" type="submit">Registrar</button>
        </div>
      </form>

      <div className="buscar-vehiculo">
        <h3>Seleccionar el Móvil</h3>
        <input
          type='text'
          placeholder='Buscar por placa o modelo'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <table className="tabla-moviles">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Estado del Móvil</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((movil) => (
            <tr key={movil.id}>
              <td>{movil.id}</td>
              <td>{movil.placa}</td>
              <td>{movil.modelo}</td>
              <td>{movil.estado}</td>
              <td>
                <button className="btn-quitar">Quitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsignacionChoferePage;
