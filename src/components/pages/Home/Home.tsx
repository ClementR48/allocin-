import { useEffect, useContext } from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "./home.css";
import { fetchData } from "../../../utils/FetchData";
import Loader from "../../Loader/Loader";
import { MyContext, Icontext } from "../../../store/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { store, setStore } = useContext(MyContext) as Icontext;
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr&sort_by=popularity.desc";
    fetchData(url, setStore, store, "moviesDiscover");
  }, []);

  if (store.loading) return <Loader />;
  if (store.error) return <p>Error</p>;
  return (
    <main className="home">
      <h1>Découverte du mois</h1>
      <h2>Films</h2>
      <Slide cssClass="slider">
        {store.moviesDiscover?.results?.map((slideImage, index) => (
          <Link
            to={`/movies/${slideImage.id}`}
            className="each-slide"
            key={index}
          >
            <img
              className="each-slide-image"
              src={`https://image.tmdb.org/t/p/original${slideImage.poster_path}`}
              alt="affiche"
            ></img>
            <div className="overlay">
              <p>{slideImage.title}</p>
            </div>
          </Link>
        ))}
      </Slide>

      {/* <ul>
        {store.moviesDiscover?.results?.map((movie: IMovie, index: number) => {
          return <Card key={index} {...movie} />;
        })}
      </ul> */}
    </main>
  );
};

export default Home;
