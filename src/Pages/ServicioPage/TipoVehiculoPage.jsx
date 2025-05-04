import React, { useState } from 'react';
import { tipoVehiculoRequest } from '../../api/auth';
import "../../Css/TipoVehiculoPage.css";

const TipoVehiculoPage = () => {
  const [nombre, setNombre] = useState('');
  const [verAgregarTipoVehiculo, setVerAgregarTipoVehiculo] = useState(false);
  const [verListarTipoVehiculo, setVerListarTipoVehiculo] = useState(true);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);

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

  const TipoVehiculo = async () => {
    try {
      const data = {
        nombre: nombre
      }
      console.log(data)
      const res = await tipoVehiculoRequest(data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tipo-vehiculo-container">
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
              <button className="btn-cerrar" onClick={handleCerrarVistas}>
                <i class="bi bi-x-square-fill"></i>
              </button>
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
                  <tr>
                    <td>1</td>
                    <td>tipo de vehiculo</td>
                    <td className="botonesTipoVehiculo3">
                      <button><i className="bi bi-pencil-square"></i></button>
                      <button><i className="bi bi-trash3-fill"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {
        mostrarActualizar && (
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
                <button onClick={TipoVehiculo}>Guardar</button>
                <button onClick={handleCerrarVistas}>Cancelar</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default TipoVehiculoPage;
