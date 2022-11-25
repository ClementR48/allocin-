import { useEffect, useContext } from "react";
import { MyContext, Icontext } from "../../../store/AppContext";
import { fetchData } from "../../../utils/FetchData";
import CardSerie from "../../Card/CardSerie";
import ListSerie from "./ListSerie/ListSerie";

const SeriesPage = () => {
  const { store, setStore } = useContext(MyContext) as Icontext;
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/discover/tv?api_key=28b26ad998b3319aff99b90c0c534ba4&language=fr-fr&include_image_language=fr&sort_by=popularity.desc";
    fetchData(url, setStore, store, "seriesDiscover");
  }, []);
  return (
    <main className="list_movies">
      <ListSerie />
      {!store.loading && (
        <ul>
          {store.seriesDiscover?.results?.map((serie, index) => {
            
            
            return <CardSerie key={index} {...serie} />;
          })}
        </ul>
      )}
    </main>
  );
};

export default SeriesPage;
