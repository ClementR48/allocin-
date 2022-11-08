import React from "react";
import "./searchMovie.css";
import { useState, useEffect } from "react";

const SearchMovie = (props: any) => {
  const [valueSearch, setValueSearch] = useState<string>("");

  useEffect(() => {
    const searchByTitle = (film: any) => {
      props.setMovies(
        props.secondListMovie?.filter((movie: any) => {
          return movie.title.indexOf(film) !== -1;
        })
      );
    };
    searchByTitle(valueSearch);
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
