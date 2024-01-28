import React from "react";
import { useState, useEffect } from "react";
import {  BrowserRouter as Router,   Switch,  Route,   Link } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../App";
import { useUserContext } from "../../context/userContext";

const Header = () => {

    const user = useUserContext();


     const fetchData = async(token) => {
        const response = await axios.get(baseApiUrl + 'auth/me', {
            headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer '+ token.access_token },
            }).then((response) => {
                if(response.data.status === true){ // cool, token is legit. Login user with state.
                    user.signInUser(token)
                }
            })
            .catch((error) => {
                console.log('error: ',error.response.data.message);
                user.logOutUser(true);
            });
    }

    useEffect( ()=> { // check if user has token saved
        let token = JSON.parse(localStorage.getItem('login-token'));
        if(token !== null){ // has token, check if token legit.
           fetchData(token);
        }else{
            user.logOutUser(true); // token not legit, destroy user data.
        }
      }, []);
  

    const handleLogout = async () => {
        const response = await axios.post(baseApiUrl + 'auth/logout', {}, {
        headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer '+ user.user_data.access_token },
        }).then((response) => {
            if(response.data.status === true){
                user.logOutUser(true);
            }
        })
        .catch((error) => {
            console.log('error: ',error.response.data.message)
        });
    }

    return (
        <nav className="navbar navbar-expand-lg border-bottom mb-4">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand">Home</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.isLoggedIn ? 'User menu' : 'Menu' }</a>
                <ul className="dropdown-menu">
                    {!user.isLoggedIn ?  
                    <>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                    </> : <>
                    <li><Link className="dropdown-item" to="/">Home</Link></li>
                    <li><a className="dropdown-item" onClick={ () => { handleLogout() } }>Logout</a></li>
                    </>
                    }
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}
 
export default Header;