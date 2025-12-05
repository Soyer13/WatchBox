import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddNewMovie({ setAuth }) {
    const [MovieTitle, setMovieTitle] = useState('')
    const [GenreID, setGenreId] = useState('')
    const [Genre, setGenre] = useState([])
    const [Description, setDescription] = useState('')
    const [ImgName, setImgName] = useState()

    const navigate = useNavigate();

    function getGenres() {
        fetch('http://localhost:8000/allGenre')
            .then(res => res.json())
            .then(data => setGenre(data.data))
    }

    useEffect(() => {
        getGenres()
    }, [])

    function SaveNewMovie() {
        fetch('http://localhost:8000/SaveNewMovie', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ MovieTitle, GenreID, Description, ImgName })
        })
        navigate('/home')
    }
    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">

            <header className="bg-white d-flex align-items-center p-3">
                <a href='/home'>
                    <img src="WatchBoxLogo.png" height="80" alt='LogoWatchBox' />
                </a>
            </header>

            <main className="flex-fill p-4 m-5">
                <h1 className="mb-4">Dodaj Nowy Film!</h1>
                <form className="d-flex flex-column gap-3" onSubmit={(e) => e.preventDefault()}>

                    <div className="form-group">
                        <label htmlFor="title">Tytuł Filmu</label>
                        <input
                            id="title"
                            type='text'
                            className="form-control rounded"
                            placeholder="Wpisz tytuł filmu"
                            value={MovieTitle}
                            onChange={x => setMovieTitle(x.target.value)}  />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Gatunek</label>
                        <select
                            id="genre"
                            className="form-select rounded"
                            value={GenreID}
                            onChange={(x) => setGenreId(x.target.value)} >
                            <option value="">Wybierz gatunek</option>
                            {Genre.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Opis Filmu</label>
                        <textarea
                            id="description"
                            className="form-control rounded"
                            placeholder="Wpisz opis filmu"
                            value={Description}
                            onChange={x => setDescription(x.target.value)}
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="img">Nazwa Pliku Obrazu</label>
                        <input
                            id="img"
                            type='text'
                            className="form-control rounded"
                            placeholder="Wpisz nazwę pliku obrazu"
                            value={ImgName}
                            onChange={x => setImgName(x.target.value)}
                        />
                    </div>

                    <button  type="button"  className="btn btn-danger mt-2" onClick={SaveNewMovie} > Zapisz Film </button>
                </form>
                <p className="mt-3">Film musi zostać zaakceptowany przez Administrację</p>
            </main>

            <footer className="bg-white text-dark text-center py-3 mt-auto">
                <h6>©2025 WatchBox All Rights Reserved.</h6>
            </footer>
        </div>
    );
}

export default AddNewMovie;