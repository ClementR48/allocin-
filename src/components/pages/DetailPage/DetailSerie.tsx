import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./detailPage.css";
import { fetchData } from "../../../utils/FetchData";
import Loader from "../../Loader/Loader";
import { MyContext, Icontext } from "../../../store/AppContext";

const DetailSerie = () => {
  let { tvId } = useParams();

  const { store, setStore } = useContext(MyContext) as Icontext;

  console.log(store)

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`;
    fetchData(url, setStore, store, "detailsSerie");
  }, [tvId]);

  if (store.loading) return <Loader />;
  if (store.error) return <h1>{store.error}</h1>;

  return (
    <main className="detail-movie">
      <div className="container">
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/original${store.serie?.poster_path}`}
            alt="affiche_movie"
          />
        </div>
        <div className="information-movie">
          <h2>{store.serie?.name}</h2>
          <h3>{store.movie?.tagline}</h3>
          <span>{store.serie?.first_air_date}</span>
          <p className="description">{store.serie?.overview}</p>

          <ul className="list-genre">
            <h4>Genres : </h4>
            {store.serie?.genres.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DetailSerie;
