import React, { useState } from 'react';
import '../../Css/RegistroInmueble.css';
import {
    registrarCategoriaInmueble,
    registrarMaterial,
    registarInmueble
} from '../../api/auth';
import { useAuth } from '../../context/AuthContext';


function RegistroInmueble() {

    const {
        inmuebles,
        setInmuebles,
        categorias,
        setCategorias,
        materiales,
        setMateriales } = useAuth();

    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [descripcionCategoria, setDescripcionCategoria] = useState('');
    const [estadoCategoria, setestadoCategoria] = useState('Disponible');

    const [productoNombre, setProductoNombre] = useState('');
    const [pesoProducto, setPesoProducto] = useState(0);
    const [materialSeleccionado, setMaterialSeleccionado] = useState('');
    const [estadoProducto, setestadoProducto] = useState('Disponible');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productos, setProductos] = useState([]);


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

    const listarCategorias = async () => {
        setMostrarCategorias(true);
    };

    const listarMateriales = async () => {
        setMostrarMateriales(true);
    };

    const listarProductos = async () => {
        setMostrarProductos(true);
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

                <div className="contenedorButtons">
                    <button className="btn btn-primary" onClick={registrarCategoria}>Registrar Categoría</button>
                    <button className="btn btn-primary" onClick={listarCategorias}>
                        Listar Categorías
                    </button>

                </div>

                {mostrarCategorias && (
                    <div className="dimensionTable">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>estado</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((cat, index) => (
                                    <tr key={index}>
                                        <td>{cat.nombre}</td>
                                        <td>{cat.descripcion}</td>
                                        <td>{cat.estado}</td>
                                        <td>
                                            <button className="btn btn-primary" ><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" ><i className="bi bi-trash3-fill"></i></button>
                                        </td>
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
                            className="form-control"
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
                        id="estadoProducto"
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

                <div className="contenedorButtons">
                    <button className="btn btn-primary" onClick={registrarProducto}>Registrar Producto</button>
                    <button className="btn btn-primary" onClick={listarProductos}>Listar Productos</button>
                </div>

                {mostrarProductos && (
                    <div className="dimensionTable">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Peso</th>
                                    <th>estado</th>
                                    <th>Categoría</th>
                                    <th>Material</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inmuebles.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.estado === true ? "Disponible" : "No disponible"}</td>
                                        <td>{prod.peso}</td>
                                        <td>{prod.categoria.nombre}</td>
                                        <td>{prod.material.nombre}</td>
                                        <td>
                                            <button className="btn btn-primary" ><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" ><i className="bi bi-trash3-fill"></i></button>
                                        </td>
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

                <div className="contenedorButtons">
                    <button className="btn btn-primary" onClick={registrarMaterialBackend}>Registrar Material</button>
                    <button className="btn btn-primary" onClick={listarMateriales}>Listar Materiales</button>
                </div>

                {mostrarMateriales && (
                    <div className="dimensionTable">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>estado</th>
                                    <th>Descripción</th>
                                    <th>Coste</th>
                                    <th>Stock</th>
                                    <th>Unidad de medida</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materiales.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.estado}</td>
                                        <td>{prod.descripcion}</td>
                                        <td>{prod.coste}</td>
                                        <td>{prod.stock}</td>
                                        <td>{prod.unidad_medida}</td>
                                        <td>
                                            <button className="btn btn-primary" ><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" ><i className="bi bi-trash3-fill"></i></button>
                                        </td>
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
