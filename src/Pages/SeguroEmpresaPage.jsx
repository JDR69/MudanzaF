import React, { useState, useEffect } from 'react';
import '../Css/SeguroEmpresaPage.css';

// Datos de ejemplo para seguros
const segurosEjemplo = [
    {
        id: 1,
        descripcion: "Seguro de Mudanza Básico - Protege tus pertenencias durante el traslado con cobertura básica para daños y pérdidas.",
        imagen: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aW5nJTIwaW5zdXJhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        descripcion: "Seguro Premium - Cobertura completa que incluye protección contra daños, pérdidas, y retrasos en la entrega.",
        imagen: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW92aW5nJTIwaW5zdXJhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        descripcion: "Seguro Empresarial - Diseñado específicamente para mudanzas corporativas con cobertura extendida y beneficios adicionales.",
        imagen: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjBpbnN1cmFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    }
];

const SeguroEmpresaPage = () => {
    const [formData, setFormData] = useState({
        descripcion: '',
        imagen: null
    });
    const [seguros, setSeguros] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        obtenerSeguros();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            imagen: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí iría la lógica para enviar al backend
            console.log('Enviando datos:', formData);
            // Resetear el formulario
            setFormData({
                descripcion: '',
                imagen: null
            });
        } catch (error) {
            console.error('Error al enviar el seguro:', error);
        }
    };

    const obtenerSeguros = async () => {
        try {
            // Simulando una llamada a la API con los datos de ejemplo
            setSeguros(segurosEjemplo);
        } catch (error) {
            console.error('Error al obtener seguros:', error);
        }
    };

    const actualizarSeguro = async (id) => {
        try {
            const seguroActual = seguros.find(s => s.id === id);
            if (!seguroActual) return;

            // Aquí iría la lógica para actualizar el seguro en el backend
            const segurosActualizados = seguros.map(seguro => 
                seguro.id === id ? {
                    ...seguro,
                    descripcion: seguroActual.descripcion,
                    imagen: seguroActual.nuevaImagen || seguro.imagen // Usa la nueva imagen si existe
                } : seguro
            );
            
            setSeguros(segurosActualizados);
            setEditingId(null);
        } catch (error) {
            console.error('Error al actualizar el seguro:', error);
        }
    };

    const eliminarSeguro = async (id) => {
        try {
            // Aquí iría la lógica para eliminar en el backend
            const segurosActualizados = seguros.filter(seguro => seguro.id !== id);
            setSeguros(segurosActualizados);
        } catch (error) {
            console.error('Error al eliminar el seguro:', error);
        }
    };

    const handleEditImageChange = (e, seguroId) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const segurosActualizados = seguros.map(seguro =>
                seguro.id === seguroId ? {
                    ...seguro,
                    nuevaImagen: imageUrl // Guardamos temporalmente la nueva imagen
                } : seguro
            );
            setSeguros(segurosActualizados);
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
                        onChange={handleImageChange}
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
                {seguros.map(seguro => (
                    <div key={seguro.id} className="seguro-item">
                        {editingId === seguro.id ? (
                            <div className="seguro-edit">
                                <textarea
                                    value={seguro.descripcion}
                                    onChange={(e) => {
                                        const newSeguros = seguros.map(s =>
                                            s.id === seguro.id
                                                ? { ...s, descripcion: e.target.value }
                                                : s
                                        );
                                        setSeguros(newSeguros);
                                    }}
                                />
                                <div className="imagen-edit">
                                    <label htmlFor="imagen">Imagen actual:</label>
                                    <img 
                                        src={seguro.nuevaImagen || seguro.imagen} 
                                        alt="Vista previa" 
                                        className="seguro-imagen-preview"
                                    />
                                    <input
                                        type="file"
                                        id="imagen"
                                        accept="image/*"
                                        onChange={(e) => handleEditImageChange(e, seguro.id)}
                                    />
                                </div>
                                <div className="edit-buttons">
                                    <button 
                                        className="btn-save"
                                        onClick={() => actualizarSeguro(seguro.id)}
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button 
                                        className="btn-cancel"
                                        onClick={() => setEditingId(null)}
                                    >
                                        Cancelar
                                    </button>
                                    {/* <button 
                                        className="btn-delete"
                                        onClick={() => {
                                            if (window.confirm('¿Estás seguro de que deseas eliminar este seguro?')) {
                                                eliminarSeguro(seguro.id);
                                            }
                                        }}
                                    >
                                        Eliminar Seguro
                                    </button> */}
                                </div>
                            </div>
                        ) : (
                            <div className="seguro-content">
                                <p>{seguro.descripcion}</p>
                                <img src={seguro.imagen} alt="Seguro" className="seguro-imagen" />
                                <div className="content-buttons">
                                    <button 
                                        className="btn-edit"
                                        onClick={() => setEditingId(seguro.id)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn-delete"
                                        onClick={() => {
                                            if (window.confirm('¿Estás seguro de que deseas eliminar este seguro?')) {
                                                eliminarSeguro(seguro.id);
                                            }
                                        }}
                                    >
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