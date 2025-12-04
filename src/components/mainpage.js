import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Mainpage({ setAuth }) {
    const [Search, setSeatch] = useState('')
    const [UserMovieList, setUserMovieList] = useState([])
    const [MovieList, setMovieList] = useState([])

    const navigate = useNavigate();

    function logOut() {
        Cookies.remove('Authorization');
        Cookies.remove('ID')
        setAuth(false);
        navigate("/");
    }

    function featchUserWatchList() {
        console.log(Cookies.get('ID'))
        fetch(`http://localhost:8000/UserMovieList/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => {
                setUserMovieList([data.user])
            })
    }

    function featchMovieList() {
        console.log(Cookies.get('ID'))
        fetch(`http://localhost:8000/MovieList/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => {
                setMovieList([data.user])
            })
    }

    useEffect(() => {
        featchUserWatchList()
        featchMovieList()
    }, [])
    return (<div>
        <header>
            <a href='/home'>
                <img src="WatchBoxLogo.png" height="125px" alt='LogoWatchBox' />
            </a>
            <input type='button' value="Dodaj Film" />
            <input type='button' value="Wyloguj" onClick={logOut} />
        </header>
        <main>
            <input type='text' value={Search} onChange={x => setSeatch(x.target.value)} />{/*zaokroglony */}
            <input type='button' value="Szukaj" />

            <h2>Twoja Lista Filmów</h2>
            <div>
                {UserMovieList.map(x => (<div>
                    <img src={'/' + x.Img} alt={x.img} height="300px" />
                    <h3>{x.Title}</h3>
                    <h4>{x.Name}</h4>
                    <p>{x.Description}</p>
                    <input/>
                </div>))}
            </div>
            <h2>Dodaj nowy Film!</h2>
            <div>
                {MovieList.map(x => (<div>
                    <img src={'/' + x.Img} alt={x.img} height="300px" />
                    <h3>{x.Title}</h3>
                    <h4>{x.Name}</h4>
                    <p>{x.Description}</p>
                </div>))}
            </div>
        </main>
        <footer>
            <h6>©2025 WatchBox All Rights Reserved.</h6>
        </footer>
    </div>)
}

export default Mainpage;