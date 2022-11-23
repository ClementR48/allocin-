import { IList } from "../../../../Interfaces/MoviesInterfaces";
import { useContext } from "react";
import { MyContext, Icontext } from "../../../../store/AppContext";

type ListsMoviesType = {
  idList: number;
  setIdList: React.Dispatch<React.SetStateAction<number>>;
};

const ListsMovies = ({ idList, setIdList }: ListsMoviesType) => {
  const { store } = useContext(MyContext) as Icontext;

  return (
    <>
      <div className="title-container">
        {idList !== 1 && (
          <button
            className="btn-left"
            onClick={() => setIdList((prev) => prev - 1)}
          >
            &#8592;
          </button>
        )}
        <h1>{store.listMovie?.name}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original${store.listMovie?.poster_path}`}
          alt="poster"
        />
        <button
          className="btn-right"
          onClick={() => setIdList((prev) => prev + 1)}
        >
          &#8594;
        </button>
        <span>{store.listMovie?.items?.length} films</span>
      </div>
      <div className="description-list">{store.listMovie?.description}</div>
    </>
  );
};

export default ListsMovies;
