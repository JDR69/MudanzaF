import React, { useState, useEffect } from 'react';
import { insertarNuevoSeguro, actualizarSeguroBackend, eliminarSeguroBackend } from '../api/auth';
import Cloudinary from '../Cloudinary';
import { useAuth } from '../context/AuthContext';
import '../Css/SeguroEmpresaPage.css';

const SeguroEmpresaPage = () => {
    const [formData, setFormData] = useState({ descripcion: '' });
    const [seguros2, setSeguros2] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const { loading, message, image, handleFileChange, uploadImage } = Cloudinary();
    const { seguros } = useAuth(); // datos originales del backend

    // Copiar datos del backend al estado editable
    useEffect(() => {
        setSeguros2(seguros);
    }, [seguros]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = await uploadImage();
            const data = {
                descripcion: formData.descripcion,
                img: url
            };
            await insertarNuevoSeguro(data);
            alert("✅ Seguro registrado correctamente.");
            window.location.reload();
        } catch (error) {
            console.error('Error al enviar el seguro:', error);
        }
    };

    const actualizarSeguro = async (id) => {
        try {
            const seguroActual = seguros2.find(s => s.id === id);
            const url = await uploadImage();
            if(url){
                setSeguros2(seguros2.map(s => s.id === id ? { ...s, dir_Img: url, nuevaImagen: null } : s));
            }
            const data = {
                descripcion: seguroActual.descripcion,
                img: url || seguroActual.dir_Img
            };
            console.log(data);
            await actualizarSeguroBackend(data,id);
            
            const segurosActualizados = seguros2.map(seguro =>
                seguro.id === id
                    ? { ...seguro, dir_Img: url || seguroActual.dir_Img, nuevaImagen: null }
                    : seguro
            );

            setSeguros2(segurosActualizados);
            setEditingId(null);
            alert("✅ Seguro actualizado correctamente.");
        } catch (error) {
            console.error('Error al actualizar el seguro:', error);
        }
    };

    const eliminarSeguro = async (id) => {
        try {
            await eliminarSeguroBackend(id); // Elimina en el backend
            setSeguros2(seguros2.filter(s => s.id !== id)); // Elimina en el frontend
            alert("✅ Seguro eliminado correctamente.");
        } catch (error) {
            console.error('Error al eliminar el seguro:', error);
        }
    };


    return (
        <div className="seguro-empresa-container">
            <h2>Gestión de Seguros</h2>

            <form onSubmit={handleSubmit} className="seguro-form">
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción del Seguro:</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagen">Imagen del Seguro:</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    Guardar Seguro
                </button>
            </form>

            <div className="seguros-list">
                <h3>Seguros Registrados</h3>
                {seguros2.map(seguro => (
                    <div key={seguro.id} className="seguro-item">
                        {editingId === seguro.id ? (
                            <div className="seguro-edit">
                                <textarea
                                    value={seguro.descripcion}
                                    onChange={(e) => {
                                        const newSeguros = seguros2.map(s =>
                                            s.id === seguro.id
                                                ? { ...s, descripcion: e.target.value }
                                                : s
                                        );
                                        setSeguros2(newSeguros);
                                    }}
                                />
                                <div className="imagen-edit">
                                    <label>Imagen actual:</label>
                                    <img
                                        src={seguro.nuevaImagen || seguro.dir_Img}
                                        alt="Vista previa"
                                        className="seguro-imagen-preview"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e.target.files[0])}
                                    />
                                </div>
                                <div className="edit-buttons">
                                    <button className="btn-save" onClick={() => actualizarSeguro(seguro.id)}>
                                        Guardar Cambios
                                    </button>
                                    <button className="btn-cancel" onClick={() => setEditingId(null)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="seguro-content">
                                <p>{seguro.descripcion}</p>
                                <img src={seguro.dir_Img} alt="Seguro" className="seguro-imagen" />
                                <div className="content-buttons">
                                    <button className="btn-edit" onClick={() => setEditingId(seguro.id)}>
                                        Editar
                                    </button>
                                    <button className="btn-delete" onClick={() => {
                                        if (window.confirm('¿Estás seguro de que deseas eliminar este seguro?')) {
                                            eliminarSeguro(seguro.id);
                                        }
                                    }}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeguroEmpresaPage;
