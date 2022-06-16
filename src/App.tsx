import React from 'react';
import './App.css'
import {Routes, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/SignUp'} element={<SignUp/>}/>
            </Routes>
        </>
    );
};

export default App;