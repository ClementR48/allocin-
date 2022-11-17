import "./searchMovie.css";
import { useState, useEffect } from "react";
import { IMovie } from "../Interfaces/MoviesInterfaces";


type SearchMoviesProps = {
  movies: IMovie[];
  setSecondListMovie: React.Dispatch<React.SetStateAction<IMovie[]>>;
};

const SearchMovie = ({movies, setSecondListMovie}: SearchMoviesProps) => {
  const [valueSearch, setValueSearch] = useState<string>("");


  const searchByTitle = () => {
    setSecondListMovie((prev) =>
      movies?.filter((movie: IMovie) => {
        return movie.title.toLowerCase().includes(valueSearch.toLowerCase());
      })
    );
  };

  useEffect(() => {
    searchByTitle();
  }, [valueSearch]);

  return (
    <div className="search_movie">
      <input
        type="text"
        placeholder="Search movies"
        value={valueSearch}
        onChange={(e) => {
          setValueSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchMovie;
