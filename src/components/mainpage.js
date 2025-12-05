import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        fetch(`http://localhost:8000/UserMovieList/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.user)
                setUserMovieList(data.user || [])
                console.log(UserMovieList)
            })
    }

    function featchMovieList() {
        fetch(`http://localhost:8000/MovieList/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => {
                setMovieList(data.user || [])
            })
    }

    useEffect(() => {
        featchUserWatchList()
        featchMovieList()
    }, [])

    function DeleteFromUserMovieList(MovieId, UserId) {
        fetch("http://localhost:8000/DeleteFromUserMovieList", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ UserId, MovieId })
        })
    }

    function AddToUserMovieList(MovieId, UserId) {
        fetch("http://localhost:8000/AddFromUserMovieList", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ UserId, MovieId })
        })
    }

    function SearchMovies() {
        Cookies.set('Search', Search, { expires: 0.2 })
        navigate("/search")
    }
    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">

            <header className="bg-white d-flex justify-content-between align-items-center p-3">
                <a href='/home'>
                    <img src="WatchBoxLogo.png" height="80" alt='LogoWatchBox' />
                </a>
                <div className="d-flex gap-2">
                    <button className="btn btn-dark text-white" onClick={() => navigate('/addnew')}>Dodaj Film</button>
                    <button className="btn btn-dark text-white" onClick={logOut}>Wyloguj</button>
                </div>
            </header>


            <main className="flex-fill p-4">
                <div className="d-flex mb-4">
                    <input
                        type='text'  value={Search}  onChange={x => setSeatch(x.target.value)}  placeholder='Wyszukaj Film'  className="form-control rounded-start me-2" style={{ borderRadius: '0.5rem 0 0 0.5rem', maxWidth: '300px' }}/>
                    <button className="btn btn-danger rounded-end" onClick={SearchMovies}> Szukaj </button>
                </div>

                {UserMovieList.length > 0 && (
                    <>
                        <h2 className="mb-3">Twoja Lista Filmów</h2>
                        <div className="row g-3">
                            {UserMovieList.map(x => (
                                <div key={x.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="card bg-secondary text-light h-100">
                                        <img src={'/' + x.Img} className="card-img-top" alt={x.Title} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{x.Title}</h5>
                                            <h6 className="card-subtitle mb-2">{x.Name}</h6>
                                            <p className="card-text">{x.Description}</p>
                                            <button className="btn btn-danger mt-auto" onClick={() => DeleteFromUserMovieList(x.id, Cookies.get('ID'))}> Usuń</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {MovieList.length > 0 && (
                    <>
                        <h2 className="mt-5 mb-3">Dodaj nowy Film!</h2>
                        <div className="row g-3">
                            {MovieList.map(x => (
                                <div key={x.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="card bg-secondary text-light h-100">
                                        <img src={'/' + x.Img} className="card-img-top" alt={x.Title} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{x.Title}</h5>
                                            <h6 className="card-subtitle mb-2">{x.Name}</h6>
                                            <p className="card-text">{x.Description}</p>
                                            <button  className="btn btn-success mt-auto"  onClick={() => AddToUserMovieList(x.id, Cookies.get('ID'))} > Dodaj  </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <footer className="bg-white text-dark text-center py-3 mt-auto">
                <h6>©2025 WatchBox All Rights Reserved.</h6>
            </footer>
        </div>
    );
}

export default Mainpage;