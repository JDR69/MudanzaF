import React, { useEffect, useState } from 'react';
import '../Css/Home.css';

const slides = [
  { id: 1, label: "First slide label", description: "Some representative placeholder content for the first slide.", image: "/Login.jpg" },
  { id: 2, label: "Second slide label", description: "Some representative placeholder content for the second slide.", image: "/login2.jpg" },
  { id: 3, label: "Third slide label", description: "Some representative placeholder content for the third slide.", image: "/Login.jpg" },
];

const cards = [
  { id: 1, title: "Mudanza residencial", text: "Te ayudamos a trasladar tus pertenencias con seguridad y puntualidad.", image: "/Login.jpg", updated: "Hace 5 minutos", tipo: "local" },
  { id: 2, title: "Embalaje profesional", text: "Ofrecemos servicio de embalaje para proteger tus objetos delicados.", image: "/Login.jpg", updated: "Hace 10 minutos", tipo: "local" },
  { id: 3, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "/Login.jpg", updated: "Hace 20 minutos", tipo: "nacional" },
  { id: 4, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "/Login.jpg", updated: "Hace 20 minutos", tipo: "nacional" },
  { id: 5, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "/Login.jpg", updated: "Hace 20 minutos", tipo: "nacional" },
  { id: 6, title: "Mudanzas corporativas", text: "Movemos oficinas completas sin interrumpir tus operaciones.", image: "/Login.jpg", updated: "Hace 20 minutos", tipo: "local" }
];

const Home = () => {
  const [tipoServicio, setTipoServicio] = useState("todos");

  return (
    <div>
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



      {/* Slogan */}
      <div className="slogan-section">
        <h1>“Tu mudanza segura, rápida y sin complicaciones”</h1>
        <button type="button">Solicitar Servicio</button>
      </div>

      {/* Filtro de servicios */}
      <div className="dropdown-section">
        <h4>Filtrar Servicios</h4>
        <ul>
          <li><button onClick={() => setTipoServicio("todos")}>Todos los servicios</button></li>
          <li><button onClick={() => setTipoServicio("locales")}>Servicios Locales</button></li>
          <li><button onClick={() => setTipoServicio("nacionales")}>Servicios Nacionales</button></li>
        </ul>
      </div>

      {/* Servicios Locales */}
      {(tipoServicio === "todos" || tipoServicio === "locales") && (
        <div className="service-category">
          <h2>Servicios de Mudanza Locales</h2>
          <div className="cards-grid">
            {cards.filter(card => card.tipo === "local").map((card) => (
              <div key={card.id} className="card-custom">
                <img src={card.image} alt={card.title} />
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
              <div key={card.id} className="card-custom">
                <img src={card.image} alt={card.title} />
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
    </div>
  );
};

export default Home;
