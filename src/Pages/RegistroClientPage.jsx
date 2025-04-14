import React, { useState } from 'react';
import { format } from 'date-fns';
import { registerReques } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import "../Css/RegistroClientPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function RegistroClientPage() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    username: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    password: '',
    foto: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData.fecha_nacimiento)
      const fechaFormateada = format(new Date(formData.fecha_nacimiento), "dd/MM/yyyy");
      const data = {
        nombre: formData.nombre,
        username: formData.username,
        email: formData.email,
        telefono: formData.telefono,
        fecha_nacimiento: fechaFormateada,
        password: formData.password,
        url_profile: 'jskdfjsdfjds'
      };

      console.log(data)
      const response = await registerReques(data);
      if (response.ok) {
        alert("✅ Registro exitoso");
        setFormData({
          nombre: '',
          username: '',
          email: '',
          telefono: '',
          fecha_nacimiento: '',
          password: '',
          foto: null
        });
        navigate('/login')
      } else {
        const error = await response.json();
        console.error("❌ Error en el registro:", error);
        alert("Error: " + (error?.message || 'Verifica los campos'));
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="formContainer">
      <form className='formRegisterClient' onSubmit={handleSubmit}>
        <h2 className="titulo mb-4">Registro Cliente</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input name="username" className="form-control" value={formData.username} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Sube una Foto de Perfil</label>
            <input name="foto" className="form-control" type="file" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo Electrónico</label>
            <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input name="telefono" type="tel" className="form-control" value={formData.telefono} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha de Nacimiento</label>
            <input name="fecha_nacimiento" type="date" className="form-control" value={formData.fecha_nacimiento} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" className="form-control" value={formData.password} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Confirmar Registro</button>
      </form>
    </div>
  );
}

export default RegistroClientPage;
