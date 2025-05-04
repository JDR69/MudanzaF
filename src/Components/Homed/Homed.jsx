import React, { useState } from "react";
import  {Sidebar} from "../Sidebar/SidebarPage.jsx";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import   {HomeDas}  from "../Home/Homedas";
import { useAuth } from "../../context/AuthContext";

//--------------------Usuarios-------------//
import BitacoraPage from "../../Pages/UsuarioPage/BitacoraPage.jsx";
import PrivilegioPage from "../../Pages/UsuarioPage/PrivilegioPage.jsx";
import PerfilDeUsuario from "../../Pages/UsuarioPage/PerfilDeUsuario.jsx";
import UsuariosPage from "../../Pages/UsuarioPage/UsuariosPage.jsx";

//-------------------Servicios------------//
import VehiculosPage from "../../Pages/ServicioPage/VehiculosPage.jsx";
import GaleriaVehiculosPage from "../../Pages/ServicioPage/GaleriaVehiculosPage.jsx";
import AsignacionChoferePage from "../../Pages/ServicioPage/AsignacionChoferePage.jsx";
import TipoVehiculoPage from "../../Pages/ServicioPage/TipoVehiculoPage.jsx";
import RegistroInmueble from "../../Pages/ServicioPage/RegistroInmueble.jsx";


import "./Homed.css"

export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="content-container">
        <Routes>
          <Route path="/homeda" element={<HomeDas />} />
          <Route path="/bitacora" element={<BitacoraPage />} />
          <Route path="/perfiles" element={<PerfilDeUsuario />} />
          <Route path="/permisos" element={<PrivilegioPage />} />
          <Route path="/vehiculos" element={<VehiculosPage />} />
          <Route path="/galeriaVeh" element={<GaleriaVehiculosPage />} />
          <Route path="/regisChofer" element={<AsignacionChoferePage/>} />
          <Route path="/usuarios" element={<UsuariosPage/>} />
          <Route path="/tipoVehiculo" element={<TipoVehiculoPage/>} />
          <Route path="/registroInmueble" element={<RegistroInmueble/>} />
          
          <Route path="*" element={<div>No encontrado</div>} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
