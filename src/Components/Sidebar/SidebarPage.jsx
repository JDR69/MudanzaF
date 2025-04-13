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
        <h3 className="dropdown-label">Adm. Usuario</h3>
      </div>
      {isPaquete1Open &&
        enlaceprincipal.map(({ label, icon, to }) => (
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
        <h3 className="dropdown-label">Adm. Invent.</h3>
      </div>
      {isPaquete2Open &&
        enlaceinventario.map(({ label, icon, to }) => (
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
        <h3 className="dropdown-label">Ventas</h3>
      </div>
      {
        isPaquete40pen &&
        enlaceventa.map(({ label, icon, to }) => (
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
        <h3 className="dropdown-label">Compras</h3>
      </div>
      {
        isPaquete30pen &&
        enlacecompra.map(({ label, icon, to }) => (
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

const enlaceprincipal = [
  {
    label: "Home",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/homeda", // Corregido a "dashboard"
  },
  {
    label: "Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/usuarioGestion", // Corregido a "dashboard"
  },
  {
    label: "Clientes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/clientRegister", // Corregido a "dashboard"
  },
  {
    label: "Empleados",
    icon: <AiOutlineApartment />,
    to: "/dasboard/empleadRegister", // Corregido a "dashboard"
  },
  {
    label: "Bitacora",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/bitacora", // Corregido a "dashboard"
  },
  {
    label: "Privilegios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/privilegios", // Corregido a "dashboard"
  },
];

const enlaceinventario = [
  {
    label: "Productos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/products", // Corregido a "dashboard"
  },
  {
    label: "Categorias",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/categoriaproducto", // Corregido a "dashboard"
  },
  {
    label: "OrganizacionProducto",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/organizacion-productos", // Corregido a "dashboard"
  },
  {
    label: "Nota Salida",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/notaSalida", // Corregido a "dashboard"
  },
];
const enlacecompra = [
  {
    label: "Proveedores",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/proveedorRegister", // Corregido a "dashboard"
  },
  {
    label: "Compras",
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

const enlaceventa =[
  {
    label: "Aperturas",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/apertura",
  },
  {
    label: "Combos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/combos",
  },
  {
    label: "Facturacion",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/factura",
  },
  {
    label: "Comprobante",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/comprobantes",
  },
  {
    label: "Detalles De Facturas",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/detalleFactura",
  }
]
