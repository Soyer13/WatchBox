import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link ,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';


function Mainpage({ setAuth }){

    const navigate = useNavigate();
     function logOut() {
        Cookies.remove('Authorization'); 
        Cookies.remove('ID')
        setAuth(false);                 
        navigate("/");                  
    }
    return(<div>
        <h1>Mainpage</h1>
        <input type='button' value="wyloguj" onClick={logOut}/>
        </div>)
}

export default Mainpage;