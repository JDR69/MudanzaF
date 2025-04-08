import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import CustomNavbar from "./Components/CustomNavbar"
import RegistroClientPage from "./Pages/RegistroClientPage"
import Home from "./Pages/Home"

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
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/RegisterClient" element={<RegistroClientPage/>}/>
        <Route path="" element={<Home/>}/>
      </Routes>
    </>
  )
}
export default App