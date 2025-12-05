import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin({ setAuth }){
    const [AllMovies,setAllMovies] = useState([])
    const navigate = useNavigate();

    function GetAllMovies(){
        fetch("http://localhost:8000/AllMovies")
        .then(res => res.json())
        .then(data => setAllMovies(data.data))
    }

    useEffect(() => {
            GetAllMovies()
    },[])

 const MovieAccepted = (id, currentState) => {
        const newState = currentState === 1 ? 0 : 1;

        fetch("http://localhost:8000/MovieAccepted", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, Accepted: newState })
        })
    };
function logOut() {
        Cookies.remove('AdminAuthorization');
        Cookies.remove('ID')
        setAuth(false);
        navigate("/");
    }
return (
        <div >
            <button className="btn btn-dark text-white" onClick={logOut}>Wyloguj</button>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Gatunek</th>
                        <th>Akceptacja</th>
                    </tr>
                </thead>
                <tbody>
                    {AllMovies.map(movie => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.Title}</td>
                            <td>{movie.Description}</td>
                            <td>{movie.Name}</td>
                            <td>
                                <button
                                    className={`btn ${movie.Accepted === 1 ? 'btn-success' : 'btn-danger'}`}
                                    onClick={() => MovieAccepted(movie.id, movie.Accepted)}
                                >
                                    {movie.Accepted === 1 ? 'Akceptowany' : 'Nieakceptowany'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;