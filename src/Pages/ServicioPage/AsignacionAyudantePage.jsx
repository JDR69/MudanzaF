// componente de fernando
import React, { useEffect, useState } from "react";
import "../../Css/AsignacionAyudantePage.css";
import "../../Css/ModalTest.css";

import { useParams } from "react-router-dom";
import AyudanteService from "../../api/ayudanteService.js"
function AsignacionAyudantePage() {

  const [busqueda, setBusqueda] = useState("");
  
  const [modalAsignar, setModalAsignar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);
  const [ayudanteSeleccionado, setAyudanteSeleccionado] = useState(null);
    const [ayudantesDisponibles, setAyudantesDisponibles] = useState([]);
    const [asignados, setAsignados] = useState([]);
    const { id: servicioId } = useParams();

 const filtrados = ayudantesDisponibles
   .filter((a) => !asignados.find((as) => as.id === a.id))
   .filter((a) => a.nombre.toLowerCase().includes(busqueda.toLowerCase()));


   useEffect(() => {
     AyudanteService.getAyudantesDisponibles()
       .then((res) => {
         const data = Array.isArray(res.data) ? res.data : [];
         setAyudantesDisponibles(data);
       })
       .catch((err) =>
         console.error("Error al cargar ayudantes disponibles:", err)
       );

     AyudanteService.getIntegrantes(servicioId)
       .then((res) => {
         const formato = res.data.map((i) => ({
           id: i.usuario.id,
           nombre: i.usuario.nombre,
           direccion: i.usuario.direccion,
           intermedia_id: i.id,
         }));
         setAsignados(formato);
       })
       .catch((err) =>
         console.error("Error al cargar ayudantes asignados:", err)
       );
   }, [servicioId]);

 
  //conexion con el backend

  const asignarAyudante = async (ayudante) => {
    try {
      const res = await AyudanteService.asignarAyudante({
        ayudante_id: ayudante.id,
        servicio_id: Number(servicioId),
      });
      const nuevo = { ...ayudante, intermedia_id: res.data.id };
      setAsignados((prev) => [...prev, nuevo]);
      setModalAsignar(null);
      setAyudanteSeleccionado(null);
      setBusqueda("")
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al asignar ayudante";
      alert(mensaje);
    }
  };


  const eliminarAsignacion = async (intermedia_id) => {
    try {
      await AyudanteService.eliminarAsignacion(intermedia_id);
      setAsignados((prev) =>
        prev.filter((a) => a.intermedia_id !== intermedia_id)
      );
      setModalEliminar(null);
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al eliminar ayudante";
      alert(mensaje);
    }
  };


  return (
    <div className="contenedor-ayudante">
      <h1 className="titulo">Asignación de Ayudantes</h1>

      <div
        className="buscador"
        style={{ display: "flex", gap: "10px", justifyContent: "center" }}
      >
        <input
          type="text"
          placeholder="Buscar ayudante por nombre"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setAyudanteSeleccionado(null); // limpiar selección
          }}
          className="input-busqueda"
        />
        {ayudanteSeleccionado && (
          <button
            className="btn-asignar"
            onClick={() => setModalAsignar(ayudanteSeleccionado)}
          >
            Asignar
          </button>
        )}
      </div>

      {busqueda.trim() !== "" && (
        <div className="lista-ayudantes">
          {filtrados.length > 0 ? (
            filtrados.map((a) => (
              <div
                key={a.id}
                className={`ayudante-card ${
                  ayudanteSeleccionado?.id === a.id ? "seleccionado" : ""
                }`}
                onClick={() => setAyudanteSeleccionado(a)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <strong>{a.nombre}</strong> — {a.direccion}
                </div>
              </div>
            ))
          ) : (
            <div className="ayudante-card">
              <strong>Ayudante no encontrado</strong>
            </div>
          )}
        </div>
      )}

      <h2 className="subtitulo">Ayudantes Asignados</h2>
      <table className="tabla-asignados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {asignados.length === 0 && (
            <tr>
              <td colSpan="4">No hay ayudantes asignados.</td>
            </tr>
          )}
          {asignados.map((a) => (
            <tr key={a.intermedia_id}>
              <td>{a.intermedia_id}</td>
              <td>{a.nombre}</td>
              <td>{a.direccion}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => setModalEliminar(a)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Confirmar Asignación */}
      {modalAsignar && (
        <div className="mi-modal">
          <div className="mi-modal-contenido">
            <p>
              ¿Estás seguro de asignar a <strong>{modalAsignar.nombre}</strong>?
            </p>
            <div className="mi-modal-botones">
              <button
                className="btn-confirmar"
                onClick={() => asignarAyudante(modalAsignar)}
              >
                Sí
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setModalAsignar(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminación */}
      {modalEliminar && (
        <div className="mi-modal">
          <div className="mi-modal-contenido">
            <p>
              ¿Estás seguro de eliminar la asignación de{" "}
              <strong>{modalEliminar.nombre}</strong>?
            </p>
            <div className="mi-modal-botones">
              <button
                className="btn-confirmar"
                onClick={() => eliminarAsignacion(modalEliminar.intermedia_id)}
              >
                Sí
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setModalEliminar(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AsignacionAyudantePage;
