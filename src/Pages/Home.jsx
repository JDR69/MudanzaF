import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/Home.css';
import Footer from '../Components/footer/Footer';

const slides = [
  { id: 1, label: "Servicios Locales", description: "Llevar tus cosas a otro departamento.", image: "/login5.jpg" },
  // { id: 2, label: "Second slide label", description: "Some representative placeholder content for the second slide.", image: "/login2.jpg" },
  { id: 3, label: "Servicios Internacionales", description: "Servicio por carretera a todo el continente.", image: "/login3.jpg" },
  { id: 4, label: "Servicios Nacionales", description: "Mudanza en tu ciudad local de ubicacion a ubicacion.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1748927254/FAFLW2rWEAAXMR4_ojdnag.jpg" },
];

const cards = [
  { id: 1, title: "Mudanza residencial", text: "Te ayudamos a trasladar tus pertenencias con seguridad y puntualidad.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1746661906/suzi2_xhjait.jpg", updated: "Hace 5 minutos", tipo: "local" },
  { id: 2, title: "Embalaje profesional", text: "Ofrecemos servicio de embalaje para proteger tus objetos delicados.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1746300299/transporte2_cvjbtf.jpg", updated: "Hace 10 minutos", tipo: "local" },
  { id: 3, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1748927410/repartidor-pila-paquetes_23-2148590662_x8e8vm.avif", updated: "Hace 20 minutos", tipo: "nacional" },
  { id: 4, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1748927401/vista-frontal-repartidores-concepto-trabajo_23-2148684734_rhd5zi.avif", updated: "Hace 20 minutos", tipo: "nacional" },
  { id: 5, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1748927398/vista-frontal-repartidores-concepto-trabajo_23-2148684715_pqocey.avif", updated: "Hace 20 minutos", tipo: "nacional" },
  { id: 6, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1748927394/vista-frontal-repartidores-concepto-trabajo_23-2148684735_bgfwwd.avif", updated: "Hace 20 minutos", tipo: "local" }
];

const Home = () => {
  const [tipoServicio, setTipoServicio] = useState("todos");
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      {/* Carousel - untouched as requested */}
      <div id="customCarousel" className="carousel slide carousel-container" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#customCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={slide.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={slide.image} alt={slide.label} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slide.label}</h5>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#customCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#customCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Enhanced Slogan with navigation */}
      <div className="slogan-section">
        <h1>"Tu mudanza segura, rápida y sin complicaciones"</h1>
        <button type="button" onClick={() => navigate('/catalogoVehiculo')} className="cta-button">
          Solicitar Servicio
        </button>
      </div>

      {/* Enhanced Filter section */}
      <div className="filter-section">
        <h4>Nuestros Servicios</h4>
        <div className="filter-buttons">
          <button 
            className={tipoServicio === "todos" ? "active-filter" : ""} 
            onClick={() => setTipoServicio("todos")}
          >
            Todos los servicios
          </button>
          <button 
            className={tipoServicio === "locales" ? "active-filter" : ""} 
            onClick={() => setTipoServicio("locales")}
          >
            Servicios Locales
          </button>
          <button 
            className={tipoServicio === "nacionales" ? "active-filter" : ""} 
            onClick={() => setTipoServicio("nacionales")}
          >
            Servicios Nacionales
          </button>
        </div>
      </div>

      {/* Servicios Locales */}
      {(tipoServicio === "todos" || tipoServicio === "locales") && (
        <div className="service-category">
          <h2>Servicios de Mudanza Locales</h2>
          <div className="cards-grid">
            {cards.filter(card => card.tipo === "local").map((card) => (
              <div key={card.id} className="card-custom" onClick={() => navigate('/catalogoVehiculo')}>
                <div className="card-image-container">
                  <img src={card.image} alt={card.title} />
                  <div className="card-overlay">
                    <button className="card-action-btn">Pedido Rapido</button>
                  </div>
                </div>
                <div className="card-body-custom">
                  <h5>{card.title}</h5>
                  <p>{card.text}</p>
                  <p><small>Última actualización: {card.updated}</small></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Servicios Nacionales */}
      {(tipoServicio === "todos" || tipoServicio === "nacionales") && (
        <div className="service-category">
          <h2>Servicios de Mudanza Nacionales</h2>
          <div className="cards-grid">
            {cards.filter(card => card.tipo === "nacional").map((card) => (
              <div key={card.id} className="card-custom" onClick={() => navigate('/seguroEmpresa')}>
                <div className="card-image-container">
                  <img src={card.image} alt={card.title} />
                  <div className="card-overlay">
                    <button className="card-action-btn">Ver detalles</button>
                  </div>
                </div>
                <div className="card-body-custom">
                  <h5>{card.title}</h5>
                  <p>{card.text}</p>
                  <p><small>Última actualización: {card.updated}</small></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New testimonial section */}
      <div className="testimonials-section">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <div className="quote">"Excelente servicio, mi mudanza fue rápida y sin complicaciones."</div>
            <div className="author">- María García</div>
            <button onClick={() => navigate('/comentarios')} className="testimonial-btn">Ver más comentarios</button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
