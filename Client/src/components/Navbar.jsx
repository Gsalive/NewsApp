import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate()
  const Logout=()=>{

    localStorage.clear()
    navigate('/');
  }



  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/hero">Today's Catch</a>
          <button className="text-white" onClick={Logout}  >Logout</button>
          
        </div>
      </nav>
    </>
  )
}

export default Navbar