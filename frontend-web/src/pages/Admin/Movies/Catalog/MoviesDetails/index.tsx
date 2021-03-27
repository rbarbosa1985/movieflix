/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.scss';
import { ParamsType } from './types';
import { makePrivateRequest } from 'core/utils/request';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { Movie } from 'core/types/Movies';


const MoviesDetails = () => {
     const { movieId } = useParams<ParamsType>();
     const [movie, setMovie] = useState<Movie>();

     useEffect(() => {
          makePrivateRequest({ url: `/movies/${movieId}` })
               .then(response => setMovie(response.data))
     }, [movieId]);

     return (
          <div className="movie-details-container">
               <div className="movie-details-card card-base border-radius-20">
                    <Link to="/admin" className="movie-details-goback">
                         <ArrowIcon className="arrow-goback" />
                         <h1 className="text-goback">VOLTAR</h1>
                    </Link>
                    <div className="row movie-detail">
                         <img src={movie?.imgUrl} alt={movie?.title} className="movie-details-img" />
                         <div className="movie-details-card2">
                              <h1 className="movie-details-title">{movie?.title}</h1>
                              <h1 className="movie-details-year">{movie?.year}</h1>
                              <h1 className="movie-details-subtitle">{movie?.subTitle}</h1>
                              <p className="movie-description-text">
                                   {movie?.synopsis}
                              </p>
                         </div>
                    </div>
               </div>
               <div className="review-card card-base border-radius-20">
                    <p>Oi</p>
               </div>
               <div className="review-user-card card-base border-radius-20"><Link to="/admin" className="movie-details-goback">
                    <ArrowIcon className="arrow-goback" />
                    <h1 className="text-goback">VOLTAR</h1>
               </Link></div>
          </div>
     );
};

export default MoviesDetails;