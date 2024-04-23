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
        
    const handleSubmit = () => {

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

return (
    <div id="change" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{t('login.title')}</h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">{t('login.emailPlaceholder')}</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} placeholder={t('login.emailPlaceholder')} onChange={ev => setEmail(ev.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">{t('login.passwordPlaceholder')}</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" value={password} placeholder={t('login.passwordPlaceholder')} onChange={ev => setPassword(ev.target.value)}/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">{t('login.remember')}</label>
                </div>
                <div class="d-grid gap-1">
                    <button type="submit" class="btn btn-primary">{t('login.loginButton')}</button>
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
