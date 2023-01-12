/**
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file App.js
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  return (
    <>
     <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<PrivateRoute/>}>
                <Route path='/profile' element={<Profile/>}/>
            </Route>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/offers' element={<Offers/>}/>
        </Routes>
     </Router>
     <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        />
    </>
  );
}

export default App;
