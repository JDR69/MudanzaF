import React, { useState } from 'react';
import { format } from 'date-fns';
import { registerReques } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import "../../Css/RegistroClientPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function RegistroClientPage() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    profile_icon: '',
    direccion: '',
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_icon') {
      setFormData({ ...formData, profile_icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Campo requerido";
    if (!formData.email.trim()) newErrors.email = "Campo requerido";
    if (!formData.telefono.trim()) newErrors.telefono = "Campo requerido";
    if (!formData.password.trim()) newErrors.password = "Campo requerido";
    if (!formData.direccion.trim()) newErrors.direccion = "Campo requerido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {

      const res = await registerReques(formData);
      console.log(res.data);
      alert("✅ Registro exitoso");
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        profile_icon: '',
        direccion: '',
      });

      navigate('/login');

    } catch (err) {
      console.error("❌ Error en el registro:", err);

      // axios puede tener response.data.message
      const mensaje = err?.response?.data?.error|| 'Verifica los campos o intenta más tarde.';
      alert("Error: " + mensaje);
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
            {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Sube una Foto de Perfil</label>
            <input name="profile_icon" className="form-control" type="file" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo Electrónico</label>
            <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Direccion</label>
            <input name="direccion" type="text" className="form-control" value={formData.direccion} onChange={handleChange} />
            {errors.direccion && <small className="text-danger">{errors.direccion}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input name="telefono" type="tel" className="form-control" value={formData.telefono} onChange={handleChange} />
            {errors.telefono && <small className="text-danger">{errors.telefono}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" className="form-control" value={formData.password} onChange={handleChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Confirmar Registro</button>
      </form>
    </div>
  );
}

export default RegistroClientPage;
