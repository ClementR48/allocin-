import Card from "../../Card/Card";
import SearchGenres from "../../Search/SearchGenres";
import SearchMovie from "../../Search/SearchMovie";
import "./moviesPage.css";
import { useState, useEffect } from "react";
import { IList, IMovie } from "../../Interfaces/MoviesInterfaces";
import ListsMovies from "./ListsMovies/ListsMovies";
import { fetchData } from "../../utils/FetchData";



const MoviesPage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesDuplicate, setMoviesDuplicate] = useState<IMovie[]>([]);
  const [listMovie, setListMovie] = useState<IList>();
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState<number>(1);

 

  useEffect(() => {

    const objState = {
      setLoading,
      mainState: setListMovie,
      secondMainState: setMovies,
      duplicateData: setMoviesDuplicate
    }

    const url = `https://api.themoviedb.org/3/list/${idList}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`

    fetchData(url, objState)
    /* const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getListMovies = async () => {
      setLoading(true);
      const response = await axios
        .get(
          `https://api.themoviedb.org/3/list/${idList}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`, {cancelToken: source.token}
        )
        try {
          setLoading(false);
          setListMovie(response.data);
          setMovies(response.data.items);
          setMoviesDuplicate(response.data.items);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          }
        }
    };

    getListMovies();

    return () => {
      source.cancel()
    } */
  }, [idList]);

  
  return (
    <main className="list_movies">
      <>
      {!loading && (
        <>
        <ListsMovies idList={idList} setIdList={setIdList} listMovie={listMovie} />
          

          <div className="search">
            <SearchGenres
              movies={movies}
              setSecondListMovie={setMoviesDuplicate}
            /> 
                <SearchMovie
              movies={movies}
              setSecondListMovie={setMoviesDuplicate}
              />
              
            
          </div>

          <ul>
            {moviesDuplicate.length > 0 ?
            
            moviesDuplicate?.map((movie: IMovie, index: number) => {
              return <Card {...movie} key={index} />;
            }): <h2>Il n'y pas de film</h2>}
          </ul>
        </>
      )}
      </>
    </main>
  );
};

export default MoviesPage;
