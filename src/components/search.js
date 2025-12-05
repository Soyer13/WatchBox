import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, data } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Search({ setAuth }) {
    const Search = Cookies.get('Search')
    const [Movies, setMovies] = useState([])
    const [SearchMoviesToAdd, setSearchMoviesToAdd] = useState([])
    const [SearchMoviesOnList, setSearchMoviesOnList] = useState([])

    const navigate = useNavigate();


    function featchMoviesToAdd() {
        fetch(`http://localhost:8000/AllMoviesToAdd/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => setMovies(data.data))
            //.then(setSearchMoviesToAdd(Movies.filter(x => Search[x.Title])))
            .then(filtr(setSearchMoviesToAdd))
    }

    //AllMoviesOnList

    function featchMoviesOnList() {
        fetch(`http://localhost:8000/AllMoviesOnList/${Cookies.get('ID')}`)
            .then(res => res.json())
            .then(data => setMovies(data.data))
            //.then(setSearchMoviesToAdd(Movies.filter(x => Search[x.Title])))
            .then(filtr(setSearchMoviesOnList))
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
        featchMoviesToAdd()
    })
    function DeleteFromUserMovieList(MovieId, UserId) {
        fetch("http://localhost:8000/DeleteFromUserMovieList", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ UserId, MovieId })
        })
        navigate('/home')
    }


    function filtr(setFiltr) {
        const f = Movies.filter(x =>
            x.Title.toLowerCase().includes(Search.toLowerCase())
        );

        setFiltr(f);
    }

    return (<div><header>
        <a href='/home'>
            <img src="WatchBoxLogo.png" height="125px" alt='LogoWatchBox' />
        </a>
    </header>

        <h1>Wyszukanie</h1>
        
        <h2>Filmy Do Dodania na twoją liste</h2>
        {SearchMoviesToAdd.map(x => (<div>
            <img src={'/' + x.Img} alt={x.img} height="300px" />
            <h3>{x.Title}</h3>
            <h4>{x.Name}</h4>
            <p>{x.Description}</p>
            <input type='button' value="Dodaj" onClick={() => AddToUserMovieList(x.id, Cookies.get('ID'))} />
        </div>))}

        <h2>Filmy na liście</h2>
        {SearchMoviesOnList.map(x => (<div>
            <img src={'/' + x.Img} alt={x.img} height="300px" />
            <h3>{x.Title}</h3>
            <h4>{x.Name}</h4>
            <p>{x.Description}</p>
            <input type='button' value="Usuń" onClick={() => DeleteFromUserMovieList(x.id, Cookies.get('ID'))} />
        </div>))}
    </div>)
}
export default Search;