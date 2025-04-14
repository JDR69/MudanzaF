import React, { useState } from 'react';
import '../Css/PerfilDeUsuario.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PerfilDeUsuario() {

  const { user } = useAuth();

  const [editar, setEditar] = useState(false);
  const [usuario, setUsuario] = useState({
    id: user.id,
    nombre: user.nombre,
    correo: user.email,
    direccion: 'av/bolivia',
    telefono: '76672191',
    contraseña: '********',
    puntaje: '5',
    rol: user.rol.nombre
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <div className='PerfilContenedor'>
      <div className='PerfilConteiner'>
        <h1>Perfil del Usuario</h1>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            value={usuario.nombre}
            type="text"
            name="nombre"
            className={`form-control ${editar ? 'input-editable' : ''}`}
            onChange={handleChange}
            readOnly={!editar}
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            value={usuario.correo}
            type="email"
            name="correo"
            className={`form-control ${editar ? 'input-editable' : ''}`}
            onChange={handleChange}
            readOnly={!editar}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            value={usuario.telefono}
            type="text"
            name="telefono"
            className={`form-control ${editar ? 'input-editable' : ''}`}
            onChange={handleChange}
            readOnly={!editar}
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            value={usuario.direccion}
            type="text"
            name="direccion"
            className={`form-control ${editar ? 'input-editable' : ''}`}
            onChange={handleChange}
            readOnly={!editar}
          />
        </div>

        {editar ? (
          <div className="form-group">
            <label>Contraseña</label>
            <p>
              <Link to="/contraseña" style={{ color: '#007bff' }}>
                Click aquí para cambiar contraseña
              </Link>
            </p>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              value={usuario.contraseña}
              type="password"
              name="contraseña"
              className="form-control"
              readOnly
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="puntaje">Media Puntaje</label>
          <input
            value={usuario.puntaje}
            type="text"
            name="puntaje"
            className="form-control"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <input
            value={usuario.rol}
            type="text"
            name="rol"
            className="form-control"
            readOnly
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          {editar ? (
            <button
              onClick={() => {
                console.log("Datos guardados:", usuario);
                setEditar(false);
              }}
              className="btn btn-success"
            >
                            Guardar Cambios
            </button>
          ) : (
            <button
              onClick={() => setEditar(true)}
              className="btn btn-primary"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilDeUsuario;