import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { isAuthenticated, logout } from "../../utils/auth";

const Navbar = () => {

     const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event.preventDefault();
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
                    {isAuthenticated() && (<a href="#logout" className="nav-link active d-inline" onClick={handleLogout}>LOGOUT</a>)}
               </div>
          </nav>
     )
};

export default Navbar;