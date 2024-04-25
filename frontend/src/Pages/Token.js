import React from 'react';
import Login from './Login.js'
import Home from './Home.js'

function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
let tokenExistAndStillValid = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
console.log(tokenExistAndStillValid)

const Token = () => {
    return (
        // si esta logged in tira al home, si esta logged off tira a login
        <>{tokenExistAndStillValid ? <Home /> : <Login /> }</>
    );
}

export default Token;