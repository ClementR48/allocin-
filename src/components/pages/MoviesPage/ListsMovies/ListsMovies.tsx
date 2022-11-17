import { IList } from "../../../Interfaces/MoviesInterfaces";




type ListsMoviesType = {
  idList: number
  setIdList: React.Dispatch<React.SetStateAction<number>>
  listMovie: IList | undefined
};

 const ListsMovies = ({idList, setIdList, listMovie}: ListsMoviesType) => {
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
            <h1>{listMovie?.name}</h1>
            <img
              src={
                listMovie &&
                `https://image.tmdb.org/t/p/original${listMovie?.poster_path}`
              }
              alt="poster"
            />
            <button
              className="btn-right"
              onClick={() => setIdList((prev) => prev + 1)}
            >
              &#8594;
            </button>
            <span>{listMovie?.items?.length} films</span>
          </div>
          <div className="description-list">{listMovie?.description}</div>
          </>
  )
}

export default ListsMovies
