import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Tasks from './Tasks';
import Groups from './Groups';

function App() {
  const isAuthenticated = sessionStorage.getItem('access_token') ? true : false;

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/tasks' element={<Tasks/>} />
        <Route path='/groups' element={<Groups/>} />
      </Routes>
      </Router> 
     </>
  )
}

export default App
