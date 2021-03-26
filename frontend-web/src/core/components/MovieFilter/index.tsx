import React, { useEffect, useState } from 'react';
import './styles.scss';
import Select from 'react-select';
import { makePrivateRequest } from 'core/utils/request';
import { Genre } from 'core/types/Movies';

type Props = {
     genre?: Genre;
     handleChangeGenre: (genre: Genre) => void;
}

const MovieFilter = ({ genre, handleChangeGenre }: Props) => {

     const [isLoadingCategories, setIsLoadingCategories] = useState(false);
     const [genres, setGenres] = useState<Genre[]>([]);


     useEffect(() => {
          setIsLoadingCategories(true);
          makePrivateRequest({ url: '/genres' })
               .then(response => {
                    setGenres(response.data);
               })
               .finally(() => { setIsLoadingCategories(false) });
     }, []);

     return (
          <div className="card-base movies-filters-container">
               <Select
                    name="genres"
                    key={`select-${genre?.id}`}
                    isLoading={isLoadingCategories}
                    options={genres}
                    value={genre}
                    getOptionLabel={(option: Genre) => option.name}
                    getOptionValue={(option: Genre) => String(option.id)}
                    classNamePrefix="categories-select"
                    className="filter-select-container"
                    placeholder="Gênero"
                    inputId="genres"
                    onChange={value => handleChangeGenre(value as Genre)}
                    isClearable
               />
          </div>
     )
}

export default MovieFilter;