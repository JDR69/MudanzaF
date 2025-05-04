import React, { useState } from 'react';
import { tipoVehiculoRequest, actualizarTipoVehiculo, eliminarTipoVehiculo } from '../../api/auth';
import "../../Css/TipoVehiculoPage.css";
import { useAuth } from '../../context/AuthContext';

const TipoVehiculoPage = () => {
  const { tipoVehiculo } = useAuth();
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [verAgregarTipoVehiculo, setVerAgregarTipoVehiculo] = useState(false);
  const [verListarTipoVehiculo, setVerListarTipoVehiculo] = useState(true);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);
  const [mostarEliminar,setMostrarEliminar] = useState(false);

  const handleMostrarAgregar = () => {
    setVerAgregarTipoVehiculo(true);
    setVerListarTipoVehiculo(false);
  };

  const handleMostrarListar = () => {
    setVerListarTipoVehiculo(true);
    setVerAgregarTipoVehiculo(false);
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
      console.log(data,id)
      const res = await actualizarTipoVehiculo(data,id);
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
    <div className="tipo-vehiculo-container" >
      <div className='formularioTipoVehiculo'>
        <div>
          <h1>Tipos de vehiculos</h1>
          <div className='botonesTipoVehiculo'>
            <button
              onClick={handleMostrarAgregar}
              className={verAgregarTipoVehiculo ? 'active' : ''}
            >
              Agregar
            </button>
            <button
              onClick={handleMostrarListar}
              className={verListarTipoVehiculo ? 'active' : ''}
            >
              Listar
            </button>
          </div>
        </div>
        {verAgregarTipoVehiculo && (
          <div className="vista-container">
            <div className="vista-header">
              <h2>Ingrese el Tipo de Vehiculo</h2>
            </div>
            <div className="vista-content">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del tipo de vehículo"
              />
              <div className="vista-buttons">
                <button onClick={TipoVehiculo}>Guardar</button>
                <button onClick={handleCerrarVistas}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
        {verListarTipoVehiculo && (
          <div className="vista-container-form">
            <div className="vista-header">
              <h2>Lista de Tipos de Vehículos</h2>
            </div>
            <div className="vista-form">
              <table className="table table-bordered">
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
                        <td className="botonesTipoVehiculo3">
                          <button onClick={() => handleMostrarActualizar(item)}><i className="bi bi-pencil-square"></i></button>
                          <button onClick={() => handleEliminarTipoVehiculo(item)}><i className="bi bi-trash3-fill"></i></button>
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
          <div className='modal-backdrop'>
            <div className="vistaActualizar">
              <div className="vista-header">
                <h2>Actualizar Tipo de Vehiculo</h2>
              </div>
              <div className="vista-content">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del tipo de vehículo"
                />
                <div className="vista-buttons">
                  <button onClick={handleActualizarTipoVehiculo}>Guardar</button>
                  <button onClick={handleCerrarVistasActualizar}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        mostarEliminar && (
          <div className='modal-backdrop'>
            <div className="vistaActualizar">
              <div className="vista-header">
                <h2>Estas seguro que quieres eliminar?</h2>
              </div>
              <div className="vista-content">
                <div className="vista-buttons">
                  <button onClick={eliminarParaElBackend}>Si</button>
                  <button onClick={handleCerrarVistasEliminar}>No</button>
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
