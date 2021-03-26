/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.scss';
import { ParamsType } from './types';
import { makePrivateRequest } from 'core/utils/request';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { Movie } from 'core/types/Movies';
import MovieInfoLoader from '../Loaders/MovieInfoLoader';
import MovieDescriptionLoader from '../Loaders/MovieDescriptionLoader';

const MoviesDetails = () => {
     const { movieId } = useParams<ParamsType>();
     const [movie, setMovie] = useState<Movie>();
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          setIsLoading(true);
          makePrivateRequest({ url: `/movies/${movieId}` })
               .then(response => setMovie(response.data))
               .finally(() => setIsLoading(false));
     }, [movieId]);

     return (
          <div className="product-details-container">
               <div className="product-details card-base border-radius-20">
                    <Link to="/admin" className="product-details-goback">
                         <ArrowIcon className="arrow-goback" />
                         <h1 className="text-goback">VOLTAR</h1>
                    </Link>
                    <div className="row">
                         <div className="col-6 pr-5">
                              {isLoading ? <MovieInfoLoader /> : (
                                   <>
                                        <div className="product-details-card text-center">
                                             <img src={movie?.imgUrl} alt={movie?.title} className="product-details-img" />
                                        </div>
                                        <h1 className="product-details-name">{movie?.title}</h1>
                                   </>
                              )}
                         </div>
                         <div className="col-6 product-details-card">
                              {isLoading ? <MovieDescriptionLoader /> : (
                                   <>
                                        <h1 className="product-description-title">Descrição do Produto</h1>
                                        <p className="product-description-text">
                                             {movie?.synopsis}
                                        </p>
                                   </>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default MoviesDetails;