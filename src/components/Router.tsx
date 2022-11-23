import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Header from "./Header/Header";
import Home from "./pages/Home/Home";
import ListSeries from "./pages/ListSeries/ListSeries";
import DetailMovie from "./pages/DetailPage/DetailMovie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import Account from "./pages/Account/Account";
import { AppContext } from "../store/AppContext";
import PrivateRoutes from "./PrivateRoutes";

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
  MOVIESPAGE: "/movies",
  LISTSERIES: "tv-shows",
  DETAILMOVIE: "/movies/:movieId",
  AUTH: "authentification",
  ACCOUNT: "account",
};

const Router = () => {
  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={listRoutes.HOME} element={<Home />} />
            <Route path={listRoutes.MOVIESPAGE} element={<MoviesPage />} />
            <Route path={listRoutes.DETAILMOVIE} element={<DetailMovie />} />
            <Route path={listRoutes.LISTSERIES} element={<ListSeries />} />
            <Route path={listRoutes.ACCOUNT} element={<Account />} />
          </Route>
          <Route path={listRoutes.AUTH} element={<Auth />} />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
};

export default Router;
