import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Card/Card";
import { IMovie } from "../../Interfaces/MoviesInterfaces";

const ListSeries = () => {
  const [series, setSeries] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getListSeries = () => {
      setLoading(true);
      axios
        .get(
          "https://api.themoviedb.org/3/discover/tv?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr&sort_by=popularity.desc"
        )
        .then((response) => {
          setLoading(false);
          setSeries(response.data.results);
        });
    };
    getListSeries();
  }, []);
  return (
    <main className="list_movies">
      <h1>Liste de séries</h1>

      {!loading && (
        <ul>
          {series.map((serie, index) => {
            return <Card {...serie} />;
          })}
        </ul>
      )}
    </main>
  );
};

export default ListSeries;
