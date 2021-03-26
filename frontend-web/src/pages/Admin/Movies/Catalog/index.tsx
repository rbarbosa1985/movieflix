import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieResponse, Genre } from 'core/types/Movies';
import { makePrivateRequest } from 'core/utils/request';
import MovieCard from './MovieCard';
import MovieCardLoader from './Loaders/MovieCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import MovieFilter from 'core/components/MovieFilter';;


const List = () => {

     const [moviesResponse, setMoviesResponse] = useState<MovieResponse>();
     const [isLoading, setIsLoading] = useState(false);
     const [activePage, setActivePage] = useState(0);
     const [genre, setGenre] = useState<Genre>();

     const getMovies = useCallback(() => {
          const params = {
               genreId: genre?.id,
               page: activePage,
               linesPerPage: 8
          }
          setIsLoading(true);
          makePrivateRequest({ url: '/movies', params }).then(response => setMoviesResponse(response.data))
               .finally(() => setIsLoading(false));
     }, [activePage, genre])

     useEffect(() => {
          getMovies()
     }, [getMovies])

     const handleChangeGenre = (genre: Genre) => {
          setActivePage(0);
          setGenre(genre);
     }

     return (
          <div className="catalog-container">
               <MovieFilter genre={genre} handleChangeGenre={handleChangeGenre} />
               <div className="catalog-movies">
                    {isLoading ? <MovieCardLoader /> : (
                         moviesResponse?.content.map(movie => (
                              <Link to={`/admin/movies/${movie.id}`} key={movie.id}>
                                   <MovieCard movie={movie} />
                              </Link>
                         ))
                    )}
               </div>
               {moviesResponse && <Pagination totalPages={moviesResponse.totalPages} activePage={activePage} onChange={page => setActivePage(page)} />}
          </div>
     )
}

export default List;