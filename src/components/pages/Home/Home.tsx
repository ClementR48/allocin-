import { useEffect, useState, useContext } from 'react';
import Card from "../../Card/Card";

import "./home.css";
import { fetchData } from "../../../utils/FetchData";
import Loader from "../../Loader/Loader";
import { MyContext, Icontext } from '../../../store/AppContext';
import { IMovie } from '../../../Interfaces/MoviesInterfaces';

const Home = () => {
  
  const {store, setStore} = useContext(MyContext) as Icontext
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr&sort_by=popularity.desc";
    fetchData(url, setStore, store, 'moviesDiscover');
    
  }, []);

  if(store.loading) return <Loader />
  if(store.error) return <p>Error</p>
  return (
    <main className="home">
      <h1>Découverte du mois</h1>

      <ul>
        {store.moviesDiscover?.results?.map((movie: IMovie, index: number) => {
          return <Card key={index} {...movie} />;
        })}
      </ul>
    </main>
  );
};

export default Home;
