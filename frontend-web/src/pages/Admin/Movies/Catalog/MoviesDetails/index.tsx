/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { ParamsType } from './types';
import { makePrivateRequest } from 'core/utils/request';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { ReactComponent as Star } from 'core/assets/images/star.svg';
import { Movie } from 'core/types/Movies';
import { getAccessTokenDecode } from 'core/utils/auth';

type FormState = {
     review: string;
}

const MoviesDetails = () => {
     const { register, handleSubmit, errors } = useForm<FormState>();
     const { movieId } = useParams<ParamsType>();
     const [movie, setMovie] = useState<Movie>();
     const currentUserData = getAccessTokenDecode();
     const [review, setReview] = useState('');
     const data = {
          text: '',
          movieId: 0
     }

     const handleChangeReview = (review: string) => {
          setReview(review);
     }

     const onSubmit = () => {
          console.log('Oi');

          data.text = review;
          data.movieId = parseInt(movieId);

          makePrivateRequest({
               method: 'POST',
               url: '/reviews',
               data
          })
               .then(() => {
                    getMovie();
                    toast.info('Avaliação cadastrada com sucesso!!');
                    setReview('');
               })
               .catch(() => {
                    toast.error('Erro ao salvar avaliação!');
               });
     }

     const getMovie = useCallback(() => {
          makePrivateRequest({ url: `/movies/${movieId}` })
               .then(response => setMovie(response.data))
     }, [movieId]);

     useEffect(() => {
          getMovie();
     }, [getMovie]);

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
               {!(currentUserData.authorities.indexOf('ROLE_MEMBER') !== 0) && (<div className="review-card card-base border-radius-20">
                    <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
                         <input type="text"
                              className="input-salvar form-control"
                              placeholder="Deixe sua avaliação aqui"
                              name="review"
                              value={review}
                              ref={register({
                                   required: "Campo Obrigatório.",
                              })}
                              onChange={event => handleChangeReview(event.target.value)} />
                         {errors.review && (<div className="invalid-feedback d-block">
                              {errors.review.message}</div>)}
                         <button className="btn-salvar btn btn-warning" >SALVAR AVALIAÇÃO</button>
                    </form>
               </div>)}
               {!(movie?.reviews.length === 0) && (<div className="review-user-card card-base border-radius-20">
                    {movie?.reviews.map(review => (
                         <>
                              <div className="review-name">
                                   <Star className="review-img" />
                                   <h1 className="review-username">{review.user.name}</h1>
                              </div>
                              <div className="review-text">
                                   <p>{review.text}</p>
                              </div>
                         </>
                    ))}
               </div>)}
          </div>
     );
};

export default MoviesDetails;