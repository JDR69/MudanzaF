import React, { useState } from "react";
import "./SidebarPage.css"

import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {



  const { logout } = useAuth(); // Usa el método logout
  const navigate = useNavigate(); // Hook para redirección

  // Estado para manejar dropdowns
  const [isPaquete1Open, setIsPaquete1Open] = useState(false);
  const [isPaquete2Open, setIsPaquete2Open] = useState(false);
  const [isPaquete30pen, setIsPaquete30pen] = useState(false);
  const [isPaquete40pen, setIsPaquete40pen] = useState(false);

  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const bit = {
    UsuarioID: null,
    message: ''

  };

  const handleLogout = async () => {
    await logout(); // Llama a logout del contexto
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
      <button className="sidebar-button" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="logo-content">
        <div className="img-content">
          {/* Si no necesitas el logo, puedes eliminar esta parte */}
          {/* <img src={logo} alt="logo_licoreria_bunker" /> */}
        </div>
        <h2>{sidebarOpen ? "" : ""}</h2>
      </div>

      {/* Paquete 1 - Adm. Usuario */}
      <div
        className="link-container"
        onClick={() => setIsPaquete1Open(!isPaquete1Open)}
      >
        <h3 className="dropdown-label">Usuario</h3>
      </div>
      {isPaquete1Open &&
        enlaceUsuario.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

      <div className="divider"></div>

      {/* Paquete 2 - Adm. Invent. */}
      <div
        className="link-container"
        onClick={() => setIsPaquete2Open(!isPaquete2Open)}
      >
        <h3 className="dropdown-label">Servicios</h3>
      </div>
      {isPaquete2Open &&
        enlaceServicios.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

      <div className="divider"></div>

      {/* Paquete 3 - Ventas (vacío por ahora) */}
      <div className="link-container" onClick={() => setIsPaquete40pen(!isPaquete40pen)}>
        <h3 className="dropdown-label">Experiencia</h3>
      </div>
      {
        isPaquete40pen &&
        enlaceExperiencia.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))
      }
      <div className="divider"></div>

      {/* Paquete 4 - Compras (vacío por ahora) */}
      <div className="link-container" onClick={() => setIsPaquete30pen(!isPaquete30pen)}>
        <h3 className="dropdown-label">Translado</h3>
      </div>
      {
        isPaquete30pen &&
        Translado.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))
      }

      <div className="divider"></div>

      {/* Configuración y Salir */}
      <div className="link-container">
        <NavLink
          to="/dashboard/configuracion" // Ruta de configuración
          className={({ isActive }) => `links${isActive ? " active" : ""}`}
        >
          <div className="link-icon"><AiOutlineSetting /></div>
          {sidebarOpen && <span>Configuración</span>}
        </NavLink>
      </div>


      {/*  salirrrrrr */}
      <div className="link-container">
        <button onClick={handleLogout} className="links">
          <div className="link-icon"><MdLogout /></div>
          {sidebarOpen && <span>Salir</span>}
        </button>
      </div>

      <div className="divider"></div>
    </div >
  );
};

const enlaceUsuario = [
  {
    label: "Permisos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/permisos", // Corregido a "dashboard"
  },
  {
    label: "Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/usuarios", // Corregido a "dashboard"
  },
  {
    label: "Perfiles de Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/perfiles", // Corregido a "dashboard"
  },
  {
    label: "Bitacora",
    icon: <AiOutlineApartment />,
    to: "/dasboard/bitacora", // Corregido a "dashboard"
  },
];

const enlaceServicios = [
  {
    label: "Inventario de Materiales",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/products", // Corregido a "dashboard"
  },
  {
    label: "Tipo Vehiculo",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/tipoVehiculo", // Corregido a "dashboard"
  },
  {
    label: "Tipo Emabalage",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/registroInmueble", // Corregido a "dashboard"
  },
  {
    label: "Vehiculos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/vehiculos", // Corregido a "dashboard"
  },
  {
    label: "Asignar Choferes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/regisChofer", // Corregido a "dashboard"
  },
  {
    label: "Cotizaciones",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalida", // Corregido a "dashboard"
  },
  {
    label: "Galeria de vehiculos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/galeriaVeh", // Corregido a "dashboard"
  },
  {
    label: "Bitacora vehiculos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalia", // Corregido a "dashboard"
  },
  {
    label: "Catalogo de vehiculos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalid", // Corregido a "dashboard"
  },
  {
    label: "Gestion de viajes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalid", // Corregido a "dashboard"
  },
  {
    label: "Promociones",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalid", // Corregido a "dashboard"
  },
  {
    label: "Informacion de vehiculo",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalid", // Corregido a "dashboard"
  },
  {
    label: "Gastos de Rutas",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalid", // Corregido a "dashboard"
  },
  {
    label: "Horario del Personal",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalid", // Corregido a "dashboard"
  },
];
const Translado = [
  {
    label: "Notificar",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/proveedorRegister", // Corregido a "dashboard"
  },
  {
    label: "Comentarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/compras",
  },
  {
    label: "Lotes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/lote",
  }
];
const enlacesecundario = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/dasboard/null", // Corregido a "dashboard"
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    // No necesita `to`, ya que el botón manejará el logout manualmente
  },
];

const enlaceExperiencia =[
  {
    label: "Notificaones",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/apertura",
  },
  {
    label: "Comentarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/combos",
  },
  {
    label: "Calificaciones",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/factura",
  },
  {
    label: "Alertas de translado",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/comprobantes",
  },
  {
    label: "Registros de servicios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/detalleFactura",
  }
]
