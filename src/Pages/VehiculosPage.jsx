import React from 'react'
import '../Css/VehiculosPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function VehiculosPage() {
   

    return (
        <div className='VehiculosConteiner'>
            <div className='VehiculosConteiner2'>
                <h1>Registro de Vehiculos</h1>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name="Nombre" className='form-control' required />
                    <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744404252/samples/animals/three-dogs.jpg" alt="" />
                </div>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name="Nombre" className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name="Nombre" className='form-control' required />
                </div>
               

            </div>
        </div>
    );
}


export default VehiculosPage