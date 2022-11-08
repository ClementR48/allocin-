import Card from "../../Card/Card";
import SearchGenres from "../../Search/SearchGenres";
import SearchMovie from "../../Search/SearchMovie";
import "./moviesPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { IList, IMovie } from "../../Interfaces/MoviesInterfaces";
import SearchList from "../../Search/SearchList";

const MoviesPage = (props: any) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesDuplicate, setMoviesDuplicate] = useState<IMovie[]>([]);
  const [listMovie, setListMovie] = useState<IList>();
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState<number>(1);

  useEffect(() => {
    const getListMovies = () => {
      setLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/list/${idList}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`
        )
        .then((response) => {
          setLoading(false);
          setListMovie(response.data);
          setMovies(response.data.items);
          setMoviesDuplicate(response.data.items);
        });
    };

    getListMovies();
  }, [idList]);
  return (
    <main className="list_movies">
      {!loading && (
        <>
          <div className="title-container">
            {idList !== 1 && (
              <button
                className="btn-left"
                onClick={() => setIdList((prev) => prev - 1)}
              >
                &#8592;
              </button>
            )}
            <h1>{listMovie?.name}</h1>
            <img
              src={
                listMovie &&
                `https://image.tmdb.org/t/p/original${listMovie?.poster_path}`
              }
              alt="poster"
            />
            <button
              className="btn-right"
              onClick={() => setIdList((prev) => prev + 1)}
            >
              &#8594;
            </button>
            <span>{listMovie?.items?.length} films</span>
          </div>
          <div className="description-list">{listMovie?.description}</div>

          <div className="search">
           { <SearchGenres
              movies={movies}
              setMovies={setMovies}
              setSecondListMovie={setMoviesDuplicate}
              secondListMovie={moviesDuplicate}
            />}
            {/*     <SearchMovie
               movies={props.movies}
              setMovies={props.setMovies}
              setSecondListMovie={props.setSecondListMovie}
              secondListMovie={props.secondListMovie} 
            /> */}
          </div>

          <ul>
            {movies?.map((movie: IMovie, index: number) => {
              return <Card {...movie} key={index} />;
            })}
          </ul>
        </>
      )}
    </main>
  );
};

export default MoviesPage;
