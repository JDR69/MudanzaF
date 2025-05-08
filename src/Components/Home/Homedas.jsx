import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const HomeDas = () => {

  const { user} = useAuth();

  return (
    <div className="containerHome">
      <h1 className="welcomeMessage">Bienvenido: { user?.nombre }</h1>
    </div>
  );
};
