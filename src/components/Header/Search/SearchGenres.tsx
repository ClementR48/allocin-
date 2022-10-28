import React from "react";
import { useState, useEffect } from "react";
import "./searchGenres.css";
import axios from "axios";

export interface IGenres {
  id: number;
  name: string;
}

const SearchGenres = (props: any) => {
  const [valueSearch, setValueSearch] = useState<number>();
  const [genres, setGenres] = useState<IGenres[]>([]);

  const searchByGenre = (value: any) => {
    if (value == '-1') props.setMovies(props.secondListMovie)
    props.setMovies(
      props.secondListMovie?.filter((movie: any) => {
        return movie.genre_ids.includes(Number(value));
      })
    );
  };

  useEffect(() => {
    const getGenres = () => {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr"
        )
        .then((response) => {
          console.log(response.data.genres);
          setGenres(response.data.genres);
        });
    };

    getGenres();
  }, []);

  useEffect(() => {
    searchByGenre(valueSearch);
    console.log(props.movies);
    
  }, [valueSearch]);

  return (
    <div className="search_movie">
      <select
        name="genres"
        id="pet-select"
        onChange={(e) => setValueSearch(e.target.value)}
      >
        <option value={-1}>All genre</option>
        {genres?.map((genre) => {
          return (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchGenres;
