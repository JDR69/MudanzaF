import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import CustomNavbar from "./Components/CustomNavbar"
import RegistroClientPage from "./Pages/RegistroClientPage"
import Home from "./Pages/Home"
import {  AuthProvider, useAuth } from "./context/AuthContext"

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistroClientPage />} />
        <Route path="" element={<Home />} />
      </Routes>
    </>
  )
}
export default App