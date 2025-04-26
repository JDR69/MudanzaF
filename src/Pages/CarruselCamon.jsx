import { useState } from 'react';

function CardCarusel({ card }) {
  const [indiceActual, setIndiceActual] = useState(0);

  const irAlAnterior = () => {
    setIndiceActual((prevIndice) =>
      prevIndice === 0 ? card.img.length - 1 : prevIndice - 1
    );
  };

  const irAlSiguiente = () => {
    setIndiceActual((prevIndice) =>
      prevIndice === card.img.length - 1 ? 0 : prevIndice + 1
    );
  };

  return (
    <div className="col-md-4" style={{ position: 'relative', width: '300px', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexDirection: 'column'
    }}>
      <img
        src={card.img[indiceActual].url}
        alt={card.nombre}
        className="img-fluid rounded-start"
        style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
      />

      {/* Botón Anterior */}
      <button
        onClick={irAlAnterior}
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ‹
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={irAlSiguiente}
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ›
      </button>
    </div>
  );
}

export default CardCarusel;
