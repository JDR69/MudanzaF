import React from 'react'
import "../Css/GestionEmbalajePage.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function GestionEmbalajePage() {
    return (
        <div className='GestionEmbalajeContainer'>
            <div className='GestionEmbalajeContainerForm'>
                <h1>Gestion de Embalaje</h1>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input name="nombre" className="form-control"  />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Material</label>
                        <select name="username" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Correo Electrónico</label>
                        <input name="email" type="email" className="form-control"  />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GestionEmbalajePage