import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { isAuthenticated, logout } from "../../utils/auth";

const Navbar = () => {

     const handleLogout = () => {
          window.location.reload();
          logout();
     }


     return (
          <nav className="row bg-primary main-nav">
               <div className="col-3">
                    <Link to="/admin" className="nav-logo-text">
                         <h4>MovieFlix</h4>
                    </Link>
               </div>
               <div className="col-9 text-right">
                    {isAuthenticated() && (<button type="button" className="btn-sair btn btn-outline-dark" onClick={handleLogout}>SAIR</button>)}
               </div>
          </nav>
     )
};

export default Navbar;