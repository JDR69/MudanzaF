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

      </Routes>
    </>
  )
}
export default App