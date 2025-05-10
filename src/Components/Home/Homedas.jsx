import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "./Homedas.css"
import GraficasDashboard from './GraficasDashboard';
export const HomeDas = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div >
      <div className="containerHome">
      <div onClick={() => navigate("/dasboard/vehiculos")}>
        <i className="bi bi-truck"></i>
        <h2>Vehiculos</h2>
      </div>
      <div onClick={() => navigate("/dasboard/usuarios")}>
        <i className="bi bi-person-vcard"></i>
        <h2>Usuarios</h2>
      </div>
      <div onClick={() => navigate("/dasboard/regisChofer")}>
        <i className="bi bi-person-plus-fill"></i>
        <h2>Choferes</h2>
      </div>
      <div onClick={() => navigate("/dasboard/seguros")}>
        <i className="bi bi-file-earmark-text-fill"></i>
        <h2>Seguros</h2>
      </div>
      </div>
      <GraficasDashboard />
    </div>
  );
};
