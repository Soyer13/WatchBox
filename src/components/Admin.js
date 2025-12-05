import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin({ setAuth }){
    const [AllMovies,setAllMovies] = useState([])
    const [AllUser,setAllUser] = useState([])
    const navigate = useNavigate();

    function GetAllMovies(){
        fetch("http://localhost:8000/AllMovies")
        .then(res => res.json())
        .then(data => setAllMovies(data.data))
    }

    function GetAllUser(){
        fetch("http://localhost:8000/allUser")
        .then(res => res.json())
        .then(data => setAllUser(data.data))
    }
    useEffect(() => {
            GetAllMovies()
            GetAllUser()
    },[])

 const MovieAccepted = (id, currentState) => {
        const newState = currentState === 1 ? 0 : 1;

        fetch("http://localhost:8000/MovieAccepted", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, Accepted: newState })
        })
    };

    function DeleteMovies(id){
        fetch(`http://localhost:8000/deleteMovie/${id}`,{method:"DELETE"})
    }
    function DeleteUser(id){
        fetch(`http://localhost:8000/deleteUser/${id}`,{method:"DELETE"})
    }
function logOut() {
        Cookies.remove('AdminAuthorization');
        Cookies.remove('ID')
        setAuth(false);
        navigate("/");
    }
return (
        <div >
            <button className="btn btn-dark text-white" onClick={logOut}>Wyloguj</button>
            <h2 className="mb-4">Lista Filmów</h2>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Gatunek</th>
                        <th>Akceptuj</th>
                        <th>Usuń</th>
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
                                    onClick={() => MovieAccepted(movie.id, movie.Accepted)}>
                                    {movie.Accepted === 1 ? 'Akceptowany' : 'Nieakceptowany'} </button>
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => DeleteMovies(movie.id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

             <h2 className="mb-4">Lista Użytkowników</h2>

            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Login</th>
                        <th>Administrator</th>
                        <th>Akcja</th>
                    </tr>
                </thead>

                <tbody>
                    {AllUser.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.Name}</td>
                            <td>{u.Surname}</td>
                            <td>{u.Username}</td>
                            <td>{u.IsAdmin === 1 ? "Tak" : "Nie"}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => DeleteUser(u.id)} > Usuń
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