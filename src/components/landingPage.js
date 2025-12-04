import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LandingPage({ setAuth }){

    const navigate = useNavigate();
     function login() {                
        navigate("/login");                  
    }

    function signup() {                
        navigate("/singup");                  
    }
    return(<div>
        <h1>LandingPage</h1>
        <input type='button' value="Zaloguj" onClick={login}/>
        <input type='button' value="Zarejestruj Się" onClick={signup}/>
        </div>)
}

export default LandingPage;