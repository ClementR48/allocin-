import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./detailPage.css";

interface IFilm {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  tagline: string;
  release_date: string;
}

const DetailMovie = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState<IFilm>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMovie = () => {
      setLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr`
        )
        .then((response) => {
          console.log(response.data);

          setMovie(response.data);
          setLoading(false);
        });
    };
    getMovie();
  }, []);

  return (
    <main className="detail-movie">
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
