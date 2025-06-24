import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './coments.css'
import { regComentario,obtenerComentarios } from '../../api/auth'
const Testimonios = () => {
    const { comentarios } = useAuth()
    const [coments, setComents] = useState(comentarios);
    const [indiceActual, setIndiceActual] = useState(0);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState('');

    const handleEnviarComentario = async () => {
        if (!nuevoComentario.trim()) return;
        try {
            await regComentario({ descripcion: nuevoComentario });
            const comentarionuevos=await obtenerComentarios();
             // Agrega el nuevo comentario al inicio de la lista
            setComents(comentarionuevos.data);
            setMostrarFormulario(false);
            setIndiceActual(0); // opcional: mostrar el nuevo comentario directamente
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        }
    };





    useEffect(() => {
        console.log(comentarios)
        setComents(comentarios)
    }, [comentarios]);

    const avanzar = () => {
        setIndiceActual((prev) => (prev + 1) % coments.length);
    };

    const retroceder = () => {
        setIndiceActual((prev) =>
            prev === 0 ? coments.length - 1 : prev - 1
        );
    };

    if (coments.length === 0) return null; // o un loading...

    const comentarioActual = coments[indiceActual];

    return (
        <div className="testimonials-section">
            <h2>Lo que dicen nuestros clientes</h2>
            <div className="testimonial-container">
                <div className="testimonial">
                    <div className="quote">"{comentarioActual.descripcion}"</div>
                    <div className="author">- {comentarioActual.usuario?.nombre ?? 'Anónimo'}</div>
                    <div className="testimonial-controls">
                        <button onClick={retroceder}>◀</button>
                        <button onClick={avanzar}>▶</button>
                    </div>
                    <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="testimonial-btn">
                        {mostrarFormulario ? 'Cancelar' : 'Añadir comentario'}
                    </button>

                    {mostrarFormulario && (
                        <div className="comentario-formulario">
                            <textarea
                                rows="3"
                                placeholder="Escribe tu comentario aquí..."
                                value={nuevoComentario}
                                onChange={(e) => setNuevoComentario(e.target.value)}
                            />
                            <button onClick={handleEnviarComentario}>Enviar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Testimonios
