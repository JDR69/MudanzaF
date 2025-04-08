import React from 'react'
import "../Css/RegistroClientPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function RegistroClientPage() {
  return (
    <form className='formRegisterClient'>
      <div class="mb-3">
        <label for="formFile" class="form-label">Sube una Foto de Perfil</label>
        <input class="form-control" type="file" id="formFile" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Dirección de correo electrónico</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" class="form-text">Nunca compartiremos tu correo electrónico con nadie más.</div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Contraseña</label>
        </div>
        <div class="col-auto">
          <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" />
        </div>
        <div class="col-auto">
          <span id="passwordHelpInline" class="form-text">
            Escribe entre 8-20 Caracteres.
          </span>
        </div>
      </div>
      <div class="mb-3 form-check" id='contraseña'>
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Échame un vistazo</label>
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  )
}

export default RegistroClientPage