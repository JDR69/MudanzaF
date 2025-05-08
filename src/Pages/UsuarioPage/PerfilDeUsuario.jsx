import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PerfilDeUsuario() {

  const { user } = useAuth();

  const [editar, setEditar] = useState(false);
  const [usuario, setUsuario] = useState({
    id: user?.id,
    nombre: user?.nombre,
    correo: user?.email,
    direccion: user?.direccion,
    telefono: user?.telefono,
    contraseña: '********',
    rol: user?.rol?.nombre || '',
    profile_icon: user?.profile_icon || '',
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setUsuario({
        id: user?.id,
        nombre: user?.nombre || '',
        correo: user?.email || '',
        direccion: user?.direccion || '',
        telefono: user?.telefono || '',
        contraseña: '********',
        rol: user?.rol?.nombre || '',
        profile_icon: user?.profile_icon || '',
      });
    }
  }, [user]);

  if (!user) {
    return <div>No hay usuario</div>;
  }

  return (
    <div className='contenedoresPrincipales'>
      <h1>Perfil del Usuario</h1>
      <div className='contenedorHijo-auxi'>
        {usuario.profile_icon && (
          <div id="auxi-hijo">
            <img
              src={usuario.profile_icon}
              alt="Foto de perfil"
              className="imagen-perfil"

            />
          </div>
        )}

        <div className='contenedorHijoDos' >
          <label htmlFor="nombre">Nombre</label>
          <input
            value={usuario?.nombre || ''}
            type="text"
            name="nombre"
            onChange={handleChange}
            className='input-perfil'
            readOnly={!editar}
          />
        </div>

        <div className='contenedorHijoDos' >
          <label htmlFor="correo">Correo</label>
          <input
            value={usuario?.correo || ''}
            type="email"
            name="correo"
            onChange={handleChange}
            className='input-perfil'
            readOnly={!editar}
          />
        </div>

        <div className='contenedorHijoDos' >
          <label htmlFor="telefono">Teléfono</label>
          <input
            value={usuario?.telefono || ''}
            type="text"
            name="telefono"
            className='input-perfil'
            onChange={handleChange}
            readOnly={!editar}
          />
        </div>

        <div className='contenedorHijoDos' >
          <label htmlFor="direccion">Dirección</label>
          <input
            value={usuario?.direccion || ''}
            type="text"
            name="direccion"
            className='input-perfil'
            onChange={handleChange}
            readOnly={!editar}
          />
        </div>

        {editar ? (
          <div className='contenedorHijoDos' >
            <label>Contraseña</label>
            <p>
              <Link to="/dasboard/password" style={{ color: '#007bff' }}>
                Click aquí para cambiar contraseña
              </Link>
            </p>
          </div>
        ) : (
          <div className='contenedorHijoDos' >
            <label htmlFor="contraseña">Contraseña</label>
            <input
              value={usuario.contraseña}
              type="password"
              name="contraseña"
              className='input-perfil'
              readOnly
            />
          </div>
        )}

        <div className='contenedorHijoDos' >
          <label htmlFor="rol">Rol</label>
          <input
            value={usuario?.rol || ''}
            type="text"
            name="rol"  
            readOnly
            className='input-perfil'
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
