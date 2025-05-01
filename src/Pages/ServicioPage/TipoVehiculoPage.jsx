import React, { useState } from 'react';
import { tipoVehiculoRequest } from '../../api/auth';

const TipoVehiculoPage = () => {
  const [nombre, setNombre] = useState('');

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
    <div>
      <h1>Ingrese el tipo de nombre</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={TipoVehiculo}>mandar al backend</button>
    </div>
  );
};

export default TipoVehiculoPage;
