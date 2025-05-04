import React, { useState } from 'react';
import '../../Css/AsignacionChoferePage.css';
import Cloudinary from '../../Cloudinary';
import { registerChofer } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const AsignacionChoferePage = () => {
  const { image, handleFileChange, uploadImage } = Cloudinary();
  const { vehiculos } = useAuth(); // viene del contexto
  const [editar, setEditar] = useState(true);
  const [nuevoVehiculos, setNuevoVehiculos] = useState([]);
  const [estado, setEstado] = useState('En Línea');
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    carnet: '',
    direccion: '',
    telefono: '',
    estado: 1,
    url: ''
  });

  const [nuevoChofer, setNuevoChofer] = useState({
    id: '',
    nombre: '',
    email: '',
    carnet: '',
    direccion: '',
    telefono: '',
    estado: 1,
    url: ''
  });

  const choferes = [
    {
      id: 1,
      nombre: "Gabriel",
      email: "gabriel@gmail.com",
      carnet: "11317191",
      contraseña: "12345678",
      direccion: "AV.BOLIVIA",
      telefono: "12345678",
      estado: 1,
      url: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      nombre: "Laura",  
      email: "laura@gmail.com",
      carnet: "12456233",
      contraseña: "laura2025",
      direccion: "CALLE SUCRE",
      telefono: "12345678",
      estado: 1,
      url: "http://psta.com/laura"
    },
    {
      id: 3,
      nombre: "Carlos",
      email: "carlos@gmail.com",
      carnet: "13578942",
      contraseña: "carlos123",
      direccion: "AV.SANTA CRUZ",
      telefono: "12345678",
      estado: 1,
      url: "http://psta.com/carlos"
    },
    {
      id: 4,
      nombre: "María",
      email: "maria@gmail.com",
      carnet: "12678954",
      contraseña: "maria2024",
      telefono: "12345678",
      direccion: "ZONA NORTE",
      estado: 0,
      url: "http://psta.com/maria"
    },
    {
      id: 5,
      nombre: "José",
      email: "jose@gmail.com",
      carnet: "14785236",
      contraseña: "josechofer",
      direccion: "AV. BANZER",
      telefono: "12345678",
      estado: 1,
      url: "http://psta.com/jose"
    },
    {
      id: 6,
      nombre: "Ana",
      email: "ana@gmail.com",
      carnet: "15896324", 
      contraseña: "ana12345",
      direccion: "CALLE 21 DE MAYO",
      telefono: "12345678",
      estado: 0,
      url: "http://psta.com/ana"
    }
  ];


  const agregarVehiculo = (vehiculo) => {
    const existe = nuevoVehiculos.find(v => v.id === vehiculo.id);
    if (existe) {
      alert("⚠️ El vehículo ya está asignado.");
      return;
    }
    setNuevoVehiculos([...nuevoVehiculos, vehiculo]);
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
    setBusqueda('');
  }

  const filtrarChofer = choferes.filter(
    (c) =>
      c.carnet.toLowerCase().includes(busqueda.toLowerCase())
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await uploadImage();
      if(url){
        formData.url = url;
      }
    } catch (error) {
      alert("Error al subir imagen");
      return;
    }

    try {
      const data = {
        dirrecion: formData.direccion,
        estado: true,
        ci: formData.carnet,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password,
        url_profile: formData.url || null,
        vehiculos: nuevoVehiculos.map(v => v.id), // enviar ids de vehículos asignados
      };

      console.log(data);

      // const res = await registerChofer(data);
      alert("✅ Chofer registrado correctamente");

      setFormData({
        nombre: '',
        email: '',
        password: '',
        carnet: '',
        direccion: '',
        telefono: '',
      });
      setNuevoVehiculos([]);
    } catch (err) {
      console.error("❌ Error al registrar chofer:", err);
      alert("Error al registrar chofer");
    }
  };

  return (
    <div className="container-chofer">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switchCheckChecked"
          checked={editar}
          onChange={(e) => setEditar(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="switchCheckChecked">
          {editar ? 'Modo edición desactivado' : 'Modo edición activado'}
        </label>
      </div>

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
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="En Línea">En Línea</option>
              <option value="Fuera de Línea">Fuera de Línea</option>
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
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {busqueda && filtrarChofer.length > 0 && (
                <div className="sugerencias-lista">
                  {filtrarChofer.map((c) => (
                    <div key={c.id} className="sugerencia-item" onClick={() => agregarChofer(c)}>
                      {c.carnet}
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
                {nuevoChofer?.url && (
                  <img
                    src={nuevoChofer.url}
                    alt="Foto de perfil"
                    className="imagen-perfil"
                  />
                )}
              </div>


              <form className="formulario-chofer" onSubmit={onSubmit}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={nuevoChofer.nombre}
                  onChange={(e) => setNuevoChofer({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={nuevoChofer.email}
                  onChange={(e) => setNuevoChofer({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña/si es necesario"
                  value={formData.password}
                  onChange={(e) => setNuevoChofer({ ...formData, [e.target.name]: e.target.value })}
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
                  value={nuevoChofer.carnet}
                  onChange={(e) => setNuevoChofer({ ...formData, [e.target.name]: e.target.value })}
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección / Vivienda"
                  value={nuevoChofer.direccion}
                  onChange={(e) => setNuevoChofer({ ...formData, [e.target.name]: e.target.value })}
                />
                <select
                  value={nuevoChofer.estado}
                  onChange={(e) =>
                    setNuevoChofer({ ...nuevoChofer, estado: parseInt(e.target.value) })
                  }
                >
                  <option value={1}>En Línea</option>
                  <option value={0}>Fuera de Línea</option>
                </select>


                <div className="registerChofer">
                  <button className="btn btn-success" type="submit">Actualizar</button>
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
          </div>
        )}

    </div>
  );
};

export default AsignacionChoferePage;
