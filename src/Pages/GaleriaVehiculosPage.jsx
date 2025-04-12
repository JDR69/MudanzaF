// src/pages/GaleriaVehiculosPage.jsx
import React, { useState } from 'react';
import Cloudinary from '../Cloudinary';
import '../Css/VehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function GaleriaVehiculosPage() {
    const { image, loading, message, handleFileChange, uploadImage } = Cloudinary();
    const [placa, setPlaca] = useState('');

    return (
        <div className='VehiculosConteiner'>
            <div className='VehiculosConteiner2'>
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

                <button className="btn btn-primary mt-2" onClick={uploadImage}>
                    Subir Imagen
                </button>

                {loading && <p>Cargando imagen...</p>}
                {message && <p>{message}</p>}
                {image && (
                    <div style={{ marginTop: '10px' }}>
                        <img src={image} alt="Vehículo" style={{ width: '200px' }} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default GaleriaVehiculosPage;
