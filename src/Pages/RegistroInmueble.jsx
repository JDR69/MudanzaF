import React, { useState } from 'react';
import '../Css/RegistroInmueble.css';

function RegistroInmueble() {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [fragilidadCategoria, setFragilidadCategoria] = useState(false);

    const [productoNombre, setProductoNombre] = useState('');
    const [fragilidadProducto, setFragilidadProducto] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productos, setProductos] = useState([]); // Nuevo estado para productos

    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarProductos, setMostrarProductos] = useState(false);

    const registrarCategoria = () => {
        if (nuevaCategoria.trim() !== '') {
            setCategorias([...categorias, { nombre: nuevaCategoria, fragilidad: fragilidadCategoria }]);
            setNuevaCategoria('');
            setFragilidadCategoria(false);
        }
    };

    const registrarProducto = () => {
        if (productoNombre.trim() !== '' && categoriaSeleccionada !== '') {
            const nuevoProducto = {
                nombre: productoNombre,
                fragilidad: fragilidadProducto,
                categoria: categoriaSeleccionada
            };
            setProductos([...productos, nuevoProducto]); // Guardar en el array productos
            setProductoNombre('');
            setFragilidadProducto(false);
            setCategoriaSeleccionada('');
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
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="fragilidadCategoria"
                                checked={fragilidadCategoria}
                                onChange={(e) => setFragilidadCategoria(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="fragilidadCategoria">
                                Fragilidad
                            </label>
                        </div>
                    </div>
                </div>

                <div className="button-group">
                    <button className="btn btn-primary" onClick={registrarCategoria}>Registrar Categoría</button>
                    <button className="btn btn-secondary" onClick={() => setMostrarCategorias(!mostrarCategorias)}>Listar Categorías</button>
                </div>

                {mostrarCategorias && (
                    <div className="tableCategoriasContainer">
                        <table className="tableCategorias">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fragilidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((cat, index) => (
                                    <tr key={index}>
                                        <td>{cat.nombre}</td>
                                        <td>{cat.fragilidad ? 'Sí' : 'No'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className='RegistroInmuebleProductos'>
                <h2>Registrar Productos</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <input
                            className="form-control"
                            id="nombreProducto"
                            placeholder="Nombre del producto"
                            value={productoNombre}
                            onChange={(e) => setProductoNombre(e.target.value)}
                        />
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="fragilidadProducto"
                                checked={fragilidadProducto}
                                onChange={(e) => setFragilidadProducto(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="fragilidadProducto">
                                Fragilidad
                            </label>
                        </div>
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
                                    <th>Fragilidad</th>
                                    <th>Categoría</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.fragilidad ? 'Sí' : 'No'}</td>
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
