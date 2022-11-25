import Card from "../../Card/Card";
import SearchGenres from "../../Search/SearchGenres";
import SearchMovie from "../../Search/SearchMovie";
import "./moviesPage.css";
import { useState, useEffect, useContext } from "react";
import { IList, IMovie } from "../../../Interfaces/MoviesInterfaces";
import ListsMovies from "./ListsMovies/ListsMovies";
import { fetchData } from "../../../utils/FetchData";
import Loader from "../../Loader/Loader";
import { MyContext, Icontext } from "../../../store/AppContext";

const MoviesPage = () => {
  const [idList, setIdList] = useState<number>(1);

  const { store, setStore } = useContext(MyContext) as Icontext;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/list/${idList}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`;

    fetchData(url, setStore, store, "listMovie");
  }, [idList]);

  if (store.loading) return <Loader />;
  if (store.error) return <h1>{store.error}</h1>;

  return (
    <main className="list_movies">
      <ListsMovies idList={idList} setIdList={setIdList} />
      <div className="search">
        <SearchGenres />
        <SearchMovie />
      </div>
      <ul>
        {store?.movies && store.movies.length > 0 ? (
          store?.movies?.map((movie: IMovie, index: number) => {
            return <Card {...movie} key={index} />;
          })
        ) : (
          <h2>Il n'y pas de film</h2>
        )}
      </ul>
    </main>
  );
};

export default MoviesPage;
