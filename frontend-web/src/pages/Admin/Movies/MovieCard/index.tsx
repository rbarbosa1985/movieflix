import React from 'react';
import './styles.scss';
import { Movie } from 'core/types/Movies';

type Props = {
     movie: Movie
}

const MovieCard = ({ movie }: Props) => (
     <div className="card-base border-radius-10 movie-card">
          <img src={movie.imgUrl} alt={movie.title} className="movie-card-image" />
          <div className="movie-info">
               <h6 className="movie-name">{movie.title}</h6>
               <h6 className="movie-year">{movie.year}</h6>
               <h2 className="movie-subtitle">{movie.synopsis}</h2>
          </div>
     </div>
);

export default MovieCard;