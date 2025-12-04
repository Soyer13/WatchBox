import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Mainpage(){
    return(<div>
        <h1>Mainpage</h1>
        <input type='button' value="wyloguj" onClick={() => {localStorage.setItem("Authorization", false);  window.location.href = "/";}}/>
        </div>)
}

export default Mainpage;