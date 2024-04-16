import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = (props) => {
    const { t } = useTranslation(); // Usa useTranslation para acceder a las traducciones
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError(t('login.emailError')) // Usa la traducción para el mensaje de error de email
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError(t('login.invalidEmailError')) // Usa la traducción para el mensaje de error de email inválido
            return
        }

        if ("" === password) {
            setPasswordError(t('login.passwordError')) // Usa la traducción para el mensaje de error de contraseña
            return
        }

        if (password.length < 8) {
            setPasswordError(t('login.shortPasswordError')) // Usa la traducción para el mensaje de error de contraseña corta
            return
        }

        // Check if email has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm(t('login.accountNotExistConfirm', { email }))) { // Usa la traducción para el mensaje de confirmación de cuenta inexistente
                    logIn()
                }
        })        
  

    }

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email})
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
    }

    // Log in a user using email and password
    const logIn = () => {
        fetch("http://localhost:3080/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/")
            } else {
                window.alert(t('login.wrongCredentialsAlert')) // Usa la traducción para el mensaje de alerta de credenciales incorrectas
            }
        })
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>{t('login.title')}</div> {/* Usa la traducción para el título */}
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder={t('login.emailPlaceholder')} // Usa la traducción para el placeholder del email
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder={t('login.passwordPlaceholder')} // Usa la traducción para el placeholder de la contraseña
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={t('login.loginButton')} /> {/* Usa la traducción para el texto del botón de iniciar sesión */}
        </div>
    </div>
}

export default Login;
