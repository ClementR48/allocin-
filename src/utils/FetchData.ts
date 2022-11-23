import axios from "axios";
import { Dispatch, SetStateAction, useContext } from "react";
import { INewUser } from "../Interfaces/UserInterfaces";
import { IList } from "../Interfaces/MoviesInterfaces";

interface IStates {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  mainState:
    | Dispatch<SetStateAction<IList>>
    | Dispatch<SetStateAction<INewUser>>;
  headers?: string;
}

export const fetchData = (
  url: string,
  setStore: any,
  store: any,
  nameData: string,
  auth?: string
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const getData = async () => {
    setStore({ ...store, loading: true });

    await axios
      .get(url, {
        cancelToken: source.token,
        headers: { Authorization: `${sessionStorage.getItem("tokenUser")}` },
      })
      .then((res) => {
        console.log(res);

        if (nameData === "listMovie")
          setStore({
            ...store,
            listMovie: res.data,
            movies: res.data.items,
            loading: false,
          });
        if (nameData === "detailsMovie")
          setStore({ ...store, movie: res.data, loading: false });
        if (nameData === "myAccount")
          setStore({ ...store, user: res.data, loading: false });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return console.log("Request canceled", error.message);
        } else {
          setStore({ ...store, loading: false, error: error.message });
        }
      });
  };
  getData();

  return () => {
    source.cancel();
  };
};
