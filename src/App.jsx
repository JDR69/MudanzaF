import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import CustomNavbar from "./Components/CustomNavbar"
import RegistroClientPage from "./Pages/RegistroClientPage"
import Home from "./Pages/Home"
import VehiculosPage from "./Pages/VehiculosPage"
import Cloudinary from "./Cloudinary"

function App() {

  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  )
}

function Main() {
  return(
    <>
      <CustomNavbar/>
      <Routes>
      <Route path="" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistroClientPage/>}/>
        <Route path="/vehiculos" element={<VehiculosPage/>}/>
        <Route path="/aa" element={<Cloudinary/>}/>
      </Routes>
    </>
  )
}
export default App