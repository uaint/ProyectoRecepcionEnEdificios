import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = (props) => {
    const { loggedIn, email } = props;
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log('Idioma detectado:', i18n.language);
    }, []);

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
        } else {
            navigate("/login");
        }
    }

    return (
        <div id="change" className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">{t('home.welcome')}</h2>
                            <h4 className="card-title text-center">{t('home.homePage')}</h4>
                            <div class="d-grid gap-1">
                                <button type="submit" class="btn btn-primary mt-3" onClick={onButtonClick}>{loggedIn ? t('home.logInOut.loggedIn') : t('home.logInOut.loggedOut')}</button>
                                {loggedIn && (
                                    <div>{t('home.emailAddress', { email })}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
