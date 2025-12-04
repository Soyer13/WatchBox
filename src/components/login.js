import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Login({ setAuth }){
    const [login,setLogin] = useState('')
    const [password,setpassword] = useState('')
    const navigate = useNavigate();
    function logIn(e){
        // sprawdzenie czy login i takie chasło jest w bazie danych
        e.preventDefault();
        fetch("http://localhost:8000/login",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({login,password})
        })
        .then(res => res.json())
        .then(result =>{
            if(result.success){
                Cookies.set('Authorization', 'true', { expires: 1 }); 
                Cookies.set('ID',result.Id,{ expires: 1})
                setAuth(true);
                navigate("/home"); 
            }else {
                alert("Złe dane logowania!");
                
            }  
        })
        .catch(err => console.error(err));
    }
return(
    <div>
        <h1>Logowanie</h1>
        <form onSubmit={logIn}>
            <h2>login</h2>
            <input type='text' value={login} onChange={x => setLogin(x.target.value)}/>
            <h2>Hasło</h2>
            <input type='password' value={password} onChange={x => setpassword(x.target.value)}/>
            <input type='submit' onSubmit={logIn} value="zaloguj"/>
        </form>
    </div>
)
}

export default Login;