import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,  Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { UserProvider, useUserContext } from "./context/userContext";
import UserArea from "./components/users/UserArea";
import ViewProduct from "./components/product/ViewProduct";
import ScrollToTop from "./components/other/ScrollToTop";
export const baseApiUrl = 'https://demo-api.ideabridge.lt/api/';

function App() {

  return (
    <Router>
      <div className="container">
        <ScrollToTop/>
        <UserProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<><Products/></>} />
            <Route path="/page/:number" element={<Products/>} />
            <Route path="/product/:id" element={<ViewProduct/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer/>
        </UserProvider>
      </div>
    </Router>
  );
}


export default App;
