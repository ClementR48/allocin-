import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Card/Card";

import "./home.css";
import { IMovie } from "../../Interfaces/MoviesInterfaces";
import { fetchData } from "../../utils/FetchData";

const Home = () => {
  const [discoverMovies, setDiscoverMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const objState = {
      setLoading,
      mainState: setDiscoverMovies
    }
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr&sort_by=popularity.desc"
    fetchData(url, objState)

  }, []);

  return (
    <main className="home">
      <h1>Découverte du mois</h1>
      {!loading ? (
        <ul>
          {discoverMovies.map((movie, index) => {
            return <Card {...movie} />;
          })}
        </ul>
      ) : (
        <p>WAIT</p>
      )}
    </main>
  );
};

export default Home;
