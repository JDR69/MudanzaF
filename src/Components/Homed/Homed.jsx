import React, { useState } from "react";
import  {Sidebar} from "../Sidebar/SidebarPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import   {HomeDas}  from "../Home/Homedas";
import { useAuth } from "../../context/AuthContext";
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
          <Route path="*" element={<div>No encontrado</div>} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
