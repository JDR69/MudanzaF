import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MudanzaF</h3>
          <p>Tu solución confiable para mudanzas y transporte de carga.</p>
        </div>
        
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: info@mudanzaf.com</p>
          <p>Teléfono: 77505845</p>
          <p>Dirección: Calle AV/Lotes</p>
        </div>

        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MudanzaF. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;