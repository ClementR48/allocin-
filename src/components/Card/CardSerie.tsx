import React from "react";
import { Link } from "react-router-dom";
import { ISerie } from "./Card";

const CardSerie = (props: ISerie) => {
  return (
    <li className="card">
      <Link to={`/tv-shows/${props.id}`}>
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
            alt="poster-film"
          />
          <div className="overlay">
            <p>Voir plus</p>
          </div>
        </div>

        <h3>{props.name}</h3>
        <span className="date">{props.first_air_date}</span>
      </Link>
    </li>
  );
};

export default CardSerie;
