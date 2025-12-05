import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function SingUp({ setAuth }) {

    const navigate = useNavigate();

    const [Name, setName] = useState('')
    const [SurName, setSurname] = useState('')
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')

    function SaveNewUser() {
        // Sprawdzanie Czy Login Jest już zajęty
        fetch(`http://localhost:8000/chkLogin/${Login}`)
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    alert("Ten Login jest już zajęty");
                }
                else {
                    //Zapisywanie Nowego Użytkownika
                    fetch('http://localhost:8000/signup', {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ Name, SurName, Login, Password })
                    }).then(res => res.json())
                        .then(result => {
                            if (result.success) {
                                Cookies.set('Authorization', 'true', { expires: 1 });
                                Cookies.set('ID', result.Id, { expires: 1 })
                                setAuth(true);
                                navigate("/home");
                            } else {
                                alert("Błąd przy tworzeniu Konta");
                            }
                        })
                        .catch(err => console.error(err));
                }
            }).catch(err => console.error(err));

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
                    <h1 className="mb-4 text-center">Zarejestruj Się!</h1>
                    <form className="d-flex flex-column gap-3" onSubmit={(e) => e.preventDefault()}>

                        <div className="form-group">
                            <label htmlFor="name">Imię</label>
                            <input
                                id="name"
                                type='text'
                                className="form-control rounded"
                                placeholder='Imię'
                                value={Name}
                                onChange={x => setName(x.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="surname">Nazwisko</label>
                            <input
                                id="surname"
                                type='text'
                                className="form-control rounded"
                                placeholder='Nazwisko'
                                value={SurName}
                                onChange={x => setSurname(x.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login">Login / Nazwa Użytkownika</label>
                            <input
                                id="login"
                                type='text'
                                className="form-control rounded"
                                placeholder='Login / Nazwa Użytkownika'
                                value={Login}
                                onChange={x => setLogin(x.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Hasło</label>
                            <input
                                id="password"
                                type='password'
                                className="form-control rounded"
                                placeholder='Hasło'
                                value={Password}
                                onChange={x => setPassword(x.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={SaveNewUser}> Stwórz Konto </button>
                    </form>
                </div>
            </main>

            <footer className="bg-white text-dark text-center py-3 mt-auto">
                <h6>©2025 WatchBox All Rights Reserved.</h6>
            </footer>
        </div>
    );
}

export default SingUp;