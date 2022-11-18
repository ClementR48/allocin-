
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./detailPage.css";
import { IFilm } from "../../Interfaces/MoviesInterfaces";



const DetailMovie = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState<IFilm>();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getMovie = async () => {
      setLoading(true);
      const response = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`, {cancelToken: source.token}
        )
        try {
          setMovie(response.data);
          setLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          }
        }   
    };
    getMovie();
 
    return () => {
      source.cancel()
    }

  }, [movieId]);

  return (
    <main className="detail-movie">
      <button>Retour</button>
      {!loading && (
        <div className="container">
          <div className="image">
            <img
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt="affiche_movie"
            />
          </div>
          <div className="information-movie">
            <h2>{movie?.title}</h2>
            <h3>{movie?.tagline}</h3>
            <span>{movie?.release_date}</span>
            <p className="description">{movie?.overview}</p>

            <ul className="list-genre">
              <h4>Genres : </h4>
              {movie?.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default DetailMovie;
