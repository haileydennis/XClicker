import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/home/home';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './utils/firebase';
import { Login } from './components/userAuth/login';
import { Signup } from './components/userAuth/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
