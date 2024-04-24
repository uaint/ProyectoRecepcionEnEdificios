import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
    const { t } = useTranslation(); // Usa useTranslation para acceder a las traducciones EN y ES
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate(); // Redireccionar al usuario
        

    // Función del backend al hacer clic en el botón de login
    const handleSubmit = (e) => {
        e.preventDefault();

        // Determinamos valores iniciales de errores vacíos
        setUsernameError("");
        setPasswordError("");

        // Checkear si usuario ingresó un username
        if ("" === username) {
            setUsernameError(t('login.usernameError'));
            return;
        }
        // Checkear si usuario ingresó una contraseña
        if ("" === password) {
            setPasswordError(t('login.passwordError'));
            return;
        }
        // Mensaje para contraseña corta
        if (password.length < 4) {
            setPasswordError(t('login.shortPasswordError'));
            return;
        }
        // Verificar si la cuenta existe
        logIn();
    }


    // Llama a la API para logear al usuario con username y contraseña
    const logIn = () => {
        const url_api = `https://dduhalde.online/.netlify/functions/api/login/${username}/${password}`;
        fetch(url_api)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Si el login es exitoso, redirige al usuario a la página principal
                    navigate('/home');
                } else {
                    // Si hay un problema con el login, muestra un mensaje de error
                    setPasswordError(t('login.loginError'));
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Muestra un mensaje de error genérico si hay un problema con la API
                setPasswordError(t('login.apiError'));
            });
    }

    return (
        <div id="change" className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">{t('login.title')}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUsername" className="form-label">{t('login.usernamePlaceholder')}</label>
                                    <input type="text" className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" value={username} placeholder={t('login.usernamePlaceholder')} onChange={(ev) => setUsername(ev.target.value)} /> 
                                    {usernameError && <div className="text-danger">{usernameError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">{t('login.passwordPlaceholder')}</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder={t('login.passwordPlaceholder')} onChange={(ev) => setPassword(ev.target.value)} />
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">{t('login.remember')}</label>
                                </div>
                                <div className="d-grid gap-1">
                                    <button type="submit" className="btn btn-primary">{t('login.loginButton')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
