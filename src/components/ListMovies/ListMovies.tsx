import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card, { IMovie } from "../utils/Card";
import "./listMovies.css";
import SearchMovie from "../Header/Search/SearchMovie";
import SearchGenres from "../Header/Search/SearchGenres";

const ListMovies = (props: any) => {
  return (
    <main className="list_movies">
      <h1>Liste de film</h1>
      {!props.loading && (
        <>
          <h2>{props?.ListMovies?.name}</h2>
          <div className="search">
            <SearchGenres
              movies={props.movies}
              setMovies={props.setMovies}
              setSecondListMovie={props.setSecondListMovie}
              secondListMovie={props.secondListMovie}
            />
            <SearchMovie
              movies={props.movies}
              setMovies={props.setMovies}
              setSecondListMovie={props.setSecondListMovie}
              secondListMovie={props.secondListMovie}
            />
          </div>

          <ul>
            {props.movies.map((movie: any, index: number) => {
              return <Card {...movie} key={index} />;
            })}
          </ul>
        </>
      )}
    </main>
  );
};

export default ListMovies;
