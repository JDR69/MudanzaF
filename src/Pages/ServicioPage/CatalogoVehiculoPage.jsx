import React, { useState } from 'react';
import { Truck, Filter, Star, CheckCircle, XCircle, Eye, Search, MapPin, Calendar, Users } from 'lucide-react';

const CatalogoVehiculoPage = () => {
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('todos');
    const [busqueda, setBusqueda] = useState('');
    const [vistaDetalle, setVistaDetalle] = useState(null);

    const categorias = [
        { value: 'todos', label: 'Todos los vehículos', icon: '🚛' },
        { value: 'furgoneta', label: 'Furgoneta cerrada', icon: '🚐' },
        { value: 'camion35', label: 'Camión de 3.5 toneladas', icon: '🚚' },
        { value: 'camion58', label: 'Camión de 5-8 toneladas', icon: '🚛' },
        { value: 'torton', label: 'Camión tipo "torton"', icon: '🚜' },
        { value: 'trailer', label: 'Trailer o tractocamión con caja seca', icon: '🚙' },
        { value: 'plataforma', label: 'Camiones de plataforma', icon: '🛻' },
    ];

    const vehiculos = [
        {
            id: 1,
            nombre: 'Toyota Hiace',
            descripcion: 'Furgoneta perfecta para mudanzas de apartamentos pequeños y oficinas. Ideal para transportar cajas, muebles ligeros y electrodomésticos',
            tipo: 'furgoneta',
            capacidad: '1.5 toneladas',
            combustible: 'Diésel',
            año: 2022,
            disponible: true,
            precio: '$50/día',
            ubicacion: 'Santa Cruz Centro',
            img: [
                { id: 1, url: 'https://carga.com.co/wp-content/uploads/2020/01/SERVICIOS-TRANSPORTE-TERRESTRE-scaled.jpg' },
                { id: 2, url: 'https://th.bing.com/th/id/OIP.DZzhHi71FbDOGPkd9s176gHaEQ?w=840&h=483&rs=1&pid=ImgDetMain' },
            ],
            caracteristicas: ['Aire acondicionado', 'GPS', 'Protección para muebles incluida']
        },
        {
            id: 2,
            nombre: 'RAM ProMaster',
            descripcion: 'Camión ideal para mudanzas familiares completas. Perfecto para transportar muebles de sala, dormitorios y enseres del hogar',
            tipo: 'camion35',
            capacidad: '3.5 toneladas',
            combustible: 'Diésel',
            año: 2023,
            disponible: true,
            precio: '$75/día',
            ubicacion: 'Plan 3000',
            img: [
                { id: 1, url: 'https://th.bing.com/th/id/OIP.Izk2ThkVhZkIsQtUanCDDgHaFq?rs=1&pid=ImgDetMain' },
                { id: 2, url: 'https://th.bing.com/th/id/OIP.9P13DfzRvYYbVGoSUKee4AHaFj?rs=1&pid=ImgDetMain' },
            ],
            caracteristicas: ['Rampa de carga', 'Plataforma elevadora', 'Correas de sujeción incluidas']
        },
        {
            id: 3,
            nombre: 'Ford F-450',
            descripcion: 'Camión robusto para mudanzas de casas grandes o traslados comerciales. Capacidad para muebles pesados y electrodomésticos grandes',
            tipo: 'camion58',
            capacidad: '6 toneladas',
            combustible: 'Diésel',
            año: 2021,
            disponible: false,
            precio: '$120/día',
            ubicacion: 'Equipetrol',
            img: [
                { id: 1, url: 'https://th.bing.com/th/id/OIP.3FF1VRwLj8y838ZL7MPfEgHaHa?rs=1&pid=ImgDetMain' },
                { id: 2, url: 'https://i.pinimg.com/736x/b8/cc/55/b8cc550afdb8776582e5fb3455ff816b.jpg' },
            ],
            caracteristicas: ['Cabina amplia para ayudantes', 'Sistema de poleas', 'Caja cerrada para protección']
        },
        {
            id: 4,
            nombre: 'Mercedes Actros',
            descripcion: 'Camión de gran capacidad para mudanzas industriales y traslados masivos. Perfecto para oficinas completas y almacenes',
            tipo: 'torton',
            capacidad: '12 toneladas',
            combustible: 'Diésel',
            año: 2022,
            disponible: true,
            precio: '$180/día',
            ubicacion: 'Parque Industrial',
            img: [
                { id: 1, url: 'https://th.bing.com/th/id/OIP.3FF1VRwLj8y838ZL7MPfEgHaHa?rs=1&pid=ImgDetMain' },
                { id: 2, url: 'https://i.pinimg.com/736x/b8/cc/55/b8cc550afdb8776582e5fb3455ff816b.jpg' },
            ],
            caracteristicas: ['Caja hermética', 'Sistema antivibración', 'Control de clima para objetos delicados']
        },
        {
            id: 5,
            nombre: 'Volvo FH16',
            descripcion: 'Tractocamión especializado para mudanzas interestatales y traslados de larga distancia. Máxima seguridad para sus pertenencias',
            tipo: 'trailer',
            capacidad: '40 toneladas',
            combustible: 'Diésel',
            año: 2023,
            disponible: true,
            precio: '$250/día',
            ubicacion: 'Terminal de Cargas',
            img: [
                { id: 1, url: 'https://th.bing.com/th/id/OIP.Izk2ThkVhZkIsQtUanCDDgHaFq?rs=1&pid=ImgDetMain' },
                { id: 2, url: 'https://th.bing.com/th/id/OIP.9P13DfzRvYYbVGoSUKee4AHaFj?rs=1&pid=ImgDetMain' },
            ],
            caracteristicas: ['Contenedor sellado de 53 pies', 'Rastreo GPS en tiempo real', 'Suspensión neumática para objetos frágiles']
        },
        {
            id: 6,
            nombre: 'Scania R-Series',
            descripción: 'Camión de plataforma para mudanzas especiales con muebles grandes, pianos, cajas fuertes y objetos de dimensiones excepcionales',
            tipo: 'plataforma',
            capacidad: '25 toneladas',
            combustible: 'Diésel',
            año: 2022,
            disponible: true,
            precio: '$200/día',
            ubicacion: 'Zona Industrial',
            img: [
                { id: 1, url: 'https://carga.com.co/wp-content/uploads/2020/01/SERVICIOS-TRANSPORTE-TERRESTRE-scaled.jpg' },
                { id: 2, url: 'https://th.bing.com/th/id/OIP.DZzhHi71FbDOGPkd9s176gHaEQ?w=840&h=483&rs=1&pid=ImgDetMain' },
            ],
            caracteristicas: ['Plataforma adaptable', 'Grúa para objetos pesados', 'Sistema de amarre profesional']
        },
    ];
    const vehiculosFiltrados = vehiculos.filter(vehiculo => {
        const coincideCategoria = vehiculoSeleccionado === 'todos' || vehiculo.tipo === vehiculoSeleccionado;
        const coincideBusqueda = vehiculo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                               vehiculo.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    const abrirDetalle = (vehiculo) => {
        setVistaDetalle(vehiculo);
    };

    const cerrarDetalle = () => {
        setVistaDetalle(null);
    };

    const estilos = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: 'Arial, sans-serif'
        },
        hero: {
            position: 'relative',
            height: '400px',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            marginBottom: '2rem'
        },
        heroContent: {
            zIndex: 2,
            maxWidth: '800px',
            padding: '0 2rem'
        },
        heroTitle: {
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        },
        heroSubtitle: {
            fontSize: '1.2rem',
            marginBottom: '1rem',
            opacity: 0.9
        },
        stars: {
            fontSize: '1.5rem',
            marginBottom: '1rem'
        },
        content: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
        },
        controls: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        },
        controlsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'end'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        select: {
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            transition: 'border-color 0.2s',
            backgroundColor: 'white'
        },
        searchInput: {
            padding: '0.75rem',
            paddingLeft: '2.5rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            transition: 'border-color 0.2s'
        },
        searchContainer: {
            position: 'relative'
        },
        searchIcon: {
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
        },
        sectionTitle: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        vehicleGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
        },
        vehicleCard: {
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer'
        },
        vehicleCardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        },
        vehicleImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            backgroundColor: '#f3f4f6'
        },
        vehicleContent: {
            padding: '1.5rem'
        },
        vehicleHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem'
        },
        vehicleName: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
        },
        vehiclePrice: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#059669',
            backgroundColor: '#d1fae5',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px'
        },
        vehicleDescription: {
            color: '#6b7280',
            marginBottom: '1rem',
            lineHeight: '1.5'
        },
        vehicleSpecs: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem',
            marginBottom: '1rem'
        },
        spec: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: '#374151'
        },
        statusBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '1rem'
        },
        available: {
            backgroundColor: '#d1fae5',
            color: '#065f46'
        },
        unavailable: {
            backgroundColor: '#fee2e2',
            color: '#991b1b'
        },
        actionButtons: {
            display: 'flex',
            gap: '0.5rem'
        },
        button: {
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        primaryButton: {
            backgroundColor: '#2563eb',
            color: 'white',
            flex: 1
        },
        secondaryButton: {
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db'
        },
        modal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        },
        modalContent: {
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
        },
        modalHeader: {
            padding: '2rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        modalBody: {
            padding: '2rem'
        },
        imageGallery: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
        },
        galleryImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '8px'
        },
        featureList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.5rem',
            marginTop: '1rem'
        },
        feature: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '6px',
            fontSize: '0.9rem'
        },
        emptyState: {
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#6b7280'
        }
    };

    return (
        <div style={estilos.container}>
            {/* Hero Section */}
            <div style={estilos.hero}>
                <div style={estilos.heroContent}>
                    <h1 style={estilos.heroTitle}>Catálogo de Vehículos</h1>
                    <p style={estilos.heroSubtitle}>
                        Encuentra el vehículo perfecto para tu negocio
                    </p>
                    <div style={estilos.stars}>⭐⭐⭐⭐⭐</div>
                    <p>La mejor flota de transporte de Bolivia</p>
                </div>
            </div>

            <div style={estilos.content}>
                {/* Controles */}
                <div style={estilos.controls}>
                    <div style={estilos.controlsGrid}>
                        <div style={estilos.formGroup}>
                            <label style={estilos.label}>
                                <Filter size={16} />
                                Filtrar por categoría
                            </label>
                            <select
                                style={estilos.select}
                                value={vehiculoSeleccionado}
                                onChange={(e) => setVehiculoSeleccionado(e.target.value)}
                            >
                                {categorias.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.icon} {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div style={estilos.formGroup}>
                            <label style={estilos.label}>
                                <Search size={16} />
                                Buscar vehículo
                            </label>
                            <div style={estilos.searchContainer}>
                                <Search style={estilos.searchIcon} size={20} />
                                <input
                                    type="text"
                                    style={estilos.searchInput}
                                    placeholder="Buscar por nombre o descripción..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Título de sección */}
                <h2 style={estilos.sectionTitle}>
                    <Truck size={28} />
                    {categorias.find((cat) => cat.value === vehiculoSeleccionado)?.label}
                    <span style={{ 
                        fontSize: '1rem', 
                        fontWeight: 'normal', 
                        color: '#6b7280',
                        marginLeft: '1rem'
                    }}>
                        ({vehiculosFiltrados.length} vehículos)
                    </span>
                </h2>

                {/* Grid de vehículos */}
                {vehiculosFiltrados.length > 0 ? (
                    <div style={estilos.vehicleGrid}>
                        {vehiculosFiltrados.map((vehiculo) => (
                            <div
                                key={vehiculo.id}
                                style={estilos.vehicleCard}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, estilos.vehicleCardHover);
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                }}
                            >
                                <img
                                    src={vehiculo.img[0]?.url || '/placeholder-truck.jpg'}
                                    alt={vehiculo.nombre}
                                    style={estilos.vehicleImage}
                                />
                                
                                <div style={estilos.vehicleContent}>
                                    <div style={estilos.vehicleHeader}>
                                        <h3 style={estilos.vehicleName}>{vehiculo.nombre}</h3>
                                        <span style={estilos.vehiclePrice}>{vehiculo.precio}</span>
                                    </div>
                                    
                                    <p style={estilos.vehicleDescription}>
                                        {vehiculo.descripcion}
                                    </p>
                                    
                                    <div style={estilos.vehicleSpecs}>
                                        <div style={estilos.spec}>
                                            <Truck size={16} />
                                            {vehiculo.capacidad}
                                        </div>
                                        <div style={estilos.spec}>
                                            <Calendar size={16} />
                                            {vehiculo.año}
                                        </div>
                                        <div style={estilos.spec}>
                                            <MapPin size={16} />
                                            {vehiculo.ubicacion}
                                        </div>
                                        <div style={estilos.spec}>
                                            ⛽ {vehiculo.combustible}
                                        </div>
                                    </div>
                                    
                                    <div style={{
                                        ...estilos.statusBadge,
                                        ...(vehiculo.disponible ? estilos.available : estilos.unavailable)
                                    }}>
                                        {vehiculo.disponible ? (
                                            <><CheckCircle size={16} /> Disponible</>
                                        ) : (
                                            <><XCircle size={16} /> No Disponible</>
                                        )}
                                    </div>
                                    
                                    <div style={estilos.actionButtons}>
                                        <button
                                            style={{...estilos.button, ...estilos.secondaryButton}}
                                            onClick={() => abrirDetalle(vehiculo)}
                                        >
                                            <Eye size={16} />
                                            Ver Detalles
                                        </button>
                                        <button
                                            style={{
                                                ...estilos.button,
                                                ...estilos.primaryButton,
                                                opacity: vehiculo.disponible ? 1 : 0.6,
                                                cursor: vehiculo.disponible ? 'pointer' : 'not-allowed'
                                            }}
                                            disabled={!vehiculo.disponible}
                                        >
                                            {vehiculo.disponible ? '📋 Solicitar' : '❌ No Disponible'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={estilos.emptyState}>
                        <Truck size={64} color="#d1d5db" />
                        <h3>No se encontraron vehículos</h3>
                        <p>Intenta cambiar los filtros de búsqueda</p>
                    </div>
                )}
            </div>

            {/* Modal de detalle */}
            {vistaDetalle && (
                <div style={estilos.modal} onClick={cerrarDetalle}>
                    <div style={estilos.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={estilos.modalHeader}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                                {vistaDetalle.nombre}
                            </h2>
                            <button
                                onClick={cerrarDetalle}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#6b7280'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div style={estilos.modalBody}>
                            <div style={estilos.imageGallery}>
                                {vistaDetalle.img.map((imagen) => (
                                    <img
                                        key={imagen.id}
                                        src={imagen.url}
                                        alt={`${vistaDetalle.nombre} ${imagen.id}`}
                                        style={estilos.galleryImage}
                                    />
                                ))}
                            </div>
                            
                            <h3>Descripción</h3>
                            <p>{vistaDetalle.descripcion}</p>
                            
                            <h3>Especificaciones</h3>
                            <div style={estilos.vehicleSpecs}>
                                <div style={estilos.spec}>
                                    <strong>Capacidad:</strong> {vistaDetalle.capacidad}
                                </div>
                                <div style={estilos.spec}>
                                    <strong>Combustible:</strong> {vistaDetalle.combustible}
                                </div>
                                <div style={estilos.spec}>
                                    <strong>Año:</strong> {vistaDetalle.año}
                                </div>
                                <div style={estilos.spec}>
                                    <strong>Ubicación:</strong> {vistaDetalle.ubicacion}
                                </div>
                            </div>
                            
                            {vistaDetalle.caracteristicas && (
                                <>
                                    <h3>Características</h3>
                                    <div style={estilos.featureList}>
                                        {vistaDetalle.caracteristicas.map((caracteristica, index) => (
                                            <div key={index} style={estilos.feature}>
                                                <CheckCircle size={16} color="#059669" />
                                                {caracteristica}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CatalogoVehiculoPage;