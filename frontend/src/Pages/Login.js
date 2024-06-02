import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { passwordHashed } from '../Utils';

const Login = (props) => {
    const { t } = useTranslation(); // useTranslation: Access translations (EN & ES)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate(); // Redirect the user

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
        console.log(isChecked)
        SetNotExpire(isChecked);
    };


    // Call to the API (logging of the user)
    const logIn = () => {
        const url_api = `https://dduhalde.online/.netlify/functions/api/login/${username}`;
        const url_api_token = `https://dduhalde.online/.netlify/functions/api/token/${username}/${notExpire}`;
        console.log(url_api_token)
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

                    if (password_hashed === password_hashed_input) {
                        fetch(url_api_token) // Retrieve the token from the specific API
                            .then(response => response.json())
                            .then(data2 => {
                                console.log(data.token) // TEST TOKEN
                                // If login is successful, save token into the localStorage of the browser
                                localStorage.setItem('token', data2.token)

                                sessionStorage.setItem('tower_id_associated', tower_id_associated);
                                sessionStorage.setItem('apartment_id_associated', apartment_id_associated);
                                sessionStorage.setItem('user_role', user_role);
                                
                            })
                            .catch(error => {
                                console.error('Error fetching token data:', error);
                            });
                        // If login is successful, redirect user to main page
                        navigate('/admincorrespondence');
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
                            <h2 className="card-title text-center">{t('login.title')}</h2>
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
