import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

//Componenty
import Login from './components/login';
import Mainpage from './components/mainpage';
import LandingPage from './components/landingPage';
import SingUp from './components/singUp';
import Search from './components/search';
import AddNewMovie from './components/AddNewMovie';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';

function App() {
 // const Authentication = localStorage.getItem("Authorization") === "true"
  const [auth, setAuth] = useState(Cookies.get('Authorization') === 'true');
  const [Adminauth, AdminsetAuth] = useState(Cookies.get('AdminAuthorization') === 'true');

   useEffect(() => {
    setAuth(Cookies.get('Authorization') === 'true');
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {/*obsługoa przeniesienia do logowania */}
          <Route path='/' element={auth ? <Navigate to="/home"/> :<LandingPage/>} />
          <Route path='/login' element={auth ? <Navigate to="/home"/> : <Login setAuth={setAuth} />}/>
          <Route path='/singup' element={auth ? <Navigate to="/home"/> : <SingUp setAuth={setAuth} />}/>
          <Route path='/home' element={auth ? <Mainpage setAuth={setAuth}/>: <Navigate to="/"/>}/>
          <Route path='/search' element={auth ? <Search setAuth={setAuth}/>: <Navigate to="/"/>}/>
          <Route path='/addnew' element={auth ? <AddNewMovie setAuth={setAuth}/>: <Navigate to="/"/>}/>
          
          <Route path='/AdminLogin' element={Adminauth ? <Navigate to="/Admin"/> : <AdminLogin setAuth={AdminsetAuth} />}/>
          <Route path='/Admin' element={Adminauth ? <Admin setAuth={AdminsetAuth}/>: <Navigate to="/AdminLogin"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
