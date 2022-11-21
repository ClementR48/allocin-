import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Header from "./Header/Header";
import Home from "./pages/Home/Home";
import ListSeries from "./pages/ListSeries/ListSeries";
import DetailMovie from "./pages/DetailPage/DetailMovie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Account from "./pages/Account/Account";

export interface IListRoutes {
  HOME: string;
  MOVIESPAGE: string;
  LISTSERIES: string;
  DETAILMOVIE: string;
  AUTH: string;
  ACCOUNT: string;
}

export const listRoutes: IListRoutes = {
  HOME: "/",
  MOVIESPAGE: "movies",
  LISTSERIES: "tv-shows",
  DETAILMOVIE: "/movies/:movieId",
  AUTH: "authentification",
  ACCOUNT: "account",
};

const Router = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storage = sessionStorage.getItem("tokenUser");
    setToken(storage);
  }, []);
  return (
    <BrowserRouter>
      {token ? (
        <>
          <Header />
          <Routes>
            <Route path={listRoutes.HOME} element={<Home />} />
            <Route path={listRoutes.MOVIESPAGE} element={<MoviesPage />} />
            <Route path={listRoutes.DETAILMOVIE} element={<DetailMovie />} />
            <Route path={listRoutes.LISTSERIES} element={<ListSeries />} />
            <Route
              path={listRoutes.ACCOUNT}
              element={<Account setToken={setToken} />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route
            path={listRoutes.AUTH}
            element={<Auth setToken={setToken} />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
