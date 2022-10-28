import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Header from "./Header/Header";
import Home from "./Home/Home";
import ListMovies from './ListMovies/ListMovies';
import ListSeries from "./ListSeries/ListSeries";
import DetailMovie from "./DetailPage/DetailMovie";
import { useState, useEffect } from "react";
import axios from "axios";
import { IMovie } from "./utils/Card";

export interface IListRoutes {
  HOME: string;
  LISTMOVIES: string;
  LISTSERIES: string;
  DETAILMOVIE: string;
  AUTH: string;
}

export const listRoutes: IListRoutes = {
  HOME: "/",
  LISTMOVIES: "movies",
  LISTSERIES: "tv-shows",
  DETAILMOVIE: "/movies/:movieId",
  AUTH: "authentification",
};

export interface IListMovie{
  description: string,
  id:number
  name:string
}

const Router = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [secondListMovie, setSecondListMovie] = useState<IMovie[]>([]);
  const [listMovie, setListMovie] = useState();
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
          console.log(response.data.items);
          
          setListMovie(response.data)
          setSecondListMovie(response.data.items);
          setMovies(response.data.items);
        });
    };

    
    getListMovies();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={listRoutes.HOME} element={<Home />} />
        <Route
          path={listRoutes.LISTMOVIES}
          element={
            <ListMovies
              movies={movies}
              ListMovies={listMovie}
              setMovies={setMovies}
              secondListMovie={secondListMovie}
              setSecondListMovie={setSecondListMovie}
              loading={loading}
            />
          }
        />
        <Route path={listRoutes.DETAILMOVIE} element={<DetailMovie />} />
        <Route path={listRoutes.LISTSERIES} element={<ListSeries />} />
        <Route path={listRoutes.AUTH} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;