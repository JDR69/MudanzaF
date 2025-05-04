import React, { useState } from 'react';
import '../../Css/RegistroInmueble.css';
import { registrarCategoriaInmueble, obtenerCategoriasRequest } from '../../api/auth';


function RegistroInmueble() {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [descripcionCategoria, setDescripcionCategoria] = useState('');
    const [estadoCategoria, setestadoCategoria] = useState('');

    const [productoNombre, setProductoNombre] = useState('');
    const [estadoProducto, setestadoProducto] = useState('Disponible');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productos, setProductos] = useState([]);

    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarProductos, setMostrarProductos] = useState(false);

    const registrarCategoria = async () => {
        if (nuevaCategoria.trim() !== '') {
            const nueva = {
                nombre: nuevaCategoria,
                descripcion: descripcionCategoria,
                estado: estadoCategoria
            };
            try {
                await registrarCategoriaInmueble(nueva);
                setCategorias([...categorias, nueva]);
                setNuevaCategoria('');
                setDescripcionCategoria('');
                setestadoCategoria('no disponible');
                console.log(nueva);
            } catch (error) {
                console.log("Error al registrar categoría:", error);
            }
        }
    };

    const registrarProducto = async () => {
        if (productoNombre.trim() !== '' && categoriaSeleccionada !== '') {
            const nuevo = {
                nombre: productoNombre,
                estado: estadoProducto,
                categoria: categoriaSeleccionada
            };

            try {
                await registrarProductoRequest(nuevo);
                setProductos([...productos, nuevo]);
                setProductoNombre('');
                setestadoProducto('Disponible');
                setCategoriaSeleccionada('');
            } catch (error) {
                console.error("Error al registrar producto:", error);
            }
        }
    };

    const listarCategorias = async () => {
        try {
            const response = await obtenerCategoriasRequest();
            setCategorias(response.data);
            setMostrarCategorias(true);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    return (
        <div className='containerRegistroInmueble'>
            <h1>Registro Inmuebles</h1>

            <div className='RegistroInmuebleCategoria'>
                <h2>Registrar Categoría de Inmueble</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <input
                            className="form-control"
                            id="nombreCategoria"
                            placeholder="Nombre de la categoría"
                            value={nuevaCategoria}
                            onChange={(e) => setNuevaCategoria(e.target.value)}
                        />
                        <input
                            className="form-control"
                            id="descripcionCategoria"
                            placeholder="Descripción de la categoría"
                            value={descripcionCategoria}
                            onChange={(e) => setDescripcionCategoria(e.target.value)}
                        />
                        <select
                            className="form-select"
                            id="estadoCategoria"
                            value={estadoCategoria}
                            onChange={(e) => setestadoCategoria(e.target.value)}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </div>
                </div>

                <div className="button-group">
                    <button className="btn btn-primary" onClick={registrarCategoria}>Registrar Categoría</button>
                    <button className="btn btn-secondary" onClick={listarCategorias}>
                        Listar Categorías
                    </button>

                </div>

                {mostrarCategorias && (
                    <div className="tableCategoriasContainer">
                        <table className="tableCategorias">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((cat, index) => (
                                    <tr key={index}>
                                        <td>{cat.nombre}</td>
                                        <td>{cat.descripcion}</td>
                                        <td>{cat.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className='RegistroInmuebleProductos'>
                <h2>Registrar Items</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <input
                            className="form-control"
                            id="nombreProducto"
                            placeholder="Nombre del producto"
                            value={productoNombre}
                            onChange={(e) => setProductoNombre(e.target.value)}
                        />
                        <select
                            className="form-select"
                            id="estadoProducto"
                            value={estadoProducto}
                            onChange={(e) => setestadoProducto(e.target.value)}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </div>
                    <select
                        className="form-select"
                        id="categoriaProducto"
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    >
                        <option value="">Seleccione categoría</option>
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat.nombre}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="button-group">
                    <button className="btn btn-primary" onClick={registrarProducto}>Registrar Producto</button>
                    <button className="btn btn-secondary" onClick={() => setMostrarProductos(!mostrarProductos)}>Listar Productos</button>
                </div>

                {mostrarProductos && (
                    <div className="tableProductosContainer">
                        <table className="tableProductos">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>estado</th>
                                    <th>Categoría</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.estado}</td>
                                        <td>{prod.categoria}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegistroInmueble;
