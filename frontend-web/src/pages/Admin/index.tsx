import React from 'react';
import { Switch } from 'react-router-dom';
import Movies from './Movies';
import MoviesDetails from './Movies/MoviesDetails'
import './styles.scss';
import PrivateRoute from "../../core/components/Routes/PrivateRoute";

const Admin = () => {
     return (
          <div className="admin-container">
               <div className="admin-content">
                    <Switch>
                         <PrivateRoute path="/admin/movies"> <Movies /> </PrivateRoute>
                         <PrivateRoute path="/admin/movies/:moviesId"> <MoviesDetails /> </PrivateRoute>
                    </Switch>
               </div>
          </div>
     )
}

export default Admin;
