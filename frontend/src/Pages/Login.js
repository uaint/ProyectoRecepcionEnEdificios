import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { sha256 } from 'js-sha256';

const Login = (props) => {
    const { t } = useTranslation(); // Usa useTranslation para acceder a las traducciones EN y ES
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate(); // Redireccionar al usuario
        


        // Lógica del hash:
    // Recibir input de usuario
    // Pasarle a la bbdd username (asumiendo que password ya está en bbdd, dado que es un login y no un registro)
    // Recibir dato de la API --> recibir username + salt + password_hashed
    // Tomar password que entregó el usuario y hacer: salt + password en código de React (función generateHash)
    // Se hace generateHash y luego se compara secondHash con password_hashed de la bbdd
    // Si password_hashed = secondHash, login exitoso. Si no, login fallido

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

    

    // Función para generar una contraseña hash utilizando doble SHA-256
    function generateHash(password, salt) {
        const combinedString = salt + password;
        const firstHash = sha256(combinedString);
        const secondHash = sha256(firstHash);
    return secondHash;
    }





    // Llama a la API para logear al usuario con username y contraseña
    const logIn = () => {
        const url_api = `https://dduhalde.online/.netlify/functions/api/login/${username}`;
        const url_api_token = `https://dduhalde.online/.netlify/functions/api/token/${username}`;
        fetch(url_api)
            .then(response => response.json())
            .then(data => {
                if (data[0] != null) {
                    const salt = data[0].salt;
                    const password_hashed = data[0].password_hashed;
                    const password_hashed_input = generateHash(password, salt);
                    if (password_hashed === password_hashed_input) {
                        fetch(url_api_token) // Ahora conseguimos token desde API especifica
                            .then(response => response.json())
                            .then(data2 => {
                                console.log(data.token) // TEST TOKEN
                                // Si el login es exitoso, guarda el token en el localStorage del navegador
                                localStorage.setItem('token', data2.token)
                            })
                            .catch(error => {
                                console.error('Error fetching token data:', error);
                            });
                        // Si el login es exitoso, redirige al usuario a la página principal
                        navigate('/admincorrespondence');
                    } else {
                        // Si contraseñas no calzan, muestra mensaje de discrepancia
                        setPasswordError(t('login.passwordMissmatchError'));
                    }
                } else {
                    // Si usuario no existe, muestra un mensaje de discrepancia
                    setUsernameError(t('login.usernameNotFoundError'));
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Muestra un mensaje de error genérico si hay un problema con la API
                setPasswordError(t('login.apiError'));
            });
    }


    // Para un eventual log out
    // localStorage.removeItem('token')

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
