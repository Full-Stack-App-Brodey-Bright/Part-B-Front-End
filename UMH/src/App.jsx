import { useState, createContext, Provider, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Connect from "./pages/Connect";
import Auth from "./pages/Auth";
import Cookies from "js-cookie";
import Dashboard from "./pages/Dashboard";
import Playlists from "./pages/Playlists";
import Playlist from './pages/Playlist'

function App() {
    useEffect(() => {
        console.log(Cookies.get("token"));
    });
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/connect" element={<Connect />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/playlist/:id" element={<Playlist />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
