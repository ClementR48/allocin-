import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Header from "./Header/Header";
import Home from "./Home/Home";
import ListMovies from './ListMovies/ListMovies';
import ListSeries from './ListSeries/ListSeries';


export interface IListRoutes {
  HOME: string,
  LISTMOVIES: string,
  LISTSERIES: string,
  AUTH: string
}

export const listRoutes:IListRoutes = {
  HOME: "/",
  LISTMOVIES: 'movies',
  LISTSERIES: 'tv-shows',
  AUTH: 'authentification'
};

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={listRoutes.HOME} element={<Home />} />
        <Route path={listRoutes.LISTMOVIES} element={<ListMovies />} />
        <Route path={listRoutes.LISTSERIES} element={<ListSeries />} />
        <Route path={listRoutes.AUTH} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
