import React from 'react';
import "../Css/RegistroClientPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function RegistroClientPage() {
  return (
    <div className="formContainer">

      <form className='formRegisterClient'>
        <h2 className="titulo mb-4">Registro Cliente</h2> 
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="formFile" className="form-label">Sube una Foto de Perfil</label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">Dirección de correo electrónico</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">Nunca compartiremos tu correo electrónico con nadie más.</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="tel" className="form-control" id="telefono" aria-describedby="telefonoHelp" pattern="[0-9]{10}" placeholder="Ingrese su número de teléfono" required />
            <small id="telefonoHelp" className="form-text">Ingrese un número de teléfono de 10 dígitos.</small>
          </div>
          <div className="col-md-6">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control" id="fechaNacimiento" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputPassword6" className="col-form-label">Contraseña</label>
            <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
            <span id="passwordHelpInline" className="form-text">Escribe entre 8-20 Caracteres.</span>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Échame un vistazo</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Confirmar Registro</button>
      </form>
    </div>
  );
}

export default RegistroClientPage;