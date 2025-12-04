import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function SingUp({ setAuth }) {

    const navigate = useNavigate();

    const [Name, setName] = useState('')
    const [SurName, setSurname] = useState('')
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')

    function SaveNewUser() {
        fetch(`http://localhost:8000/chkLogin/${Login}`)
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    alert("Ten Login jest już zajęty");
                }
                else {
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



    return (<div>
        <h1>Zarejestrój Się!</h1>
        <form>
            <input type='text' value={Name} onChange={x => setName(x.target.value)} placeholder='Imie' required />
            <input type='text' value={SurName} onChange={x => setSurname(x.target.value)} placeholder='Nazwisko' required />
            <input type='text' value={Login} onChange={x => setLogin(x.target.value)} placeholder='Login/Nazwa Użytkownika' required />
            <input type='password' value={Password} onChange={x => setPassword(x.target.value)} placeholder='Hasło' required />
            <input type='button' value="Stwórz Konto" onClick={SaveNewUser} />
        </form>

    </div>)
}

export default SingUp;