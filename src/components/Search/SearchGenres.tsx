import React from "react";
import { useState, useEffect } from "react";
import "./searchGenres.css";
import axios from "axios";
import { IMovie } from "../Interfaces/MoviesInterfaces";

export interface IGenres {
  id: number;
  name: string;
}

type SearchGenresProps = {
  movies: IMovie[];
  setSecondListMovie: React.Dispatch<React.SetStateAction<IMovie[]>>;
};

const SearchGenres = ({ movies, setSecondListMovie }: SearchGenresProps) => {
  const [valueSearch, setValueSearch] = useState<string>("-1");
  const [genres, setGenres] = useState<IGenres[]>([]);

  const searchByGenre = () => {
    valueSearch === "-1"
      ? setSecondListMovie(movies)
      : setSecondListMovie(
          movies.filter((movie: IMovie) => {
            return movie.genre_ids.includes(Number(valueSearch));
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
          setGenres(response.data.genres);
        });
    };

    getGenres();
  }, []);

  useEffect(() => {
    searchByGenre();
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
