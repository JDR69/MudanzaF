import React, { useState } from 'react';
import { Send, Bell, User, Calendar, MessageSquare, Search, Plus, X } from 'lucide-react';

const mockUsuarios = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com' },
  { id: 3, nombre: 'Carlos Medina', email: 'carlos@example.com' },
  { id: 4, nombre: 'María López', email: 'maria@example.com' },
  { id: 5, nombre: 'Pedro Rodríguez', email: 'pedro@example.com' },
];

const mockNotificaciones = [
  {
    id: 1,
    titulo: 'Nueva tarea asignada',
    mensaje: 'Se te ha asignado la tarea de Matemáticas.',
    fecha: '2025-06-01',
    usuario: 'Juan Pérez',
    usuarioId: 1,
    estado: 'enviada'
  },
  {
    id: 2,
    titulo: 'Calificación actualizada',
    mensaje: 'Tu calificación de Literatura ha sido actualizada.',
    fecha: '2025-05-30',
    usuario: 'Ana Gómez',
    usuarioId: 2,
    estado: 'enviada'
  },
  {
    id: 3,
    titulo: 'Reunión programada',
    mensaje: 'Tendrás una reunión con tu tutor el viernes.',
    fecha: '2025-06-02',
    usuario: 'Carlos Medina',
    usuarioId: 3,
    estado: 'enviada'
  },
];

const NotificacionesPage = () => {
  const [vistaActiva, setVistaActiva] = useState('crear');
  const [busqueda, setBusqueda] = useState('');
  const [notificaciones, setNotificaciones] = useState(mockNotificaciones);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado del formulario
  const [formulario, setFormulario] = useState({
    titulo: '',
    mensaje: '',
    fecha: '',
    usuarioId: '',
    usuario: ''
  });

  // Errores del formulario
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formulario.titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio';
    }
    
    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio';
    }
    
    if (!formulario.fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria';
    }
    
    if (!formulario.usuarioId) {
      nuevosErrores.usuarioId = 'Debe seleccionar un usuario';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambioFormulario = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errores[campo]) {
      setErrores(prev => ({
        ...prev,
        [campo]: ''
      }));
    }
  };

  const manejarSeleccionUsuario = (usuario) => {
    setFormulario(prev => ({
      ...prev,
      usuarioId: usuario.id,
      usuario: usuario.nombre
    }));
    if (errores.usuarioId) {
      setErrores(prev => ({ ...prev, usuarioId: '' }));
    }
  };

  const enviarNotificacion = () => {
    if (!validarFormulario()) {
      return;
    }

    const nuevaNotificacion = {
      id: Date.now(),
      titulo: formulario.titulo,
      mensaje: formulario.mensaje,
      fecha: formulario.fecha,
      usuario: formulario.usuario,
      usuarioId: formulario.usuarioId,
      estado: 'enviada'
    };

    setNotificaciones(prev => [nuevaNotificacion, ...prev]);
    
    // Limpiar formulario
    setFormulario({
      titulo: '',
      mensaje: '',
      fecha: '',
      usuarioId: '',
      usuario: ''
    });
    
    setMostrarFormulario(false);
    
    // Mostrar mensaje de éxito
    alert('Notificación enviada correctamente');
  };

  const notificacionesFiltradas = notificaciones.filter((n) =>
    n.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    n.mensaje.toLowerCase().includes(busqueda.toLowerCase()) ||
    n.usuario.toLowerCase().includes(busqueda.toLowerCase())
  );

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  const estilos = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '24px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px'
    },
    tabs: {
      display: 'flex',
      gap: '16px',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '24px'
    },
    tab: {
      padding: '8px 4px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.2s',
      borderBottom: '2px solid transparent'
    },
    tabActive: {
      color: '#2563eb',
      borderBottomColor: '#2563eb'
    },
    tabInactive: {
      color: '#6b7280'
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    buttonPrimary: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    buttonSuccess: {
      backgroundColor: '#16a34a',
      color: 'white'
    },
    buttonCancel: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box'
    },
    inputError: {
      borderColor: '#ef4444'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#2563eb',
      boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)'
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    error: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px'
    },
    userSelector: {
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      padding: '12px'
    },
    userSelectorError: {
      borderColor: '#ef4444'
    },
    selectedUser: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#eff6ff',
      padding: '8px',
      borderRadius: '4px'
    },
    userGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '8px',
      maxHeight: '200px',
      overflowY: 'auto'
    },
    userOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      textAlign: 'left',
      background: 'none',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    searchContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    searchInput: {
      paddingLeft: '40px',
      paddingRight: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    notificationCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      transition: 'box-shadow 0.2s'
    },
    notificationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    notificationTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0'
    },
    statusBadge: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    notificationMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '12px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 0',
      color: '#6b7280'
    }
  };

  return (
    <div style={estilos.container}>
      <div style={estilos.maxWidth}>
        {/* Header */}
        <div style={estilos.card}>
          <h1 style={estilos.header}>
            <Bell color="#2563eb" />
            Sistema de Notificaciones
          </h1>
          
          {/* Tabs */}
          <div style={estilos.tabs}>
            <button
              onClick={() => setVistaActiva('crear')}
              style={{
                ...estilos.tab,
                ...(vistaActiva === 'crear' ? estilos.tabActive : estilos.tabInactive)
              }}
            >
              Crear Notificación
            </button>
            <button
              onClick={() => setVistaActiva('lista')}
              style={{
                ...estilos.tab,
                ...(vistaActiva === 'lista' ? estilos.tabActive : estilos.tabInactive)
              }}
            >
              Notificaciones Enviadas ({notificaciones.length})
            </button>
          </div>
        </div>

        {/* Vista Crear Notificación */}
        {vistaActiva === 'crear' && (
          <div style={estilos.card}>
            <div style={estilos.flexBetween}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                Nueva Notificación
              </h2>
              <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                style={{
                  ...estilos.button,
                  ...(mostrarFormulario ? estilos.buttonCancel : estilos.buttonPrimary)
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = '0.9';
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                {mostrarFormulario ? <X size={20} /> : <Plus size={20} />}
                {mostrarFormulario ? 'Cancelar' : 'Crear Notificación'}
              </button>
            </div>

            {mostrarFormulario && (
              <div style={{ marginTop: '24px' }}>
                <div style={estilos.formGrid}>
                  {/* Título */}
                  <div style={estilos.formGroup}>
                    <label style={estilos.label}>Título *</label>
                    <input
                      type="text"
                      value={formulario.titulo}
                      onChange={(e) => manejarCambioFormulario('titulo', e.target.value)}
                      style={{
                        ...estilos.input,
                        ...(errores.titulo ? estilos.inputError : {})
                      }}
                      placeholder="Ej: Nueva tarea asignada"
                    />
                    {errores.titulo && (
                      <div style={estilos.error}>{errores.titulo}</div>
                    )}
                  </div>

                  {/* Fecha */}
                  <div style={estilos.formGroup}>
                    <label style={estilos.label}>Fecha *</label>
                    <input
                      type="date"
                      value={formulario.fecha}
                      onChange={(e) => manejarCambioFormulario('fecha', e.target.value)}
                      min={obtenerFechaHoy()}
                      style={{
                        ...estilos.input,
                        ...(errores.fecha ? estilos.inputError : {})
                      }}
                    />
                    {errores.fecha && (
                      <div style={estilos.error}>{errores.fecha}</div>
                    )}
                  </div>
                </div>

                {/* Mensaje */}
                <div style={estilos.formGroup}>
                  <label style={estilos.label}>Mensaje *</label>
                  <textarea
                    value={formulario.mensaje}
                    onChange={(e) => manejarCambioFormulario('mensaje', e.target.value)}
                    style={{
                      ...estilos.textarea,
                      ...(errores.mensaje ? estilos.inputError : {})
                    }}
                    placeholder="Escribe el mensaje de la notificación..."
                  />
                  {errores.mensaje && (
                    <div style={estilos.error}>{errores.mensaje}</div>
                  )}
                </div>

                {/* Seleccionar Usuario */}
                <div style={estilos.formGroup}>
                  <label style={estilos.label}>Usuario Destinatario *</label>
                  <div style={{
                    ...estilos.userSelector,
                    ...(errores.usuarioId ? estilos.userSelectorError : {})
                  }}>
                    {formulario.usuario ? (
                      <div style={estilos.selectedUser}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <User color="#2563eb" size={16} />
                          {formulario.usuario}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            manejarCambioFormulario('usuarioId', '');
                            manejarCambioFormulario('usuario', '');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div style={estilos.userGrid}>
                        {mockUsuarios.map((usuario) => (
                          <button
                            key={usuario.id}
                            type="button"
                            onClick={() => manejarSeleccionUsuario(usuario)}
                            style={estilos.userOption}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#f9fafb';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            <User size={16} color="#9ca3af" />
                            <div style={{ textAlign: 'left' }}>
                              <div style={{ fontWeight: '500', fontSize: '14px' }}>
                                {usuario.nombre}
                              </div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                {usuario.email}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errores.usuarioId && (
                    <div style={estilos.error}>{errores.usuarioId}</div>
                  )}
                </div>

                {/* Botón de envío */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={enviarNotificacion}
                    style={{
                      ...estilos.button,
                      ...estilos.buttonSuccess
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#15803d';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#16a34a';
                    }}
                  >
                    <Send size={20} />
                    Enviar Notificación
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Vista Lista de Notificaciones */}
        {vistaActiva === 'lista' && (
          <div style={estilos.card}>
            <div style={estilos.flexBetween}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                Notificaciones Enviadas
              </h2>
              <div style={estilos.searchContainer}>
                <Search style={estilos.searchIcon} size={20} />
                <input
                  type="text"
                  style={estilos.searchInput}
                  placeholder="Buscar notificación..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div>
              {notificacionesFiltradas.length > 0 ? (
                notificacionesFiltradas.map((n) => (
                  <div 
                    key={n.id} 
                    style={estilos.notificationCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={estilos.notificationHeader}>
                      <h3 style={estilos.notificationTitle}>{n.titulo}</h3>
                      <span style={estilos.statusBadge}>
                        {n.estado}
                      </span>
                    </div>
                    
                    <p style={{ color: '#374151', margin: '0 0 12px 0' }}>{n.mensaje}</p>
                    
                    <div style={estilos.notificationMeta}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={16} />
                        {new Date(n.fecha).toLocaleDateString('es-ES')}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={16} />
                        {n.usuario}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={estilos.emptyState}>
                  <MessageSquare size={48} color="#9ca3af" style={{ marginBottom: '16px' }} />
                  <p>No se encontraron notificaciones.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificacionesPage;