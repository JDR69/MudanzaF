import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/ContraseñaPage.css';

function ContraseñaPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='contraseñaConteiner1'>
            <div className='contraseñaConteiner'>
                <h1>Recuperación de Contraseña</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="ContraseñaNueva" className="form-label">Contraseña Nueva</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="ContraseñaNueva"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <div id="ContraseñaNuevaHelp" className="form-text">8 - 20 Caracteres.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="RepetirContraseña" className="form-label">Repetir Contraseña Nueva</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="RepetirContraseña"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPasswordCheck"
                            checked={showPassword}
                            onChange={handleShowPassword}
                        />
                        <label className="form-check-label" htmlFor="showPasswordCheck">Mostrar Contraseña</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Contraseña Lista</button>
                </form>
            </div>
        </div>
    );
}

export default ContraseñaPage;