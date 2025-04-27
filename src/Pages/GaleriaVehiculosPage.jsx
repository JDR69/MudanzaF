// src/pages/GaleriaVehiculosPage.jsx
import React, { useState } from 'react';
import Cloudinary from '../Cloudinary';
import '../Css/GaleriaVehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function GaleriaVehiculosPage() {
    const { loading, message, image, handleFileChange, uploadImage } = Cloudinary();
    const [placa, setPlaca] = useState('');
    const [imagenes, setImagenes] = useState([]); // ← Aquí guardaremos todas las imágenes

    const handleUpload = async () => {
        try {
            const url = await uploadImage(); // 🚀 ahora esperamos la URL
            if (url) {
                setImagenes((prev) => [...prev, url]); // la agregamos directamente
            }
        } catch (error) {
            console.error("Error al subir imagen:", error);
        }
    };


    const handleEnviarAlBackend = async () => {
        const data = {
            placa,
            imagenes
        };

        try {
            const res = await fetch('TU_BACKEND_URL/guardar-fotos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert('✅ Fotos enviadas correctamente.');
            } else {
                alert('❌ Error al enviar fotos.');
            }
        } catch (error) {
            console.error(error);
            alert('❌ Error en la comunicación con el backend.');
        }
    };

    const handleEliminarImagen = (index) => {
        setImagenes((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <div className='GaleriaConteiner'>
            <div className='GaleriaConteiner2'>
                <h1>Galería de Vehículos</h1>

                <div className="form-group">
                    <label htmlFor="Placa">Placa</label>
                    <input
                        type="text"
                        name="Placa"
                        className='form-control'
                        required
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Selecciona una imagen</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                </div>

                <button className="btn btn-primary mt-2" onClick={handleUpload}>
                    Subir Imagen
                </button>

                {loading && <p>Cargando imagen...</p>}

                {/* Tabla de imágenes subidas */}
                {imagenes.length > 0 && (
                    <div className="mt-4">
                        <h2>Imágenes Subidas</h2>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Imagen</th>
                                    <th>URL</th>
                                    <th>Acciones</th> {/* ← nueva columna para botones */}
                                </tr>
                            </thead>
                            <tbody>
                                {imagenes.map((img, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={img} alt={`Imagen ${index + 1}`} style={{ width: '100px' }} /></td>
                                        <td><a href={img} target="_blank" rel="noopener noreferrer">{img}</a></td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarImagen(index)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        <button className="btn btn-success" onClick={handleEnviarAlBackend}>
                            Enviar Imágenes al Backend
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GaleriaVehiculosPage;
