import React from 'react'

function BitacoraVehiculosPage() {
    return (
        <div className='contenedoresPrincipales'>
            <h1>Bitacora de Vehiculos</h1>
            <div className='contenedorHijo'>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar por nombre"
                //      value={searchName}
                //      onChange={e => setSearchName(e.target.value)}
                />
                <select className="form-control">

                    <option value="asc">Fecha Ascendente</option>
                    <option value="desc">Fecha Descendente</option>
                </select>
                <button className="btn btn-danger" >Exportar PDF</button>
                <button className="btn btn-success" >Exportar Excel</button>
            </div>
            <div className='dimensionTable'>
                <table className='table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Chofer</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha Reservada</th>
                            <th>Fecha Llegada</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default BitacoraVehiculosPage