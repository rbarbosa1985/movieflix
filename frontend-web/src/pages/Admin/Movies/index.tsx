import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviesDetails from './Catalog/MoviesDetails'
import List from './Catalog';

const Movies = () => {
     return (
          <div>
               <Switch>
                    <Route path="/admin/movies" exact><List /></Route>
                    <Route path="/admin/movies/:movieId"><MoviesDetails /></Route>
               </Switch>
          </div>
     );
};

export default Movies;