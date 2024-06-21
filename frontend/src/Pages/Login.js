import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { passwordHashed, updateTheme } from '../Utils';
import i18n from '../i18n';

const Login = (props) => {

    // General configuration
    const { t } = useTranslation();
    const handleLanguageChange = (newLanguage) => {
        i18n.changeLanguage(newLanguage);
    };

    const handleThemeChange = (mode) => {
        localStorage.setItem('theme', mode);
    
        const themeButtons = document.querySelectorAll('.theme-btn-group button');
        themeButtons.forEach(btn => {
            btn.classList.remove('btn-primary', 'btn-danger');
            btn.classList.add('btn-secondary');
        });
    
        const activeBtn = document.querySelector(`.theme-btn-group button[data-mode="${mode}"]`);
        activeBtn.classList.remove('btn-secondary');
        activeBtn.classList.add(mode === 'light' ? 'btn-primary' : 'btn-danger');
        updateTheme()
    };
    
    // Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    /* Hash logic:
    1) Receive user input
    2) Pass username to the database (usernname should already exist in the database)
    3) Receive data from the API (username + salt + password_hashed)
    4) Retrieve password given by user. Do salt + password on ReactJS (passwordHashed func)
    5) passwordHashed is done. Compare secondHash with password_hashed (db)
    6) If password_hashed == secondHash, then login is successful. Else, login fails. */

    // Backend function when clicking the login button
    const handleSubmit = (e) => {
        e.preventDefault();

        // Set empty initial values for errors 
        setUsernameError("");
        setPasswordError("");

        // Check if user passed an username
        if ("" === username) {
            setUsernameError(t('login.usernameError'));
            return;
        }
        // Check if user passed a password
        if ("" === password) {
            setPasswordError(t('login.passwordError'));
            return;
        }
        // Message for short password
        if (password.length < 4) {
            setPasswordError(t('login.shortPasswordError'));
            return;
        }
        // Verify if the account exists
        logIn();
    }

    const [notExpire, SetNotExpire] = useState(false);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;

        SetNotExpire(isChecked);
    };


    // Call to the API (logging of the user)
    const logIn = () => {
        const url_api = `https://dduhalde.online/.netlify/functions/api/login/${username}`;
        const url_api_token = `https://dduhalde.online/.netlify/functions/api/token/${username}/${notExpire}`;
        fetch(url_api)
            .then(response => response.json())
            .then(data => {
                // There's data retrieved (non-null)
                if (data[0] != null) {
                    const salt = data[0].password_salt;
                    const password_hashed = data[0].password_hashed;
                    const password_hashed_input = passwordHashed(password, salt);
                    const tower_id_associated = data[0].tower_id_associated;
                    const apartment_id_associated = data[0].apartment_id_associated;
                    const user_role = data[0].user_role;
                    const person_id = data[0].person_id;

                    if (password_hashed === password_hashed_input) {
                        fetch(url_api_token) // Retrieve the token from the specific API
                            .then(response => response.json())
                            .then(data2 => {
                                // If login is successful, save token into the localStorage of the browser
                                localStorage.setItem('token', data2.token)

                                localStorage.setItem('tower_id_associated', tower_id_associated);
                                localStorage.setItem('apartment_id_associated', apartment_id_associated);
                                localStorage.setItem('user_role', user_role);
                                localStorage.setItem('person_id', person_id);
                                console.log(user_role)
                                if (user_role === 2) {
                                    fetch(`https://dduhalde.online/.netlify/functions/api/gettowerinfo/${tower_id_associated}`)
                                    .then(response => response.json())
                                    .then(data3 => {
                                        localStorage.setItem('parking_spot_ammount', data3[0].parking_spot_ammount);
                                        localStorage.setItem('parking_limit_time', data3[0].parking_limit_time);
                                        localStorage.setItem('parking_time_window', data3[0].parking_time_window);
                                    })
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching token data:', error);
                            });
                        // If login is successful, redirect user to main page
                        setTimeout(() => {
                            navigate('/home'); //Timeout for time to charge
                        }, 1000);
                    } else {
                        // If passwords do not match, show an error message
                        setPasswordError(t('login.passwordMissmatchError'));
                    }
                } else {
                    // If user does not exist, show an error message
                    setUsernameError(t('login.usernameNotFoundError'));
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Show generic message for API error
                setPasswordError(t('login.apiError'));
            });
    }

    // For eventual logout
    // localStorage.removeItem('token')
    return (
        <div id="change" className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                        <h2 className="card-title text-center">
                        <div className="d-flex justify-content-between align-items-center mb-0 pb-0">
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className={`btn ${i18n.language === 'es' ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}`}
                                    onClick={() => handleLanguageChange('es')}
                                >
                                    ESP
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${i18n.language === 'en' ? 'btn-danger btn-sm' : 'btn-secondary btn-sm'}`}
                                    onClick={() => handleLanguageChange('en')}
                                >
                                    EN
                                </button>
                            </div>
                            <div className="btn-group theme-btn-group" role="group">
                                <button
                                    type="button"
                                    className={`btn btn-sm ${localStorage.getItem('theme') === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleThemeChange('light')}
                                    data-mode="light"
                                >
                                    ☀️
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${localStorage.getItem('theme') === 'dark' ? 'btn-danger' : 'btn-secondary'}`}
                                    onClick={() => handleThemeChange('dark')}
                                    data-mode="dark"
                                >
                                    🌕
                                </button>
                            </div>
                        </div>
                            <div className="text-center mt-0 pt-0 pb-3">
                                <span>{t('login.title')}</span>
                            </div>
                        </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" value={username} placeholder={t('login.usernamePlaceholder')} onChange={(ev) => setUsername(ev.target.value)} /> 
                                    {usernameError && <div className="text-danger">{usernameError}</div>}
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder={t('login.passwordPlaceholder')} onChange={(ev) => setPassword(ev.target.value)} />
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={notExpire} onChange={handleCheckboxChange}/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">{t('login.loggedin')}</label>
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
