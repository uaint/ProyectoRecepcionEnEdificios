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
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>{t('home.welcome')}</div>
            </div>
            <div>
                {t('home.homePage')}
            </div>
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? t('home.logInOut.loggedIn') : t('home.logInOut.loggedOut')} />
                {(loggedIn ? <div>
                    {t('home.emailAddress', { email })}
                </div> : <div/>)}
            </div>
        </div>
    );
}

export default Home;
