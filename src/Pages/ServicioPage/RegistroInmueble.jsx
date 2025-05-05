import React, { useState } from 'react';
import '../../Css/RegistroInmueble.css';
import { registrarCategoriaInmueble, 
    obtenerCategoriasRequest,
     registrarMaterial,
    obtenerMateriales,
    registarInmueble,
    obtenerInmuebles } from '../../api/auth';


function RegistroInmueble() {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [descripcionCategoria, setDescripcionCategoria] = useState('');
    const [estadoCategoria, setestadoCategoria] = useState('Disponible');

    const [productoNombre, setProductoNombre] = useState('');
    const [pesoProducto, setPesoProducto] = useState(0);
    const [materialSeleccionado, setMaterialSeleccionado] =useState('');
    const [estadoProducto, setestadoProducto] = useState('Disponible');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productos, setProductos] = useState([]);


    const [materiales, setMateriales] = useState([]);
    const [materialNombre, setMaterialNombre] = useState('');
    const [descripcionMaterial, setDescripcionMaterial] = useState('');
    const [precioMaterial, setPrecioMaterial] = useState(0);
    const [unidad_medida, setUnidadMedida] = useState('');
    const [estadoMaterial, setestadoMaterial] = useState('Disponible');
    const [stockMaterial, setStockMaterial] = useState(0);

    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarProductos, setMostrarProductos] = useState(false);
    const [mostrarMateriales, setMostrarMateriales] = useState(false);

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
                peso: parseInt(pesoProducto),
                material_id: parseInt(materialSeleccionado),
                estado: estadoProducto,
                categoria_id: parseInt(categoriaSeleccionada)
            };

            console.log(nuevo);

            try {
                await registarInmueble(nuevo);
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

    const registrarMaterialBackend = async () => {
        const nuevo = {
            nombre: materialNombre,
            estado: estadoMaterial,
            coste: parseInt(precioMaterial),
            unidad_medida: unidad_medida,
            stock: parseInt(stockMaterial),
            descripcion: descripcionMaterial
        };
        console.log(nuevo);
        try {
            await registrarMaterial(nuevo);
            setMateriales([...materiales, nuevo]);
            setMaterialNombre('');
            setestadoMaterial('Disponible');
            setPrecioMaterial('');
            setStockMaterial('');
            setUnidadMedida('');
            setDescripcionMaterial('');
        } catch (error) {
            console.error("Error al registrar material:", error);
        }
    };

    const listarMateriales = async () => {
        try {
            const response = await obtenerMateriales();
            setMateriales(response.data);
            console.log(response.data);
            setMostrarMateriales(true);
        } catch (error) {
            console.error("Error al obtener materiales:", error);
        }
    };

    const listarProductos = async () => {
        try {
            const response = await obtenerProductos();
            setProductos(response.data);
            console.log(response.data);
            setMostrarProductos(true);
        } catch (error) {
            console.error("Error al obtener productos:", error);
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
                        <label htmlFor="pesoProducto">Peso</label>
                        <input
                            className="form-control"
                            id="pesoProducto"
                            placeholder="Peso del producto"
                            value={pesoProducto}
                            onChange={(e) => setPesoProducto(e.target.value)}
                        />
                        <select
                            className="form-select"
                            id="materialProducto"
                            value={materialSeleccionado}
                            onChange={(e) => setMaterialSeleccionado(e.target.value)}
                        >
                            <option value="">Seleccionar material</option>
                            {materiales.map((material, index) => (
                                <option key={index} value={material.id}>
                                    {material.nombre}
                                </option>
                            ))}
                        </select>
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
                            <option key={index} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="button-group">
                    <button className="btn btn-primary" onClick={registrarProducto}>Registrar Producto</button>
                    <button className="btn btn-secondary" onClick={listarProductos}>Listar Productos</button>
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

            <div className='RegistroInmuebleProductos'>
                <h2>Registrar Materiales</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <input
                            className="form-control"
                            placeholder="Nombre del material"
                            value={materialNombre}
                            onChange={(e) => setMaterialNombre(e.target.value)}
                        />
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Descripción del material"
                            value={descripcionMaterial}
                            onChange={(e) => setDescripcionMaterial(e.target.value)} />
                        <label htmlFor="precioMaterial">Precio del material</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Precio del material"
                            value={precioMaterial}
                            onChange={(e) => setPrecioMaterial(e.target.value)} />
                        <label htmlFor="stockMaterial">Stock del material</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Stock del material"
                            value={stockMaterial}
                            onChange={(e) => setStockMaterial(e.target.value)} />
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Unidad de medida"
                            value={unidad_medida}
                            onChange={(e) => setUnidadMedida(e.target.value)} />
                        <select
                            className="form-select"
                            value={estadoMaterial}
                            onChange={(e) => setestadoMaterial(e.target.value)}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </div>
                </div>

                <div className="button-group">
                    <button className="btn btn-primary" onClick={registrarMaterialBackend}>Registrar Material</button>
                    <button className="btn btn-secondary" onClick={listarMateriales}>Listar Materiales</button>
                </div>

                {mostrarMateriales && (
                    <div className="tableProductosContainer">
                        <table className="tableProductos">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>estado</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materiales.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.estado}</td>
                                        <td>{prod.descripcion}</td>
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
