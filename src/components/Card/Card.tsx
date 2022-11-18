import { Link } from "react-router-dom";
import { IMovie } from "../Interfaces/MoviesInterfaces";
import "./card.css";

export interface ISerie {
  id: number;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: "2021-12-15";
  title: string;
}

const Card = (props: IMovie) => {
  return (
    <li className="card" >
      <Link to={`/movies/${props.id}`}>
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
            alt="poster-film"
          />
          <div className="overlay">
            <p>Voir plus</p>
          </div>
        </div>

        <h3>{props.title}</h3>
        <span className="date">{props.release_date}</span>
      </Link>
    </li>
  );
};

export default Card;
