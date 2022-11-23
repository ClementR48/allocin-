import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./detailPage.css";
import { fetchData } from "../../../utils/FetchData";
import Loader from "../../Loader/Loader";
import { MyContext, Icontext } from "../../../store/AppContext";

const DetailMovie = () => {
  let { movieId } = useParams();

  const { store, setStore } = useContext(MyContext) as Icontext;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`;
    fetchData(url, setStore, store, "detailsMovie");
  }, [movieId]);

  if (store.loading) return <Loader />;
  if(store.error) return <h1>{store.error}</h1>

  return (
    <main className="detail-movie">
      <button>Retour</button>

      <div className="container">
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/original${store.movie?.poster_path}`}
            alt="affiche_movie"
          />
        </div>
        <div className="information-movie">
          <h2>{store.movie?.title}</h2>
          <h3>{store.movie?.tagline}</h3>
          <span>{store.movie?.release_date}</span>
          <p className="description">{store.movie?.overview}</p>

          <ul className="list-genre">
            <h4>Genres : </h4>
            {store.movie?.genres.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DetailMovie;
