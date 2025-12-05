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
    }
    return (
        <div>
            <header>
                <a href='/home'>
                    <img src="WatchBoxLogo.png" height="125px" alt='LogoWatchBox' />
                </a>
            </header>
            <main>
                <h1>Dodaj Nowy Film!</h1>
                <form>
                    <input type='text' value={MovieTitle} onChange={x => setMovieTitle(x.target.value)} />
                    <select
                        value={GenreID}
                        onChange={(x) => setGenreId(x.target.value)} >
                        <option value="">Wybierz gatunek</option>
                        {Genre.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.Name}
                            </option>
                        ))}
                    </select>
                    <input type='text' value={Description} onChange={x => setDescription(x.target.value)}/>
                    <input type='text' value={ImgName} onChange={x => setImgName(x.target.value)}/>
                    <input type="button"onClick={SaveNewMovie} value="Zapisz Film"/>
                </form>
                <p>Film musi zostać zakceptowany przed Administracje</p></main>
                
        </div>
    )
}

export default AddNewMovie;