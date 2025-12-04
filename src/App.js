import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Mainpage from './components/mainpage';
function App() {
  const Authentication = localStorage.getItem("Authorization") === false

  return (
    <div>
      <Router>
        <Routes>
          {/*obsługoa przeniesienia do logowania */}
          <Route path='/' element={Authentication ? <Navigate to="/home"/> : <Login />}/>
          <Route path='/home' element={Authentication ? <Mainpage/>: <Navigate to="/"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
