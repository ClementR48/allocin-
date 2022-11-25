import { createContext, useState } from "react";
import { IData, IFilm, IList, IMovie } from "../Interfaces/MoviesInterfaces";
import { INewUser } from "../Interfaces/UserInterfaces";
import { ISerie } from '../components/Card/Card';

export interface Icontext {
  store: Istore;
  setStore: (store: Istore) => void;
}

export interface Istore {
  isUserAuth: string | null;
  listMovie: IList | null;
  movies: IMovie[] | null | undefined;
  loading: boolean;
  error: string;
  movie: IFilm | null;
  serie: ISerie | null;
  user: INewUser;
  moviesDiscover: IData | null;
  seriesDiscover: IData | null;
}

export const MyContext = createContext<Icontext | null>(null);

export const AppContext = ({ children }: any) => {
  const [store, setStore] = useState<Istore>({
    isUserAuth: sessionStorage.getItem("tokenUser"),
    listMovie: null,
    movies: null,
    loading: false,
    error: "",
    movie: null,
    serie: null,
    moviesDiscover: null,
    seriesDiscover: null,
    user: {
      avatar: "",
      firstname: "",
      lastname: "",
      city: "",
      postalCode: "",
      email: "",
      password: "",
    },
  });

  return (
    <MyContext.Provider value={{ store, setStore }}>
      {children}
    </MyContext.Provider>
  );
};
