import "./searchMovie.css";
import { useState, useEffect, useContext } from "react";
import { IMovie } from "../../Interfaces/MoviesInterfaces";
import { MyContext, Icontext } from "../../store/AppContext";



const SearchMovie = () => {
  const [valueSearch, setValueSearch] = useState<string>("");

  const { store, setStore } = useContext(MyContext) as Icontext;

  const searchByTitle = () => {
    setStore({
      ...store,
      movies: store.listMovie?.items.filter((movie: IMovie) => {
        return movie.title.toLowerCase().includes(valueSearch.toLowerCase());
      }),
    });
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
