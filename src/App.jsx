import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import CustomNavbar from "./Components/CustomNavbar"
import RegistroClientPage from "./Pages/RegistroClientPage"
import Home from "./Pages/Home"
import {  AuthProvider, useAuth } from "./context/AuthContext"
import VehiculosPage from "./Pages/VehiculosPage"
import Cloudinary from "./Cloudinary"
import GaleriaVehiculosPage from "./Pages/GaleriaVehiculosPage"
import AsignacionChoferePage from "./Pages/AsignacionChoferePage"
import ContraseñaPage from "./Pages/ContraseñaPage"
import PerfilDeUsuario from "./Pages/PerfilDeUsuario"
import PrivilegioPage from "./Pages/PrivilegioPage"
import BitacoraPage from "./Pages/BitacoraPage"
import InformacionPage from "./Pages/InformacionPage"
import CatalogoVehiculoPage from "./Pages/CatalogoVehiculoPage"
import GestionInmueblePage from "./Pages/GestionInmueblePage"
import RegistroInmueble from "./Pages/RegistroInmueble"


//---------------------------------------------
import { Homed } from "./Components/Homed/Homed"



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
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistroClientPage/>}/>
        <Route path="" element={<Home/>}/>
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


        <Route path="/catalogo" element={<CatalogoVehiculoPage/>}/>
        <Route path="/dasboard/*" element={<Homed/>}/>
      </Routes>
    </>
  )
}
export default App