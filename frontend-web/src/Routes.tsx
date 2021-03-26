import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Home from './pages/Home';
import history from "./core/utils/history";

const Routes = () => {
     return (
          <Router history={history}>
               <Navbar />
               <Switch>
                    <Route path="/" exact> <Home /> </Route>
                    <Redirect from="/admin" to="/admin/movies" exact></Redirect>
                    <Route path="/admin" > <Admin /> </Route>
               </Switch>
          </Router>
     )
}

export default Routes;