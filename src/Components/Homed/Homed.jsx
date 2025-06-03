import React, { useState, useEffect } from "react";
import  {Sidebar} from "../Sidebar/SidebarPage.jsx";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import   {HomeDas}  from "../Home/Homedas";
import { useAuth } from "../../context/AuthContext";

//--------------------Usuarios-------------//
import BitacoraPage from "../../Pages/UsuarioPage/BitacoraPage.jsx";
import PrivilegioPage from "../../Pages/UsuarioPage/PrivilegioPage.jsx";
import PerfilDeUsuario from "../../Pages/UsuarioPage/PerfilDeUsuario.jsx";
import UsuariosPage from "../../Pages/UsuarioPage/UsuariosPage.jsx";
import SeguroEmpresaPage from "../../Pages/SeguroEmpresaPage.jsx";
import ContraseñaPage from "../../Pages/UsuarioPage/ContraseñaPage.jsx";
import BackupPage from "./../../Pages/UsuarioPage/BackupPage.jsx"
//-------------------Servicios------------//
import VehiculosPage from "../../Pages/ServicioPage/VehiculosPage.jsx";
import GaleriaVehiculosPage from "../../Pages/ServicioPage/GaleriaVehiculosPage.jsx";
import AsignacionChoferePage from "../../Pages/ServicioPage/AsignacionChoferePage.jsx";
import TipoVehiculoPage from "../../Pages/ServicioPage/TipoVehiculoPage.jsx";
import RegistroInmueble from "../../Pages/ServicioPage/RegistroInmueble.jsx";
import BitacoraVehiculosPage from "../../Pages/ServicioPage/BitacoraVehiculosPage.jsx";
import InformacionTecnicaVehiculoPage from "../../Pages/ServicioPage/InformacionTecnicaVehiculoPage.jsx";
import ServicioPage from "../../Pages/ServicioPage/ServicioPage.jsx";

//------------------Verificacion----------//
import VerificacionPage from "../../Pages/VerificacionPage.jsx";

import "./Homed.css"
import ServicioModificadoPage from "../../Pages/ServicioPage/ServicioModificadoPage.jsx";
import DetalleServicio from "../../Pages/ServicioPage/DetalleModificadoPage.jsx";
import AsignacionAyudantePage from "../../Pages/ServicioPage/AsignacionAyudantePage.jsx";

import NotificacionesPage from "../../Pages/TrasladoPage/NotificacionesPage.jsx";


export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {

    const userLocal = localStorage.getItem('user');
    if (userLocal?.length === 0 || userLocal === null) {
      console.log("No hay usuario");
      navigate("/login");
    }
  }, []);

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
          <Route path="/seguros" element={<SeguroEmpresaPage/>} />
          <Route path="/password" element={<ContraseñaPage/>} />
          <Route path="/verificacion" element={<VerificacionPage/>} />
          <Route path="/bitacoraVehiculos" element={<BitacoraVehiculosPage/>} />
          <Route path="/informacionVehicular" element={<InformacionTecnicaVehiculoPage/>} />
          <Route path="/historialServicios" element={<ServicioPage/>} />
          <Route path="/notificaciones" element={<NotificacionesPage/>} />
          /*********CGGC *************************/
          <Route path="/backup" element= {<BackupPage />}/>
        
        ////******** --------------------------------*/
           <Route path="/servicioModificado" element={<ServicioModificadoPage/>} />
           <Route path="/servicioModificado/:id/detalle" element={<DetalleServicio/>} />
          <Route path="/ServicioModificado/:id/asignacion" element={<AsignacionAyudantePage/>} />
                  


          <Route path="*" element={<div>No encontrado</div>} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
