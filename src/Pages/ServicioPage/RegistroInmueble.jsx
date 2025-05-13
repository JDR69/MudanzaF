import React, { useState } from 'react';
import '../../Css/RegistroInmueble.css';
import {
    registrarCategoriaInmueble,
    actualizarCategoriaInmuebles,
    eliminarCategoriaInmuebles,

    registrarMaterial,
    actualizarMaterialRequest,
    eliminarMaterialRequest,

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
        setMateriales,
        categoriasActivos,
        setCategoriasActivos,
        materialesActivos,
        setMaterialesActivos } = useAuth();


    //-------DATOS PARA CATEGORIA------//

    const [nuevaCategoria, setNuevaCategoria] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        estado: ''
    });
    const [idCategoria, setIdCategoria] = useState(0);
    const [mostrarEditarCategoria, setMostrarEditarCategoria] = useState(false);
    const [mostrarEliminarCategoria, setMostrarEliminarCategoria] = useState(false);

    //-------DATOS PARA INMUBLES------//

    const [nuevoInmueble, setNuevoInmueble] = useState({
        id: '',
        nombre: '',
        categoria_id: '',
        categoria: { id: '', nombre: '' },
        material_id: '',
        material: { id: '', nombre: '' },
        peso: '',
        estado: ''
    });
    const [idInmueble, setIdInmueble] = useState(0);
    const [mostrarEditarInmueble, setMostrarEditarInmueble] = useState(false);
    const [mostrarEliminarInmueble, setMostrarEliminarInmueble] = useState(false);

    //-------DATOS PARA MATERIALES------//

    const [nuevoMaterial, setNuevoMaterial] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        coste: 0,
        unidad_medida: '',
        stock: 0,
        estado: ''
    });
    const [idMaterial, setIdMaterial] = useState(0);
    const [mostrarEditarMaterial, setMostrarEditarMaterial] = useState(false);
    const [mostrarEliminarMaterial, setMostrarEliminarMaterial] = useState(false);

    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarProductos, setMostrarProductos] = useState(false);
    const [mostrarMateriales, setMostrarMateriales] = useState(false);


    //CRUD DE CATEGORIAS

    const registrarCategoria = async () => {
        if (nuevaCategoria.nombre.trim() !== '') {
            const nueva = {
                nombre: nuevaCategoria.nombre,
                descripcion: nuevaCategoria.descripcion,
                estado: nuevaCategoria.estado
            };
            try {
                await registrarCategoriaInmueble(nueva);
                setCategorias([...categorias, nueva]);
                setNuevaCategoria({
                    id: '',
                    nombre: '',
                    descripcion: '',
                    estado: ''
                })
            } catch (error) {
                alert("Error al registrar categoría");
            }
        }
    };

    const listarCategorias = async () => {
        setMostrarCategorias(true);
    };

    const EditarCategoria = (id) => {
        const categoria = categorias.find((cat) => cat.id === id);
        console.log(categoria);
        setNuevaCategoria(categoria);
        setMostrarEditarCategoria(true);
    }

    const ActualizarCategoria = async () => {
        try {

            const data = {
                nombre: nuevaCategoria.nombre,
                descripcion: nuevaCategoria.descripcion,
                estado: nuevaCategoria.estado
            }

            const res = await actualizarCategoriaInmuebles(data, nuevaCategoria.id);
            setCategorias(categorias.map((cat) => cat.id === nuevaCategoria.id ? nuevaCategoria : cat));
            setMostrarEditarCategoria(false);

        } catch (error) {
            alert("Error al actualizar categoría");
        }
    }


    const EliminarCategoria = (id) => {
        setIdCategoria(id);
        setMostrarEliminarCategoria(true);
    }

    const EliminarCategoriaBackend = async () => {
        try {
            const res = await eliminarCategoriaInmuebles(idCategoria);
            console.log(res.data);
            setCategoriasActivos(categoriasActivos.filter((cat) => cat.id !== idCategoria));
            setCategorias(categorias.filter((cat) => cat.id !== idCategoria));
            setMostrarEliminarCategoria(false);
        } catch (error) {
            alert("Error al eliminar categoría");
        }
    }


    //CRUD DE MATERIALES


    const registrarMaterialBackend = async () => {
        const nuevo = {
            nombre: nuevoMaterial.nombre,
            estado: nuevoMaterial.estado,
            coste: parseInt(nuevoMaterial.coste),
            unidad_medida: nuevoMaterial.unidad_medida,
            stock: parseInt(nuevoMaterial.stock),
            descripcion: nuevoMaterial.descripcion
        };
        console.log(nuevo);
        try {
            await registrarMaterial(nuevo);
            setMateriales([...materiales, nuevo]);
            setNuevoMaterial({
                id: '',
                nombre: '',
                descripcion: '',
                coste: 0,
                unidad_medida: '',
                stock: 0,
                estado: ''
            });
        } catch (error) {
            console.error("Error al registrar material:", error);
        }
    };

    const listarMateriales = async () => {
        setMostrarMateriales(true);
    };

    const EditarMaterial = (material) => {
        console.log(material);
        setNuevoMaterial(material);
        setMostrarEditarMaterial(true);
    }

    const ActualizarMaterial = async () => {

        try {

            const data = {
                nombre: nuevoMaterial.nombre,
                estado: nuevoMaterial.estado,
                coste: parseInt(nuevoMaterial.coste),
                unidad_medida: nuevoMaterial.unidad_medida,
                stock: parseInt(nuevoMaterial.stock),
                descripcion: nuevoMaterial.descripcion
            }

            const res = await actualizarMaterialRequest(data, nuevoMaterial.id);
            console.log(res.data);
            setMateriales(materiales.map((mat) => mat.id === nuevoMaterial.id ? nuevoMaterial : mat));
            setMostrarEditarMaterial(false);

        } catch (error) {
            alert("Error al actualizar material");
        } finally {
            setNuevoMaterial({
                id: '',
                nombre: '',
                descripcion: '',
                coste: 0,
                unidad_medida: '',
                stock: 0,
                estado: ''
            });
        }
    }

    const EliminarMaterial = (id) => {
        setIdMaterial(id);
        setMostrarEliminarMaterial(true);
    }

    const EliminarMaterialBackend = async () => {

        try {

            const res = await eliminarMaterialRequest(idMaterial);
            console.log(res.data);
            setMaterialesActivos(materialesActivos.filter((mat) => mat.id !== idMaterial));
            setMateriales(materiales.filter((mat) => mat.id !== idMaterial));
            setMostrarEliminarMaterial(false);

        } catch (error) {
            alert("Error al eliminar material");
        }
    }


    //CRUD DE INMUEBLES

    const registrarProducto = async () => {
        if (productoNombre.trim() !== '' && categoriaSeleccionada !== '') {

            const nuevo = {
                nombre: nuevoInmueble.nombre,
                peso: parseInt(nuevoInmueble.peso),
                material_id: parseInt(nuevoInmueble.material_id),
                estado: nuevoInmueble.estado,
                categoria_id: parseInt(nuevoInmueble.categoria_id)
            };

            console.log(nuevo);

            try {
                await registarInmueble(nuevo);
                setInmuebles([...inmuebles, nuevo]);
                setNuevoInmueble({
                    id: '',
                    nombre: '',
                    categoria_id: '',
                    categoria: { id: '', nombre: '' },
                    material_id: '',
                    material: { id: '', nombre: '' },
                    peso: '',
                    estado: ''
                });
            } catch (error) {
                console.error("Error al registrar producto:", error);
            }
        }
    };

    const listarProductos = async () => {

        setMostrarProductos(true);
    };

    const EditarInmueble = (inmueble) => {
        console.log(inmueble);
        setNuevoInmueble(inmueble);
        setMostrarEditarInmueble(true);
    }

    const ActualizarInmueble = () => {
        console.log(nuevoInmueble);
        setInmuebles(inmuebles.map((inm) => inm.id === nuevoInmueble.id ? nuevoInmueble : inm));
        setMostrarEditarInmueble(false);
    }

    const EliminarInmueble = (id) => {
        setIdInmueble(id);
        setMostrarEliminarInmueble(true);
    }

    const EliminarInmuebleBackend = () => {
        console.log(idInmueble);
        setInmuebles(inmuebles.filter((inm) => inm.id !== idInmueble));
        setMostrarEliminarInmueble(false);
    }


    function mostrarSeccion(clase) {
        const clases = ['mostrar', 'mostrar2', 'mostrar3'];
        clases.forEach(c => {
            const elementos = document.getElementsByClassName(c);
            for (let i = 0; i < elementos.length; i++) {
                elementos[i].classList.remove('active-section');
            }
        });

        const secciones = document.getElementsByClassName(clase);
        for (let i = 0; i < secciones.length; i++) {
            secciones[i].classList.add('active-section');
        }
    }

    window.onload = function () {
        mostrarSeccion('mostrar');
    };

    return (
        <div className='containerRegistroInmueble'>
            <h1>Registro Inmuebles</h1>
            <div className='contenedorHijoFila'>
                <button onClick={() => mostrarSeccion('mostrar')} className='btn btn-primary'>Inmueble Categoría</button>
                <button onClick={() => mostrarSeccion('mostrar2')} className='btn btn-primary'>Materiales</button>
                <button onClick={() => mostrarSeccion('mostrar3')} className='btn btn-primary'>Items</button>
            </div>
            {/* INFORMACION COMPLETA DE CATEGORIA INMUEBLE*/}

            <div className='RegistroInmuebleCategoria mostrar'>
                <h2>Registrar Categoría de Inmueble</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <input
                            className="form-control"
                            id="nombreCategoria"
                            placeholder="Nombre de la categoría"
                            value={nuevaCategoria.nombre}
                            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                        />
                        <input
                            className="form-control"
                            id="descripcionCategoria"
                            placeholder="Descripción de la categoría"
                            value={nuevaCategoria.descripcion}
                            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                        />
                        <select
                            className="form-control"
                            id="estadoCategoria"
                            value={nuevaCategoria.estado}
                            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, estado: e.target.value })}
                        >
                            <option value="">Seleccione estado</option>
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

                {/* AQUI SE LISTA LA INFORMACION DE CATEGORIA */}

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
                                            <button className="btn btn-primary" type="button" onClick={() => EditarCategoria(cat.id)}><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" type="button" onClick={() => EliminarCategoria(cat.id)}><i className="bi bi-trash3-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* AQUI SE EDITA LA INFORMACION DE CATEGORIA */}

                {mostrarEditarCategoria && (
                    <div className="form-gris">
                        <div className='form-flotante'>
                            <label className='label-perfil'>Nombre de la categoría</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevaCategoria.nombre}
                                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                            />
                            <label className='label-perfil'>Descripción de la categoría</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevaCategoria.descripcion}
                                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                            />
                            <label className='label-perfil'>Estado de la categoría</label>
                            <select
                                className="form-control"
                                value={nuevaCategoria.estado === 'disponible' ? 'disponible' : 'no disponible'}
                                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, estado: e.target.value })}
                            >
                                <option value="disponible">Disponible</option>
                                <option value="no disponible">No disponible</option>
                            </select>
                            <div className="contenedorButtons">
                                <button className="btn btn-primary" type="button" onClick={ActualizarCategoria}>Actualizar</button>
                                <button className="btn btn-danger" type="button" onClick={() => setMostrarEditarCategoria(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* AQUI SE ELIMINA LA INFORMACION DE CATEGORIA */}

                {mostrarEliminarCategoria && (
                    <div className="form-gris">
                        <div className='form-flotante'>
                            <label className='label-perfil'>¿Estas seguro de eliminar la categoría?</label>
                            <div className="contenedorButtons">
                                <button className="btn btn-primary" type="button" onClick={() => EliminarCategoriaBackend()}>Eliminar</button>
                                <button className="btn btn-danger" type="button" onClick={() => setMostrarEliminarCategoria(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* INFORMACION COMPLETA DE INMUEBLE */}

            <div className='RegistroInmuebleProductos mostrar2'>
                <h2>Registrar Items</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <input
                            className="form-control"
                            id="nombreProducto"
                            placeholder="Nombre del producto"
                            value={nuevoInmueble.nombre}
                            onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, nombre: e.target.value })}
                        />
                        <label htmlFor="pesoProducto">Peso</label>
                        <input
                            className="form-control"
                            id="pesoProducto"
                            placeholder="Peso del producto"
                            value={nuevoInmueble.peso}
                            onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, peso: e.target.value })}
                        />
                        <select
                            className="form-control"
                            value={nuevoInmueble.material_id}
                            onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, material_id: e.target.value })}
                        >
                            <option value="">Seleccionar material</option>
                            {materialesActivos.map((material, index) => (
                                <option key={index} value={material.id}>
                                    {material.nombre}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-control"
                            id="estadoProducto"
                            value={nuevoInmueble.estado}
                            onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, estado: e.target.value })}
                        >
                            <option value="">Seleccione estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                        <select
                            className="form-control"
                            id="estadoProducto"
                            value={nuevoInmueble.categoria_id}
                            onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, categoria_id: e.target.value })}
                        >
                            <option value="">Seleccione categoría</option>
                            {categoriasActivos.map((cat, index) => (
                                <option key={index} value={cat.id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
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
                                        <td>{prod.categoria?.nombre}</td>
                                        <td>{prod.material?.nombre}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => EditarInmueble(prod)}><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" onClick={() => EliminarInmueble(prod.id)}><i className="bi bi-trash3-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {
                    mostrarEditarInmueble && (
                        <div className="form-gris">
                            <div className='form-flotante'>
                                <label className='label-perfil'>Nombre del Inmuebles</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Inmuebles"
                                    value={nuevoInmueble.nombre}
                                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, nombre: e.target.value })}
                                />
                                <label className='label-perfil'>Peso del Inmuebles</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Peso del Inmuebles"
                                    value={nuevoInmueble.peso}
                                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, peso: e.target.value })}
                                />
                                <label className='label-perfil'>Estado del Inmuebles</label>
                                <select
                                    className="form-control"
                                    value={nuevoInmueble.estado === true ? "Disponible" : "No disponible"}
                                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, estado: e.target.value })}
                                >
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
                                <label className='label-perfil'>Categoria del Inmuebles</label>
                                <select
                                    className="form-control"
                                    value={nuevoInmueble.categoria_id}
                                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, categoria_id: e.target.value })}
                                >
                                    <option value="">Seleccione categoria</option>
                                    {categorias.map((cat, index) => (
                                        <option key={index} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                                <label className='label-perfil'>Material del Inmuebles</label>
                                <select
                                    className="form-control"
                                    value={nuevoInmueble.material_id}
                                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, material_id: e.target.value })}
                                >
                                    <option value="">Seleccione material</option>
                                    {materiales.map((mat, index) => (
                                        <option key={index} value={mat.id}>
                                            {mat.nombre}
                                        </option>
                                    ))}
                                </select>
                                <div className="contenedorButtons">
                                    <button className="btn btn-primary" onClick={ActualizarInmueble}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => setMostrarEditarInmueble(false)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>

            {/* AQUI TODA LA INFORMACION DE MATERIALES */}

            <div className='RegistroInmuebleProductos mostrar3'>
                <h2>Registrar Materiales</h2>
                <div className="form-row">
                    <div className="input-check-group">
                        <label className="label-perfil">Nombre del material</label>
                        <input
                            className="form-control"
                            placeholder="Nombre del material"
                            value={nuevoMaterial.nombre}
                            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })}
                        />
                        <label className="label-perfil">Descripción del material</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Descripción del material"
                            value={nuevoMaterial.descripcion}
                            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, descripcion: e.target.value })} />
                        <label className="label-perfil">Precio del material</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Precio del material"
                            value={nuevoMaterial.coste}
                            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, coste: e.target.value })} />
                        <label className="label-perfil">Stock del material</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Stock del material"
                            value={nuevoMaterial.stock}
                            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, stock: e.target.value })} />
                        <label className="label-perfil">Unidad de medida</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Unidad de medida"
                            value={nuevoMaterial.unidad_medida}
                            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, unidad_medida: e.target.value })} />
                        <label className="label-perfil">Estado del material</label>
                        <select
                            className="form-control"
                            value={nuevoMaterial.estado}
                            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, estado: e.target.value })}
                        >
                            <option value="">Seleccione estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </div>
                </div>

                <div className="contenedorButtons">
                    <button className="btn btn-primary" onClick={registrarMaterialBackend}>Registrar Material</button>
                    <button className="btn btn-primary" onClick={listarMateriales}>Listar Materiales</button>
                </div>

                {/* AQUI LA LISTA COMPLETO DE MATERIALES */}

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
                                            <button className="btn btn-primary" type='button' onClick={() => EditarMaterial(prod)}><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" type='button' onClick={() => EliminarMaterial(prod.id)}><i className="bi bi-trash3-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* AQUI SE EDITA LA INFORMACION DE MATERIALES */}

            {
                mostrarEditarMaterial && (
                    <div className="form-gris">
                        <div className='form-flotante'>
                            <label className='label-perfil'>Nombre del material</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevoMaterial.nombre}
                                onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })}
                            />
                            <label className='label-perfil'>Descripción del material</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevoMaterial.descripcion}
                                onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, descripcion: e.target.value })}
                            />
                            <label className='label-perfil'>Coste del material</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevoMaterial.coste}
                                onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, coste: e.target.value })}
                            />
                            <label className='label-perfil'>Stock del material</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevoMaterial.stock}
                                onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, stock: e.target.value })}
                            />
                            <label className='label-perfil'>Unidad de medida</label>
                            <input
                                type="text"
                                className="input-perfil"
                                value={nuevoMaterial.unidad_medida}
                                onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, unidad_medida: e.target.value })}
                            />
                            <label className='label-perfil'>Estado del material</label>
                            <select
                                className="form-control"
                                value={nuevoMaterial.estado === 'DISPONIBLE' ? 'DISPONIBLE' : 'NO DISPONIBLE'}
                                onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, estado: e.target.value })}
                            >
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="NO DISPONIBLE">NO DISPONIBLE</option>
                            </select>
                            <div className="contenedorButtons">
                                <button className="btn btn-primary" onClick={ActualizarMaterial}>Actualizar</button>
                                <button className="btn btn-danger" onClick={() => setMostrarEditarMaterial(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* AQUI SE ELIMINA LA INFORMACION DE MATERIALES */}

            {
                mostrarEliminarMaterial && (
                    <div className="form-gris">
                        <div className='form-flotante'>
                            <h2>Eliminar Material</h2>
                            <p>¿Estas seguro de eliminar el material?</p>
                            <div className="contenedorButtons">
                                <button className="btn btn-primary" type="button" onClick={EliminarMaterialBackend}>Eliminar</button>
                                <button className="btn btn-danger" type="button" onClick={() => setMostrarEliminarMaterial(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
    );
}

export default RegistroInmueble;
