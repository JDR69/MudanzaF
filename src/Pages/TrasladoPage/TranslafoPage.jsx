import React, { useState, useEffect } from 'react';
import '../../Css/TraslafoPage.css';
// Importamos íconos para mejorar la interfaz
import { FaTruck, FaMapMarkerAlt, FaUser, FaBox, FaCalendarAlt, FaPhoneAlt, FaSearch, FaFilter } from 'react-icons/fa';

const TranslafoPage = () => {
  // Estado para el traslado seleccionado actualmente
  const [selectedTrasladoId, setSelectedTrasladoId] = useState(null);
  // Estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el filtro de estado
  const [statusFilter, setStatusFilter] = useState('todos'); // 'todos', 'en-curso', 'finalizados'
  
  // Estado para la lista de traslados (agregamos 6 más)
  const [traslados, setTraslados] = useState([
    {
      id: 'TRA-78945',
      progress: 0,
      fechaInicio: '2025-06-22 08:30',
      tiempoEstimado: '3 horas',
      contactoEmergencia: '75123456',
      vehiculo: {
        tipo: 'Camión Mercedes Benz',
        placa: 'ABC-123',
        conductor: 'Carlos Gutiérrez',
        capacidad: '5 toneladas',
        color: 'Blanco',
        telefono: '70123456'
      },
      materiales: [
        'Sofá de 3 plazas',
        'Mesa de comedor + 6 sillas',
        'Refrigerador LG',
        '12 cajas de embalaje (ropa y objetos personales)',
        'Cama king size + colchón'
      ],
      origen: 'Av. Las Américas #123',
      destino: 'Calle Los Pinos #456',
      condicionesClimaticas: 'Soleado, 28°C'
    },
    {
      id: 'TRA-78946',
      progress: 0,
      fechaInicio: '2025-06-22 09:15',
      tiempoEstimado: '2 horas',
      contactoEmergencia: '75123888',
      vehiculo: {
        tipo: 'Camioneta Ford F-150',
        placa: 'XYZ-789',
        conductor: 'María López',
        capacidad: '2 toneladas',
        color: 'Gris',
        telefono: '70189456'
      },
      materiales: [
        'Escritorio de oficina',
        'Silla ergonómica',
        'Computadora y periféricos',
        '5 cajas de documentos',
        'Estantería modular'
      ],
      origen: 'Oficina Central, Torre Empresarial #500',
      destino: 'Nueva Sucursal, Av. Principal #200',
      condicionesClimaticas: 'Nublado, 24°C'
    },
    {
      id: 'TRA-78947',
      progress: 0,
      fechaInicio: '2025-06-22 10:00',
      tiempoEstimado: '4 horas',
      contactoEmergencia: '75987456',
      vehiculo: {
        tipo: 'Camión Volvo FH',
        placa: 'DEF-456',
        conductor: 'Roberto Sánchez',
        capacidad: '8 toneladas',
        color: 'Azul',
        telefono: '70567456'
      },
      materiales: [
        'Mobiliario completo de sala',
        'Mobiliario completo de comedor',
        'Electrodomésticos varios',
        '20 cajas de embalaje',
        'Bicicleta estática',
        'Piano de cola'
      ],
      origen: 'Calle Central #789',
      destino: 'Urbanización Las Palmas #321',
      condicionesClimaticas: 'Parcialmente nublado, 26°C'
    },
    // 6 traslados adicionales
    {
      id: 'TRA-78948',
      progress: 0,
      fechaInicio: '2025-06-22 11:30',
      tiempoEstimado: '5 horas',
      contactoEmergencia: '75123666',
      vehiculo: {
        tipo: 'Camión Isuzu NPR',
        placa: 'GHI-789',
        conductor: 'Luis Ramírez',
        capacidad: '4 toneladas',
        color: 'Rojo',
        telefono: '70123789'
      },
      materiales: [
        'Colección de arte (15 cuadros)',
        'Esculturas (5 piezas)',
        'Biblioteca completa (500 libros)',
        'Muebles antiguos de valor',
        'Cajas especiales de embalaje para objetos frágiles'
      ],
      origen: 'Galería de Arte Central, Zona Cultural',
      destino: 'Museo Nacional de Arte, Av. Cultural #100',
      condicionesClimaticas: 'Soleado, 30°C'
    },
    {
      id: 'TRA-78949',
      progress: 0,
      fechaInicio: '2025-06-22 12:45',
      tiempoEstimado: '1.5 horas',
      contactoEmergencia: '75129876',
      vehiculo: {
        tipo: 'Furgoneta Renault Trafic',
        placa: 'JKL-012',
        conductor: 'Andrea Flores',
        capacidad: '1.5 toneladas',
        color: 'Blanco',
        telefono: '70987654'
      },
      materiales: [
        'Equipamiento médico especializado',
        'Microscopios (3 unidades)',
        'Equipos de laboratorio',
        'Material quirúrgico',
        'Medicamentos refrigerados'
      ],
      origen: 'Clínica Central, Av. Salud #500',
      destino: 'Nuevo Hospital General, Calle Medicina #200',
      condicionesClimaticas: 'Soleado, 29°C'
    },
    {
      id: 'TRA-78950',
      progress: 0,
      fechaInicio: '2025-06-22 13:15',
      tiempoEstimado: '6 horas',
      contactoEmergencia: '75123111',
      vehiculo: {
        tipo: 'Camión Frigorífico Scania',
        placa: 'MNO-345',
        conductor: 'Jorge Mendoza',
        capacidad: '6 toneladas',
        color: 'Blanco y azul',
        telefono: '70876543'
      },
      materiales: [
        'Productos perecederos refrigerados',
        'Carnes (500 kg)',
        'Lácteos (300 kg)',
        'Frutas y verduras (400 kg)',
        'Alimentos congelados (200 kg)'
      ],
      origen: 'Centro de Distribución Alimentaria',
      destino: 'Cadena de Supermercados "El Ahorro", 5 ubicaciones',
      condicionesClimaticas: 'Parcialmente nublado, 27°C'
    },
    {
      id: 'TRA-78951',
      progress: 0,
      fechaInicio: '2025-06-22 14:30',
      tiempoEstimado: '2.5 horas',
      contactoEmergencia: '75123222',
      vehiculo: {
        tipo: 'Camioneta Toyota Hilux',
        placa: 'PQR-678',
        conductor: 'Daniela Morales',
        capacidad: '1 tonelada',
        color: 'Negro',
        telefono: '70765432'
      },
      materiales: [
        'Equipamiento para evento',
        'Sistema de sonido profesional',
        'Luces y efectos especiales',
        'Generador eléctrico portátil',
        'Carpas y mobiliario para exteriores'
      ],
      origen: 'Empresa de Eventos "Celebrations Inc."',
      destino: 'Hotel Grand Plaza, Salón de Eventos',
      condicionesClimaticas: 'Despejado, 28°C'
    },
    {
      id: 'TRA-78952',
      progress: 0,
      fechaInicio: '2025-06-22 15:00',
      tiempoEstimado: '7 horas',
      contactoEmergencia: '75123333',
      vehiculo: {
        tipo: 'Camión Volvo FH16 con remolque',
        placa: 'STU-901',
        conductor: 'Miguel Ángel Castro',
        capacidad: '15 toneladas',
        color: 'Verde',
        telefono: '70654321'
      },
      materiales: [
        'Maquinaria industrial pesada',
        'Generadores industriales (2 unidades)',
        'Compresores de aire industrial',
        'Equipos para planta de manufactura',
        'Herramientas especializadas'
      ],
      origen: 'Zona Industrial Norte, Planta #5',
      destino: 'Nueva Planta de Manufactura, Parque Industrial Sur',
      condicionesClimaticas: 'Nublado, 25°C'
    },
    {
      id: 'TRA-78953',
      progress: 0,
      fechaInicio: '2025-06-22 16:15',
      tiempoEstimado: '3.5 horas',
      contactoEmergencia: '75123444',
      vehiculo: {
        tipo: 'Camión Especializado Mercedes Actros',
        placa: 'VWX-234',
        conductor: 'Fernando Vargas',
        capacidad: '10 toneladas',
        color: 'Plateado',
        telefono: '70543210'
      },
      materiales: [
        'Servidores y equipamiento de red',
        'Sistemas de almacenamiento de datos',
        'UPS y sistemas de energía',
        'Sistemas de refrigeración para data center',
        'Equipamiento de seguridad informática'
      ],
      origen: 'Centro de Datos Principal',
      destino: 'Nuevo Centro de Datos Corporativo',
      condicionesClimaticas: 'Despejado, 26°C'
    },
  ]);

  // Efecto para simular el avance de todos los traslados
  useEffect(() => {
    const intervals = traslados.map(traslado => {
      return setInterval(() => {
        setTraslados(prevTraslados => 
          prevTraslados.map(t => {
            if (t.id === traslado.id && t.progress < 100) {
              // Incremento aleatorio para simular velocidades variables
              const increment = Math.floor(Math.random() * 6) + 3; // 3-8%
              const newProgress = Math.min(100, t.progress + increment);
              return { ...t, progress: newProgress };
            }
            return t;
          })
        );
      }, 3000 + Math.random() * 2000); // Tiempos variables entre 3-5 segundos
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  // Filtrar traslados por búsqueda y estado
  const filteredTraslados = traslados.filter(traslado => {
    // Filtro de búsqueda
    const searchMatch = 
      traslado.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traslado.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traslado.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traslado.vehiculo.conductor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de estado
    let statusMatch = true;
    if (statusFilter === 'en-curso') {
      statusMatch = traslado.progress < 100;
    } else if (statusFilter === 'finalizados') {
      statusMatch = traslado.progress >= 100;
    }
    
    return searchMatch && statusMatch;
  });

  // Renderizado de un traslado individual en detalle
  const renderTrasladoDetail = (traslado) => {
    return (
      <div className="traslado-detail">
        <div className="traslado-header">
          <h1>Seguimiento de Traslado en Vivo</h1>
          <div className="traslado-id">
            <span className="id-label">ID: </span>
            <span className="id-value">{traslado.id}</span>
          </div>
          <div className="traslado-meta">
            <div className="meta-item">
              <FaCalendarAlt className="icon" />
              <span>{traslado.fechaInicio}</span>
            </div>
            <div className="meta-item">
              <FaTruck className="icon" />
              <span>Tiempo estimado: {traslado.tiempoEstimado}</span>
            </div>
            <div className="meta-item climate">
              <i className="wi wi-day-sunny"></i> {/* Asumiendo que usamos weather-icons */}
              <span>{traslado.condicionesClimaticas}</span>
            </div>
          </div>
          <button className="back-button pulse" onClick={() => setSelectedTrasladoId(null)}>
            <i className="fas fa-arrow-left"></i> Volver a la lista
          </button>
        </div>
        
        <div className="progress-section">
          <h2>Estado del Traslado</h2>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${traslado.progress}%` }}>
              <span className="progress-text">{traslado.progress}%</span>
            </div>
          </div>
          
          <div className="progress-details">
            <div className="progress-stage">
              <div className={`stage-point ${traslado.progress > 0 ? 'complete' : ''}`}>
                <div className="point"></div>
                <span>Inicio</span>
              </div>
              <div className={`stage-point ${traslado.progress >= 33 ? 'complete' : ''}`}>
                <div className="point"></div>
                <span>En ruta</span>
              </div>
              <div className={`stage-point ${traslado.progress >= 66 ? 'complete' : ''}`}>
                <div className="point"></div>
                <span>Llegando</span>
              </div>
              <div className={`stage-point ${traslado.progress >= 100 ? 'complete' : ''}`}>
                <div className="point"></div>
                <span>Entregado</span>
              </div>
            </div>
          </div>
        </div>
        
        {traslado.progress === 100 && (
          <div className="notification">
            <i className="fas fa-check-circle"></i>
            ¡Viaje finalizado! Tu mudanza ha llegado a su destino.
          </div>
        )}
        
        <div className="info-container">
          <div className="info-section">
            <h2><FaMapMarkerAlt className="section-icon" /> Información del Traslado</h2>
            <div className="location-map">
              <div className="map-placeholder">
                <div className="route-line"></div>
                <div className="origin-point">A</div>
                <div className="destination-point">B</div>
              </div>
            </div>
            <div className="locations-info">
              <div className="location-item">
                <div className="location-label">
                  <span className="location-badge origin">A</span>
                  Origen:
                </div>
                <div className="location-value">{traslado.origen}</div>
              </div>
              <div className="location-item">
                <div className="location-label">
                  <span className="location-badge destination">B</span>
                  Destino:
                </div>
                <div className="location-value">{traslado.destino}</div>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h2><FaTruck className="section-icon" /> Información del Vehículo</h2>
            <div className="vehicle-info">
              <div className="info-item">
                <div className="info-label">Tipo de vehículo:</div>
                <div className="info-value">{traslado.vehiculo.tipo}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Placa:</div>
                <div className="info-value">{traslado.vehiculo.placa}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Color:</div>
                <div className="info-value">
                  <span className="color-swatch" style={{backgroundColor: traslado.vehiculo.color === 'Blanco' ? '#f8f9fa' : 
                                                         traslado.vehiculo.color === 'Gris' ? '#adb5bd' :
                                                         traslado.vehiculo.color === 'Azul' ? '#4dabf7' :
                                                         traslado.vehiculo.color === 'Rojo' ? '#fa5252' :
                                                         traslado.vehiculo.color === 'Negro' ? '#212529' :
                                                         traslado.vehiculo.color === 'Verde' ? '#51cf66' :
                                                         traslado.vehiculo.color === 'Plateado' ? '#dee2e6' : '#f8f9fa'}}></span>
                  {traslado.vehiculo.color}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Capacidad:</div>
                <div className="info-value">{traslado.vehiculo.capacidad}</div>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h2><FaUser className="section-icon" /> Información del Conductor</h2>
            <div className="conductor-info">
              <div className="conductor-avatar">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(traslado.vehiculo.conductor)}&background=random`} alt="Avatar del conductor" />
              </div>
              <div className="conductor-details">
                <div className="info-item">
                  <div className="info-label">Nombre:</div>
                  <div className="info-value">{traslado.vehiculo.conductor}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Teléfono:</div>
                  <div className="info-value">
                    <a href={`tel:${traslado.vehiculo.telefono}`} className="phone-link">
                      <FaPhoneAlt className="phone-icon" /> {traslado.vehiculo.telefono}
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">Contacto de emergencia:</div>
                  <div className="info-value">
                    <a href={`tel:${traslado.contactoEmergencia}`} className="phone-link emergency">
                      <FaPhoneAlt className="phone-icon" /> {traslado.contactoEmergencia}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="info-section materials-section">
            <h2><FaBox className="section-icon" /> Materiales de Mudanza</h2>
            <div className="materials-info">
              <ul className="materials-list">
                {traslado.materiales.map((material, index) => (
                  <li key={index} className="material-item">
                    <span className="material-icon">📦</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado de la lista de traslados
  const renderTrasladosList = () => {
    return (
      <div className="traslado-list-container">
        <div className="traslado-list-header">
          <h1 className="traslado-list-title">Traslados en Curso</h1>
          
          <div className="filter-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar por ID, origen, destino o conductor..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="status-filter">
              <FaFilter className="filter-icon" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="todos">Todos los traslados</option>
                <option value="en-curso">En curso</option>
                <option value="finalizados">Finalizados</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="traslado-stats">
          <div className="stat-item">
            <span className="stat-number">{traslados.length}</span>
            <span className="stat-label">Total de traslados</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{traslados.filter(t => t.progress < 100).length}</span>
            <span className="stat-label">En curso</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{traslados.filter(t => t.progress === 100).length}</span>
            <span className="stat-label">Finalizados</span>
          </div>
        </div>
        
        {filteredTraslados.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No se encontraron traslados</h3>
            <p>Intenta modificar tu búsqueda o filtros</p>
          </div>
        ) : (
          <div className="traslado-list">
            {filteredTraslados.map(traslado => (
              <div 
                key={traslado.id} 
                className={`traslado-card ${traslado.progress === 100 ? 'finished' : 'in-progress'}`}
                onClick={() => setSelectedTrasladoId(traslado.id)}
              >
                <div className="card-header">
                  <h3>{traslado.id}</h3>
                  {traslado.progress === 100 ? (
                    <span className="status-badge complete">Finalizado</span>
                  ) : (
                    <span className="status-badge in-progress">En curso</span>
                  )}
                </div>
                
                <div className="card-body">
                  <div className="truck-info">
                    <FaTruck className="truck-icon" />
                    <span>{traslado.vehiculo.tipo} ({traslado.vehiculo.placa})</span>
                  </div>
                  
                  <div className="route-info">
                    <div className="route-point origin">
                      <FaMapMarkerAlt className="map-icon origin" />
                      <span>{traslado.origen}</span>
                    </div>
                    <div className="route-arrow">→</div>
                    <div className="route-point destination">
                      <FaMapMarkerAlt className="map-icon destination" />
                      <span>{traslado.destino}</span>
                    </div>
                  </div>
                  
                  <div className="card-progress-container">
                    <div className="card-progress-bar" style={{ width: `${traslado.progress}%` }}>
                      <span className="card-progress-text">{traslado.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="conductor-mini">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(traslado.vehiculo.conductor)}&size=32&background=random`} 
                        alt={traslado.vehiculo.conductor} 
                        className="mini-avatar"
                      />
                      <span>{traslado.vehiculo.conductor}</span>
                    </div>
                    <div className="item-count">
                      <FaBox className="box-icon" />
                      <span>{traslado.materiales.length} artículos</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-hover">
                  <span className="view-text">Ver detalles</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Obtener el traslado seleccionado
  const selectedTraslado = selectedTrasladoId 
    ? traslados.find(t => t.id === selectedTrasladoId) 
    : null;

  return (
    <div className="traslado-container">
      {selectedTraslado 
        ? renderTrasladoDetail(selectedTraslado)
        : renderTrasladosList()
      }
    </div>
  );
};

export default TranslafoPage;
