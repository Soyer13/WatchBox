import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, data } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Search({ Search,setAuth }){
    const [Movies,setMovies] = useState([])
    function featchMovies(){
        fetch("http://localhost:8000/AllMovies")
        .then(res => res.json())
        .then(data => setMovies(data.data))
    }

    const SearchMovies = Movies.filter(x => Search[x.Title])
 return(<div>
    <h1>Wyszukanie</h1>
    
 </div>)
}
export default Search;