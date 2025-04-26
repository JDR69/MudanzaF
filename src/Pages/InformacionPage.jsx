import React, { useState } from 'react';
import '../Css/InformacionPage.css';

const InformacionPage = () => {
  const [linkActivo, setLinkActivo] = useState('Seguros');

  return (
    <div className="ContenedorInformacion">
      <div className='ParteSuperiorInformacion'>
        <h1>Sobre Nosotros</h1>
        <div className='imgInformacion'>
          <img src="Login.jpg" alt="" className='ImagenLogoNostrosInformacion' />
        </div>
      </div>

      <div className='ParteIntermediaInformacion'>
        <div className='LinkInformacion'>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a
                className={`nav-link ${linkActivo === 'Seguros' ? 'active' : ''}`}
                href="#"
                id='linkSobreNosotros'
                onClick={() => setLinkActivo('Seguros')}
              >
                Seguros
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${linkActivo === 'Link1' ? 'active' : ''}`}
                href="#"
                id='linkSobreNosotros'
                onClick={() => setLinkActivo('Link1')}
              >
                Link
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${linkActivo === 'Link2' ? 'active' : ''}`}
                href="#"
                id='linkSobreNosotros'
                onClick={() => setLinkActivo('Link2')}
              >
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='ParteInferiorInformacion'>
        <div className='EncabezadoYImagen'>
          <h1 className={`TituloSeguro ${linkActivo === 'Seguros' ? 'tituloActivo' : ''}`}>Seguro UniPlus</h1>
          <img src="Login.jpg" alt="" className='SobreNosotros' />
        </div>
        <div className='TextoInformacion'>
          <p>
            En la actualidad, la empresa cuenta con una amplia gama de seguros para vehículos, que incluyen seguros de responsabilidad civil, seguros a todo riesgo y seguros de accidentes personales.
            Estos seguros están diseñados para proteger tanto a los conductores como a los pasajeros en caso de accidentes o daños a terceros.
          </p>
        </div>
      </div>

    </div>
  );
};

export default InformacionPage;
