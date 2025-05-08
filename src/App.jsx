import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  AuthProvider, useAuth } from "./context/AuthContext"
import CustomNavbar from "./Components/CustomNavbar"
import Home from "./Pages/Home"
// import VehiculosPage from "./Pages/VehiculosPage"
// import Cloudinary from "./Cloudinary"
// import GaleriaVehiculosPage from "./Pages/GaleriaVehiculosPage"
// import AsignacionChoferePage from "./Pages/AsignacionChoferePage"
// import ContraseñaPage from "./Pages/ContraseñaPage"
// import PerfilDeUsuario from "./Pages/PerfilDeUsuario"
// import PrivilegioPage from "./Pages/PrivilegioPage"
// import BitacoraPage from "./Pages/BitacoraPage"
// import InformacionPage from "./Pages/InformacionPage"
// import CatalogoVehiculoPage from "./Pages/CatalogoVehiculoPage"
// import GestionInmueblePage from "./Pages/GestionInmueblePage"
// import RegistroInmueble from "./Pages/RegistroInmueble"

//------------PAGINA USUARIO-----------------//
import LoginPage from "./Pages/UsuarioPage/LoginPage";
import RegistroClientPage from "./Pages/UsuarioPage/RegistroClientPage";
import SeguroEmpresaPage from "./Pages/SeguroEmpresaPage";

//------------PAGINA SERVICIO-----------------//
import GestionInmueblePage from "./Pages/ServicioPage/GestionInmueblePage";
import CatalogoVehiculoPage from "./Pages/ServicioPage/CatalogoVehiculoPage";
//---------------------------------------------
import { Homed } from "./Components/Homed/Homed"
import UsuariosPage from "./Pages/UsuarioPage/UsuariosPage";



function App() {



  return (
    <AuthProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AuthProvider>
  )
}

function Main() {

  const { user } = useAuth();


  return (
    <>
       <CustomNavbar />
      <Routes>

        {/* ROUTES USUARIO */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="" element={<Home/>}/>
        <Route path="/register" element={<RegistroClientPage/>}/>
        <Route path="/seguroEmpresa" element={<SeguroEmpresaPage/>}/>
        <Route path="/gestionInmueble" element={<GestionInmueblePage/>}/>
        <Route path="/catalogoVehiculo" element={<CatalogoVehiculoPage/>}/>
     
      {/* 
        <Route path="/vehiculos" element={<VehiculosPage/>}/>
        <Route path="/aa" element={<Cloudinary/>}/>
        <Route path="/galeriaVehiculos" element={<GaleriaVehiculosPage/>}/>
        <Route path="/asignChoferes" element={<AsignacionChoferePage/>}/>
        <Route path="/perfilDeUsuario" element={<PerfilDeUsuario/>}/>
        <Route path="/privilegio" element={<PrivilegioPage/>}/>
        <Route path="/bitacora" element={<BitacoraPage/>}/>
        <Route path="/contraseña" element={<ContraseñaPage/>}/>
        <Route path="/informacion" element={<InformacionPage/>}/>
        <Route path="/gestionInmueble" element={<GestionInmueblePage/>}/>
        <Route path="/registroInmueble" element={<RegistroInmueble/>}/>
         <Route path="/registroInmueble" element={<RegistroInmueble/>}/>

        {/* <Route path="/catalogo" element={<CatalogoVehiculoPage/>}/> */}
        <Route path="/dasboard/*" element={<Homed/>}/>
        {/* <Route path="/tipoV" element={<TipoVehiculoPage/>}/> */}
        <Route path="/usuarios" element={<UsuariosPage/>}/>

      </Routes>
    </>
  )
}
export default App