import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card, { IMovie } from "../utils/Card";
import "./listMovies.css";

const ListMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getListMovies = () => {
      setLoading(true);
      axios
        .get(
          "https://api.themoviedb.org/3/list/1?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr"
        )
        .then((response) => {
          setLoading(false);
          setMovies(response.data.items);
        });
    };
    getListMovies();
  }, []);
  return (
    <main className="list_movies">
      <h1>Liste de film</h1>

      {!loading && (
        <ul>
          {movies.map((movie, index) => {
            return <Card {...movie} />;
          })}
        </ul>
      )}
    </main>
  );
};

export default ListMovies;
