import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ setAuth }){
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
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
return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">

            <header className="bg-white d-flex align-items-center p-3">
                <a href='/home'>
                    <img src="WatchBoxLogo.png" height="80px" alt='LogoWatchBox' />
                </a>
            </header>

            <main className="flex-fill d-flex justify-content-center align-items-center p-4">
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <h1 className="mb-4 text-center">Logowanie</h1>
                    <form 
                        className="d-flex flex-column gap-3"
                    >
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <input
                                id="login"
                                type='text'
                                className="form-control rounded"
                                placeholder="Wpisz login"
                                value={login}
                                onChange={x => setLogin(x.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Hasło</label>
                            <input
                                id="password"
                                type='password'
                                className="form-control rounded"
                                placeholder="Wpisz hasło"
                                value={password}
                                onChange={x => setPassword(x.target.value)}
                            />
                        </div>

                        
                        <input type='button' value="Zaloguj"className="btn btn-danger mt-2" onClick={logIn}/>
                    </form>
                </div>
            </main>

            <footer className="bg-white text-dark text-center py-3 mt-auto">
                <h6>©2025 WatchBox All Rights Reserved.</h6>
            </footer>
        </div>
    );
}

export default Login;