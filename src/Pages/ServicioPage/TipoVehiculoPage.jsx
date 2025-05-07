import React, { useState } from 'react';
import { tipoVehiculoRequest, actualizarTipoVehiculo, eliminarTipoVehiculo } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const TipoVehiculoPage = () => {
  const { tipoVehiculo } = useAuth();
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [verAgregarTipoVehiculo, setVerAgregarTipoVehiculo] = useState(false);
  const [verListarTipoVehiculo, setVerListarTipoVehiculo] = useState(true);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);
  const [mostarEliminar, setMostrarEliminar] = useState(false);

  const handleMostrarAgregar = () => {
    setVerAgregarTipoVehiculo(true);
    setVerListarTipoVehiculo(false);
  };

  const handleMostrarListar = () => {
    setVerListarTipoVehiculo(true);
    setVerAgregarTipoVehiculo(false);
    window.location.reload();
  };

  const handleCerrarVistas = () => {
    setVerAgregarTipoVehiculo(false);
    setVerListarTipoVehiculo(false);
    setNombre('');
  };

  const handleCerrarVistasActualizar = () => {
    setMostrarActualizar(false);
    setNombre('');
  };



  const TipoVehiculo = async () => {
    try {
      const data = {
        nombre: nombre
      }
      console.log(data)
      const res = await tipoVehiculoRequest(data);
      console.log(res.data)
      setNombre('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleActualizarTipoVehiculo = async () => {
    try {
      const data = {
        nombre: nombre
      }
      console.log(data, id)
      const res = await actualizarTipoVehiculo(data, id);
      console.log(res.data)
      alert("✅ Tipo de vehiculo actualizado correctamente.");
      window.location.reload();
      setMostrarActualizar(false);
      setNombre('');
      setId('');
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarParaElBackend = async () => {
    try {
      const res = await eliminarTipoVehiculo(id);
      console.log(res.data)
      alert("✅ Tipo de vehiculo eliminado correctamente.");
      window.location.reload();
      setMostrarEliminar(false);
      setId('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMostrarActualizar = (item) => {
    console.log(item);
    setMostrarActualizar(true);
    setNombre(item.nombre);
    setId(item.id);
  };

  const handleEliminarTipoVehiculo = (item) => {
    console.log(item);
    setMostrarEliminar(true);
    setId(item.id);
  };

  const handleCerrarVistasEliminar = () => {
    setMostrarEliminar(false);
    setId('');
  };

  return (
    <div className='contenedoresPrincipales' >
      <h1>Tipos de vehiculos</h1>
      <div className='contenedorHijoDos'>
        <div>
          <div className='contenedorHijoFila' >
            <button
              onClick={handleMostrarAgregar}
              className={verAgregarTipoVehiculo ? 'btn btn-success' : 'btn btn-primary'}
            >
              Agregar
            </button>
            <button
              onClick={handleMostrarListar}
              className={verListarTipoVehiculo ? 'btn btn-success' : 'btn btn-primary'}
            >
              Listar
            </button>
          </div>
        </div>
        {verAgregarTipoVehiculo && (
          <div className='contenedorHijoDos'>
            <div>
              <h3>Ingrese el Tipo de Vehiculo</h3>
            </div>
            <div >
              <input
                type="text"
                value={nombre}
                className='input-perfil'
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del tipo de vehículo"
              />
              <div className='contenedorHijoFila'>
                <button onClick={TipoVehiculo} className='btn btn-success' >Guardar</button>
                <button onClick={handleCerrarVistas} className='btn btn-primary'>Cancelar</button>
              </div>
            </div>
          </div>
        )}
        {verListarTipoVehiculo && (
          <div className='contenedorHijo' >
            <div >
              <h3>Lista de Tipos de Vehículos</h3>
            </div>
            <div className='dimensionTable'>
              <table className="table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DESCRIPCION</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tipoVehiculo.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => handleMostrarActualizar(item)}><i className="bi bi-pencil-square"></i></button>
                          <button className="btn btn-danger" onClick={() => handleEliminarTipoVehiculo(item)}><i className="bi bi-trash3-fill"></i></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {
        mostrarActualizar && (
          <div className='form-gris'>
            <div className="form-flotante">
              <div className="contenedorHijo">
                <h3>Actualizar Tipo de Vehiculo</h3>
              </div>
              <div className="contenedorHijo">
                <input
                  type="text"
                  value={nombre}
                  className="input-perfil"
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del tipo de vehículo"
                />
                <div className="contenedorHijoFila">
                  <button className="btn btn-primary" onClick={handleActualizarTipoVehiculo}>Guardar</button>
                  <button className="btn btn-danger" onClick={handleCerrarVistasActualizar}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        mostarEliminar && (
          <div className='form-gris'>
            <div className="form-flotante">
              <div className="contenedorHijo">
                <h3>Estas seguro que quieres eliminar?</h3>
              </div>
              <div className="contenedorHijo">
                <div className="contenedorHijoFila">
                  <button className="btn btn-primary" onClick={eliminarParaElBackend}>Si</button>
                  <button className="btn btn-danger" onClick={handleCerrarVistasEliminar}>No</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default TipoVehiculoPage;
