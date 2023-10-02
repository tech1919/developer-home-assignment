import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Link } from 'react-router-dom';

function Home({isAuthenticated}) {

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center">To-Do List</h1>
            <div className="text-center mb-4">
              {isAuthenticated ? (
                <div>
                <Link to="/tasks" className="btn btn-primary mx-2">
                  Go to Tasks
                </Link>
                <button onClick={()=>{delete sessionStorage['access_token']; location.reload()}} className='btn'>Log Out</button>
                </div>
              ) : (
                <>
                  <a href="/login" className="btn btn-success mx-2 mb-2">
                    Log In
                  </a>
                  <br></br>
                  <Link to="/register" className="btn btn-info mx-2">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
