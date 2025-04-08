import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Css/Home.css';

const slides = [
  {
    id: 1,
    label: "First slide label",
    description: "Some representative placeholder content for the first slide.",
    image: "/Login.jpg",
  },
  {
    id: 2,
    label: "Second slide label",
    description: "Some representative placeholder content for the second slide.",
    image: "/Login.jpg",
  },
  {
    id: 3,
    label: "Third slide label",
    description: "Some representative placeholder content for the third slide.",
    image: "/Login.jpg",
  },
];

const cards = [
  {
    id: 1,
    title: "Mudanza residencial",
    text: "Te ayudamos a trasladar tus pertenencias con seguridad y puntualidad.",
    image: "/Login.jpg",
    updated: "Hace 5 minutos",
    tipo: "local",
  },
  {
    id: 2,
    title: "Embalaje profesional",
    text: "Ofrecemos servicio de embalaje para proteger tus objetos delicados.",
    image: "/Login.jpg",
    updated: "Hace 10 minutos",
    tipo: "local",
  },
  {
    id: 3,
    title: "Mudanzas corporativas",
    text: "Movemos oficinas completas sin interrumpir tus operaciones.",
    image: "/Login.jpg",
    updated: "Hace 20 minutos",
    tipo: "nacional",
  },
  {
    id: 4,
    title: "Mudanzas corporativas",
    text: "Movemos oficinas completas sin interrumpir tus operaciones.",
    image: "/Login.jpg",
    updated: "Hace 20 minutos",
    tipo: "nacional",
  },
  {
    id: 5,
    title: "Mudanzas corporativas",
    text: "Movemos oficinas completas sin interrumpir tus operaciones.",
    image: "/Login.jpg",
    updated: "Hace 20 minutos",
    tipo: "nacional",
  },
  {
    id: 6,
    title: "Mudanzas corporativas",
    text: "Movemos oficinas completas sin interrumpir tus operaciones.",
    image: "/Login.jpg",
    updated: "Hace 20 minutos",
    tipo: "local",
  }
];

const Home = () => {
  const [tipoServicio, setTipoServicio] = useState("todos"); // "todos", "locales", "nacionales"

  return (
    <div className='ContenedorCarrusel'>

      {/* Carrusel */}
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#carouselExampleCaptions"
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
              <img src={slide.image} className="d-block w-100" alt="Slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slide.label}</h5>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Sección de info */}
      <div className='InformacionServicio'>
        <div className='Descripcion text-center py-4'>
          <h1>“Tu mudanza segura, rápida y sin complicaciones”</h1>
          <button type="button" className="btn btn-info mt-2">Solicitar Servicio</button>
        </div>

        {/* Dropdown */}
        <div className="dropdown text-center mb-3">
          <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filtrar Servicios
          </button>
          <ul className="dropdown-menu text-center">
            <li><button className="dropdown-item" onClick={() => setTipoServicio("todos")}>Todos los servicios</button></li>
            <li><button className="dropdown-item" onClick={() => setTipoServicio("locales")}>Servicios Locales</button></li>
            <li><button className="dropdown-item" onClick={() => setTipoServicio("nacionales")}>Servicios Nacionales</button></li>
          </ul>
        </div>

        {/* Servicios Locales */}
        {(tipoServicio === "todos" || tipoServicio === "locales") && (
          <div className="Locales">
            <h2>Servicios de Mudanza Locales</h2>
            <div className="ContenedorLocal">
              {cards.filter(card => card.tipo === "local").map((card) => (
                <div key={card.id} className="card mb-3 card-responsive" style={{ maxWidth: '540px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={card.image} className="img-fluid rounded-start" alt={card.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.text}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">Última actualización: {card.updated}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Servicios Nacionales */}
        {(tipoServicio === "todos" || tipoServicio === "nacionales") && (
          <div className="Locales">
            <h2>Servicios de Mudanza Nacionales</h2>
            <div className="ContenedorLocal">
              {cards.filter(card => card.tipo === "nacional").map((card) => (
                <div key={card.id} className="card mb-3 card-responsive" style={{ maxWidth: '540px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={card.image} className="img-fluid rounded-start" alt={card.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.text}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">Última actualización: {card.updated}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
