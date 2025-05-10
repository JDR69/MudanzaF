import React, { useState } from 'react';
import '../../Css/AsignacionChoferePage.css';
import Cloudinary from '../../Cloudinary';
import { registerChofer, concederVehiculo, eliminarConcecido, actualizarDatosDelChofer } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const AsignacionChoferePage = () => {
  const { image, handleFileChange, uploadImage } = Cloudinary();
  const { vehiculos, choferes, cargarChoferes } = useAuth(); // viene del contexto
  const [editar, setEditar] = useState(true);
  const [nuevoVehiculos, setNuevoVehiculos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [busqueda2, setBusqueda2] = useState('');
  const [listarChoferes, setListarChoferes] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    carnet: '',
    direccion: '',
    telefono: '',
    estado: 'Disponible',
    url: ''
  });

  const [nuevoChofer, setNuevoChofer] = useState({
    id: '',
    nombre: '',
    email: '',
    carnet: '',
    direccion: '',
    telefono: '',
    estado: '',
    url: ''
  });


  //----------------MOSTRAR ACCION DE CHOFERE DE LA LISTA----//

  const [mostrarImagenChofer, setMostrarImagenChofer] = useState(false);
  const [imagenChofer, setImagenChofer] = useState('');
  const [vehiculosDelChofer, setVehiculosDelChofer] = useState([]);
  const [mostrarVehiculosDelChofer, setMostrarVehiculosDelChofer] = useState(false);
  const [NuevosVehiculosConcedidos, setNuevosVehiculosConcedidos] = useState([]);

  const agregarVehiculo = (vehiculo) => {

    if (editar) {
      const existe = nuevoVehiculos.find(v => v.id === vehiculo.id);
      if (existe) {
        alert("⚠️ El vehículo ya está asignado.");
        return;
      }
      setNuevoVehiculos([...nuevoVehiculos, vehiculo]);
    } else {
      const existe2 = NuevosVehiculosConcedidos.find(v => v.id === vehiculo.id);
      if (existe2) {
        alert("⚠️ El vehículo ya está asignado.");
        return;
      }
      if (NuevosVehiculosConcedidos.length === 1) {
        alert("⚠️ Solo se puede asignar un vehículo.");
        setBusqueda('');
        return;
      }
      setNuevosVehiculosConcedidos([...NuevosVehiculosConcedidos, vehiculo]);
    }
    setBusqueda('');
  };

  const quitarVehiculo = (id) => {
    setNuevoVehiculos(nuevoVehiculos.filter(v => v.id !== id));
  };

  const filtrados = vehiculos.filter(
    (v) =>
      v.placa.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo.toString().includes(busqueda)
  );

  const agregarChofer = (chofer) => {
    setNuevoChofer(chofer);
    setBusqueda2('');
  }

  const filtrarChofer = choferes.filter(
    (c) =>
      c.chofer?.ci.toLowerCase().includes(busqueda2.toLowerCase())
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await uploadImage();
      if (url) {
        formData.url = url;
      }
    } catch (error) {
      alert("Error al subir imagen");
      return;
    }

    try {
      const data = {
        dirrecion: formData.direccion,
        estado: formData.estado,
        ci: formData.carnet,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password,
        url_profile: formData.url || null,
        vehiculos: nuevoVehiculos.map(v => v.id), // enviar ids de vehículos asignados
      };

      console.log(data);

      const res = await registerChofer(data);
      console.log(res.data)
      alert("✅ Chofer registrado correctamente");

      setFormData({
        nombre: '',
        email: '',
        password: '',
        carnet: '',
        direccion: '',
        estado: 'Disponible',
        telefono: '',
      });
      setNuevoVehiculos([]);
    } catch (error) {
      console.error("❌ Error al registrar chofer:", error.response.data.error);
      alert(error.response.data.error);
    }
  };

  const handleCambioAgregar = () => {
    setEditar(true);
    setListarChoferes(false);
  }

  const handleCambioListar = () => {
    // window.location.reload();
    setEditar(true);
    setListarChoferes(true);
  }

  const handleCambioActualizar = () => {
    setEditar(false);
    setListarChoferes(false);
  }

  const handleMostarImagen = (img) => {
    if (img === null) {
      alert("⚠️ No se encontro la imagen");
      return;
    }
    setMostrarImagenChofer(true);
    setImagenChofer(img);
  }

  const handleMostarVehiculosDelChofer = (vehiculos) => {
    if (vehiculos === null || vehiculos.length === 0) {
      alert("⚠️ No se encontro ningun vehiculo");
      return;
    }
    setMostrarVehiculosDelChofer(true);
    setVehiculosDelChofer(vehiculos);
  }

  const quitarVehiculoNuevo = (id) => {
    setNuevosVehiculosConcedidos(NuevosVehiculosConcedidos.filter(v => v.id !== id));
    setBusqueda('');
  }

  const concederVehiculoBackend = async () => {
    try {

      const data = {
        id_vehiculo: NuevosVehiculosConcedidos[0]?.id
      }

      console.log(data, nuevoChofer.id);

      const res = await concederVehiculo(data, nuevoChofer.id);
      console.log(res.data)
      alert("✅ Vehiculo concedido correctamente");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  const eliminarVehiculoConcedido = async (id) => {
    try {
      const data = {
        id_vehiculo: id
      }
      console.log(data, nuevoChofer.id);
      const res = await eliminarConcecido(data, nuevoChofer.id);
      alert("✅ Vehiculo desasignado correctamente");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  const handleActualizarChoferBackend = async () => {
    try {
      const data = {
        ci: nuevoChofer.chofer.ci ?? null,
        direccion: nuevoChofer.direccion ?? null,
        email: nuevoChofer.email ?? null,
        estado: nuevoChofer.estado === 1 ? "Disponible" : "No Disponible",
        nombre:nuevoChofer.nombre ?? null,
        url_profile: nuevoChofer.profile_icon ?? null,
        telefono: nuevoChofer.telefono ?? null
      }
      const res = await actualizarDatosDelChofer(data, nuevoChofer.id);
      alert("✅ Chofer actualizado correctamente");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  return (
    <div className="container-chofer">
      <div className='opcionesList'>
        <button onClick={handleCambioAgregar}>Agregar Chofer</button>
        <button onClick={handleCambioListar}>Listar Choferes</button>
        <button
          checked={editar}
          onClick={handleCambioActualizar}
        > Actualizar Chofer</button>
        {/* <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={editar}
            onChange={handleCambiEditar}
          />
          <label className="form-check-label" >
            {editar ? 'Modo edición desactivado' : 'Modo edición activado'}
          </label>
        </div> */}
      </div>
      {listarChoferes === false ? (
        <div>
          {editar ? (
            <div>
              <div className="titulo-chofer">
                <i className="bi bi-person-fill-check icon-titulo"></i>
                <h2>Asignación de nuevo Chofer</h2>
              </div>

              <form className="formulario-chofer" onSubmit={onSubmit}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
                <input
                  type="number"
                  name="telefono"
                  placeholder="Telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <input
                  type="text"
                  name="carnet"
                  placeholder="Carnet de Identidad"
                  value={formData.carnet}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección / Vivienda"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
                <select name="estado" value={formData.estado} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                  <option value="Disponible">Disponible</option>
                  <option value="No Disponible">No Disponible</option>
                </select>

                <div className="registerChofer">
                  <button className="btn btn-success" type="submit">Registrar</button>
                </div>
              </form>

              <div className="buscar-vehiculo">
                <input
                  type="text"
                  placeholder="Buscar por placa o modelo"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && filtrados.length > 0 && (
                  <div className="sugerencias-lista">
                    {filtrados.map((v) => (
                      <div key={v.id} className="sugerencia-item" onClick={() => agregarVehiculo(v)}>
                        {v.placa}   {v.modelo}
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <h4>Vehículos asignados al chofer</h4>
              <table className="tabla-moviles">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {nuevoVehiculos.map((v) => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.placa}</td>
                      <td>{v.modelo}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => quitarVehiculo(v.id)}>
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) :
            (
              <div>
                <div className="buscar-vehiculo">
                  <h1>Buscar por el Codigo del Chofer</h1>
                  <input
                    type="text"
                    placeholder="Buscar CI"
                    value={busqueda2}
                    onChange={(e) => setBusqueda2(e.target.value)}
                  />
                  {busqueda2 && filtrarChofer.length > 0 && (
                    <div className="sugerencias-lista">
                      {filtrarChofer.map((c) => (
                        <div key={c.id} className="sugerencia-item" onClick={() => agregarChofer(c)}>
                          {c.chofer?.ci}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="titulo-chofer">
                    <i className="bi bi-person-fill-check icon-titulo"></i>
                    <h2>Informacion sobre el Chofer</h2>
                  </div>
                  <div className="imagen-perfil-container">
                    {nuevoChofer?.profile_icon && (
                      <img
                        src={nuevoChofer.profile_icon}
                        alt="Foto de perfil"
                        className="imagen-perfil"
                      />
                    )}
                  </div>


                  <form className="formulario-chofer" >
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre completo"
                      value={nuevoChofer.nombre}
                      onChange={(e) => setNuevoChofer({ ...nuevoChofer, [e.target.name]: e.target.value })}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      value={nuevoChofer.email}
                      onChange={(e) => setNuevoChofer({ ...nuevoChofer, [e.target.name]: e.target.value })}
                      required
                    />
                    <input
                      type="file"
                      name="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                    <input
                      type="text"
                      name="chofer.ci"
                      placeholder="Carnet de Identidad"
                      value={nuevoChofer.chofer?.ci ?? ""}
                      onChange={(e) => setNuevoChofer({ ...nuevoChofer, [e.target.name]: e.target.value })}
                    />
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección / Vivienda"
                      value={nuevoChofer.direccion ?? ""}
                      onChange={(e) => setNuevoChofer({ ...nuevoChofer, [e.target.name]: e.target.value })}
                    />
                    <select
                      value={nuevoChofer.estado}
                      onChange={(e) =>
                        setNuevoChofer({ ...nuevoChofer, estado: parseInt(e.target.value) })
                      }
                    >
                      <option value={1}>Disponible</option>
                      <option value={0}>No Disponible</option>
                    </select>


                    <div className="registerChofer">
                      <button className="btn btn-success" type="button" onClick={handleActualizarChoferBackend}>Actualizar</button>
                    </div>
                  </form>

                  <div className="buscar-vehiculo">
                    <input
                      type="text"
                      placeholder="Buscar por placa o modelo"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    {busqueda && filtrados.length > 0 && (
                      <div className="sugerencias-lista">
                        {filtrados.map((v) => (
                          <div key={v.id} className="sugerencia-item" onClick={() => agregarVehiculo(v)}>
                            {v.placa}   {v.modelo}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {
                    NuevosVehiculosConcedidos.length > 0 && (
                      <div className="NuevoVehiculoConcedido">
                        <h4>Nuevo vehiculo</h4>
                        <table className="tabla-moviles">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Placa</th>
                              <th>Modelo</th>
                              <th>Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {NuevosVehiculosConcedidos.map((v) => (
                              <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.placa}</td>
                                <td>{v.modelo}</td>
                                <td>
                                  <button className="btn btn-danger" onClick={() => quitarVehiculoNuevo(v.id)}>
                                    Quitar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button id='conceder' onClick={concederVehiculoBackend}>Conceder</button>
                      </div>
                    )
                  }

                  <h4>Vehiculos Concedidos</h4>
                  <table className="tabla-moviles">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nuevoChofer.chofer?.vehiculos.map((v) => (
                        <tr key={v.id}>
                          <td>{v.id}</td>
                          <td>{v.placa}</td>
                          <td>{v.modelo}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => eliminarVehiculoConcedido(v.id)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>) : (
        <div  className="dimensionTable">
          <h2>Lista de Choferes</h2>
          <table className="table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>CI</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {choferes.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.chofer?.ci}</td>
                  <td>{c.nombre}</td>
                  <td>{c.direccion || null}</td>
                  <td>{c.email}</td>
                  <td>{c.telefono}</td>
                  <td>{c.estado == 1 ? 'En Línea' : 'Fuera de Línea'}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleMostarImagen(c.profile_icon || null)}>
                      <i className="bi bi-person-vcard-fill"></i>
                    </button>
                    <button className="btn btn-success" onClick={() => handleMostarVehiculosDelChofer(c.chofer?.vehiculos || null)}>
                      <i className="bi bi-truck"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {
        mostrarImagenChofer && (
          <div className="imagenchofer">
            <img src={imagenChofer} alt="" />
            <button onClick={() => setMostrarImagenChofer(false)}>X</button>
          </div>
        )
      }

      {
        mostrarVehiculosDelChofer && (
          <div className="imagenchofer" >
            <h2>Vehiculos del Chofer</h2>
            <table className="tabla-moviles">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Placa</th>
                </tr>
              </thead>
              <tbody>
                {vehiculosDelChofer.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.placa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setMostrarVehiculosDelChofer(false)}>X</button>
          </div>
        )
      }

    </div>
  );
};

export default AsignacionChoferePage;
