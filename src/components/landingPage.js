import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage({ setAuth }) {

    const navigate = useNavigate();
    function login() {
        navigate("/login");
    }

    function signup() {
        navigate("/singup");
    }
    return (
        <div className="container-fluid vh-100 p-0">
            <div className="row h-100" style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.65) 10%, rgba(0,0,0,1) 100%), url('tlo.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
            }}>


                <div
                    className="col-md-6 d-none d-md-block"

                >
                </div>

                <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center  text-light">
                    <h1 className="mb-4 text-center">
                        Witaj na <span style={{ color: 'red' }}>WatchBox! </span>
                        Najlepszym serwise do przechowywania filmów, które chcesz obejrzeć!
                    </h1>
                    <div className="d-flex flex-column gap-3">
                        <button className="btn btn-success btn-lg" onClick={login}>Zaloguj</button>
                        <button className="btn btn-danger btn-lg" onClick={signup}>Zarejestruj Się</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LandingPage;