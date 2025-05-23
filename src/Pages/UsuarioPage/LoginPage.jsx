import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../Css/LoginPage.css"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const { signin, cargarDatos, cargarChoferes } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Correo inválido")
            .required("El correo es obligatorio"),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),
    });


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await signin(values);
                await cargarDatos();
                await cargarChoferes();
                navigate("/dasboard/homeda");
            } catch (error) {
                console.error(error);
                alert("Datos incorrectos");
            } finally {
                setLoading(false);
            }

        },
    });


    return (
        <div className="contenedorLogin">
            <div className='contenedorformulario'>
                <h2 className='text-primary'>Iniciar Sesión</h2>
                <form onSubmit={formik.handleSubmit} className='formulario'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && (
                            <div className="text-danger">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Ingresar
                    </button>
                </form>
            </div>
            {loading && (
                <div className='form-gris'>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginPage