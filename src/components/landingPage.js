import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LandingPage({ setAuth }){

    const navigate = useNavigate();
     function login() {                
        navigate("/login");                  
    }
    return(<div>
        <h1>LandingPage</h1>
        <input type='button' value="zaloguj" onClick={login}/>
        </div>)
}

export default LandingPage;