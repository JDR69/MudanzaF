// src/pages/GaleriaVehiculosPage.jsx
import React, { useState } from 'react';
import Cloudinary from '../../Cloudinary';
import '../../Css/GaleriaVehiculosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { registrarGaleriaVehiculos } from '../../api/auth';

function GaleriaVehiculosPage() {
    const { loading, message, image, handleFileChange, uploadImage } = Cloudinary();
    const { vehiculos, catalogoVehiculos } = useAuth();
    const [imagenes, setImagenes] = useState([]);
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [imagenNueva, setImagenNueva] = useState([]);


    const imagenBackend = 1;
    const imagenActualizada = 2;

    const handleUpload = async (tipoImg) => {
        try {
            const url = await uploadImage();
            if (tipoImg === imagenBackend) {
                setImagenes((prev) => [...prev, url]);
            } else {
                setImagenNueva((prev) => [...prev, url]);
            }
        } catch (error) {
            console.error("Error al subir imagen:", error);
        }
    };

    const handlePlacaChange = (e) => {
        const placaIngresada = e.target.value;
        setBusqueda(placaIngresada);

        const encontrado = vehiculos.find((v) =>
            v.placa.toLowerCase().trim() === placaIngresada.toLowerCase().trim()
        );
        setVehiculoSeleccionado(encontrado || null);
    };

    const filtrados = vehiculos.filter(
        (v) =>
            v.placa.toLowerCase().includes(busqueda.toLowerCase()) ||
            v.modelo.toString().toLowerCase().includes(busqueda.toLowerCase())
    );

    const agregarVehiculo = (vehiculo) => {

        const encontrado = catalogoVehiculos.find((v) =>
            v.id === vehiculo.id
        );
        if (encontrado && encontrado.img.length > 0) {
            setVehiculoSeleccionado(encontrado);
            setBusqueda('');
        } else {

            setVehiculoSeleccionado(vehiculo);
            setBusqueda('');

        }
    };

    const handleActualizarImagen = async () => {
        const data = {
            imagenes: imagenNueva
        };

        try {
            const res = await registrarGaleriaVehiculos(data, vehiculoSeleccionado.id);
            console.log(res)
            alert("✅ Vehiculo registrado correctamente.");
            setImagenes([]);
            setVehiculoSeleccionado(null);
            setBusqueda('');
        } catch (error) {
            console.error(error);
            alert('❌ Error al registrar el vehiculo.');
        }
    };

    const handleEnviarAlBackend = async () => {
        const data = {
            imagenes: imagenes
        };

        try {
            const res = await registrarGaleriaVehiculos(data, vehiculoSeleccionado.id);
            console.log(res)
            alert("✅ Vehiculo registrado correctamente.");
            setImagenes([]);
            setVehiculoSeleccionado(null);
            setBusqueda('');
        } catch (error) {
            console.error(error);
            alert('❌ Error al registrar el vehiculo.');
        }
    };

    const handleEliminarImagen = (index) => {
        setImagenes((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEliminarImagenNueva = (index) => {
        setImagenNueva((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEliminarImagenBackend = async (indice, id) => {
        try {
            // const res = await eliminarGaleriaVehiculos(id);
            // console.log(res)
            // alert("✅ Vehiculo eliminado correctamente.");
            console.log(indice)
            console.log(id)
            console.log(vehiculoSeleccionado)
            setVehiculoSeleccionado((prev) => ({
                ...prev,
                img: prev.img.filter((_, i) => i !== indice),
              }));
        } catch (error) {
            console.error(error);
            alert('❌ Error al eliminar el vehiculo.');
        }
    };

    return (
        <div className='GaleriaConteiner'>
            <div className='GaleriaConteiner2'>
                <h1>Galería de Vehículos</h1>

                <div className='GaleriaConteiner3'>

                    <div className="form-group">
                        <label htmlFor="Placa">Placa</label>
                        <input
                            type="text"
                            name="busqueda"
                            className='form-control'
                            required
                            value={busqueda}
                            onChange={handlePlacaChange}
                            placeholder="Ingrese la placa"
                        />
                    </div>
                    {busqueda && filtrados.length > 0 && (
                        <div className="sugerencias-lista2">
                            {filtrados.map((v) => (
                                <div key={v.id} className="sugerencia2" onClick={() => agregarVehiculo(v)}>
                                    {v.placa} - {v.modelo}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {vehiculoSeleccionado?.img?.length > 0 ? (
                    <div className="mt-3">
                        <p><strong>Nombre:</strong> {vehiculoSeleccionado.nombre}</p>
                        <p><strong>Tipo:</strong> {vehiculoSeleccionado.tipo}</p>
                    </div>
                ): (
                    <div className="mt-3">
                        <p><strong>Placa:</strong> {vehiculoSeleccionado?.placa}</p>
                        <p><strong>Motor:</strong> {vehiculoSeleccionado?.motor}</p>
                        <p><strong>Modelo:</strong> {vehiculoSeleccionado?.modelo}</p>
                        {/* <p><strong>Tipo:</strong> {vehiculoSeleccionado?.tipo}</p> */}
                    </div>
                )}


                {vehiculoSeleccionado?.img?.length > 0 ? (
                    <div className="conteinerImagenVehiculo">
                        <div className='actualizarImagen'>
                            <label > Seleccion una nueva imagen</label>
                            <input
                                type="file"
                                name="file"
                                className="form-control"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                            />
                            <button className="btn btn-primary mt-2" onClick={() => handleUpload(imagenActualizada)}>
                                Subir Imagen
                            </button>
                        </div>
                        <div className='tablaImagenes'>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Imagen</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vehiculoSeleccionado?.img.map((img, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{img.id}</td>
                                                    <td><img src={img.dir_imagen} style={{ width: '100px' }} alt="" /></td>
                                                    <td>
                                                        <button id='Eliminar' onClick={() => handleEliminarImagenBackend(index, img.id)}>
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        imagenNueva.map((img, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><img src={img} style={{ width: '100px' }} alt="" /></td>
                                                    <td>
                                                        <button id='Eliminar' onClick={() => handleEliminarImagenNueva(index)}>
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <button className="btn btn-primary  mt-2" onClick={handleActualizarImagen}>Guardar Actualización</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="form-group mt-4">
                            <label>Selecciona una imagen</label>
                            <input
                                type="file"
                                name="file"
                                className="form-control"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                            />
                        </div>

                        <button className="btn btn-primary mt-2" onClick={() => handleUpload(imagenBackend)}>
                            Subir Imagen
                        </button>

                        {loading && <p>Cargando imagen...</p>}

                        {imagenes.length > 0 && (
                            <div className="mt-4">
                                <h2>Imágenes Subidas</h2>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Imagen</th>
                                            <th>URL</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {imagenes.map((img, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={img} alt={`Imagen ${index + 1}`} style={{ width: '100px' }} /></td>
                                                <td><a href={img} target="_blank" rel="noopener noreferrer">{img}</a></td>
                                                <td>
                                                    <button id='Eliminar' onClick={() => handleEliminarImagen(index)}>
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
                )}
            </div>
        </div>
    );
}

export default GaleriaVehiculosPage;
