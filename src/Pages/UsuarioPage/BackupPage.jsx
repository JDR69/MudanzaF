import React,{useState,useEffect} from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import "./../../Css/BackupPage.css"; // puedes personalizarlo
import { useAuth } from '../../context/AuthContext';
import {downloadBackup,deleteBackup,generarBackup} from './../../api/auth'
const BackupPage = () => {

    const {backups:backupsContext}=useAuth();
    const [backups, setBackups]=useState(backupsContext|| [])


    useEffect(() => {
        setBackups(backupsContext);
      }, [backupsContext]);
      
    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-ES', {
            timeZone: 'UTC'
        });
    };

    const descargarArchivo =async (id) => {
        try{
            const response =await downloadBackup(id);
            const blob = await response.blob();

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `backup.sql`;
            link.click();
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error(" Error al descargar:", error);
        }
    };

    const borrar=async (id)=>{
        try{
            await deleteBackup(id);
            setBackups(prev => prev.filter(b => b.id !== id));
        }catch(error){
            console.error(" Error al eliminar:", error);
        }
    }
    const generarManual=async()=>{
        try{
            const newBackup=await generarBackup()
            setBackups(prev=>[newBackup,...prev])
        }catch(error){
            console.error(" Error al generar:", error);
        }
    }

    return (
        <div className="contenedoresPrincipales">
            <h2>Listado de Backups</h2>

            <button className="btn generar" onClick={()=>generarManual()}>
                Generar Backup Manual
            </button>
            <div className="table-responsive">
                <table className="bitacora-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Tamaño</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backups.map((b) => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.nombre}</td>
                                <td>{formatearFecha(b.fecha)}</td>
                                <td>{b.size}</td>
                                <td>{b.tipo}</td>
                                <td>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => descargarArchivo(b.id)}
                                    >
                                        <FaDownload /> Descargar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => borrar(b.id)}
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {backups.length === 0 && (
                            <tr>
                                <td colSpan="6">No hay backups disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BackupPage;
