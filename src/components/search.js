import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, data } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
function Search({ setAuth }) {
    const Search = Cookies.get('Search')
    const [SearchMoviesToAdd, setSearchMoviesToAdd] = useState([])
    const [SearchMoviesOnList, setSearchMoviesOnList] = useState([])

    const navigate = useNavigate();


    function featchMoviesToAdd() {
        fetch(`http://localhost:8000/AllMoviesToAdd/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.data.filter(x =>
                    x.Title.toLowerCase().includes(Search.toLowerCase())
                );
                setSearchMoviesToAdd(filtered);
            });
    }

    function featchMoviesOnList() {
        fetch(`http://localhost:8000/AllMoviesOnList/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.data.filter(x =>
                    x.Title.toLowerCase().includes(Search.toLowerCase())
                );
                setSearchMoviesOnList(filtered);
            });
    }
    function AddToUserMovieList(MovieId, UserId) {
        fetch("http://localhost:8000/AddFromUserMovieList", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ UserId, MovieId })
        })
        navigate('/home')
    }

    useEffect(() => {
        featchMoviesToAdd();
        featchMoviesOnList();
    }, []);

    function DeleteFromUserMovieList(MovieId, UserId) {
        fetch("http://localhost:8000/DeleteFromUserMovieList", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ UserId, MovieId })
        })
        navigate('/home')
    }


    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">

            <header className="bg-white d-flex align-items-center p-3">
                <a href='/home'>
                    <img src="WatchBoxLogo.png" height="80px" alt='LogoWatchBox' />
                </a>
            </header>

            <main className="flex-fill p-4">

                {SearchMoviesToAdd.length > 0 && (
                    <>
                        <h2 className="mb-3">Filmy Do Dodania na twoją listę</h2>
                        <div className="row g-3">
                            {SearchMoviesToAdd.map(x => (
                                <div key={x.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="card bg-secondary text-light h-100">
                                        <img src={'/' + x.Img} className="card-img-top" alt={x.Title} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{x.Title}</h5>
                                            <h6 className="card-subtitle mb-2">{x.Name}</h6>
                                            <p className="card-text">{x.Description}</p>
                                            <button className="btn btn-success mt-auto" onClick={() => AddToUserMovieList(x.id, Cookies.get('ID'))} > Dodaj </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {SearchMoviesOnList.length > 0 && (
                    <>
                        <h2 className="mt-5 mb-3">Filmy na liście</h2>
                        <div className="row g-3">
                            {SearchMoviesOnList.map(x => (
                                <div key={x.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="card bg-secondary text-light h-100">
                                        <img src={'/' + x.Img} className="card-img-top" alt={x.Title} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{x.Title}</h5>
                                            <h6 className="card-subtitle mb-2">{x.Name}</h6>
                                            <p className="card-text">{x.Description}</p>
                                            <button className="btn btn-danger mt-auto"  onClick={() => DeleteFromUserMovieList(x.id, Cookies.get('ID'))}> Usuń </button>
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
export default Search;