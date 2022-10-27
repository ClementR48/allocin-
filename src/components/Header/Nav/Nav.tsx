import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { listRoutes } from "../../Router";
import "./nav.css";

const Nav = () => {
  let activeStyle = {
    backgroundColor: "white",
  };

  return (
    <nav className="nav">
      <ul className="nav_list">
        <li>
          <Link to={listRoutes.HOME}>
            <img
              src="https://assets.allocine.fr/skin/img/allocine/logo-main-ab1b33daf0.svg"
              alt="log"
            />
          </Link>
        </li>
        <li>
          <NavLink
            to={listRoutes.LISTMOVIES}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to={listRoutes.LISTSERIES}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            TV-shows
          </NavLink>
        </li>
        <li>
          <NavLink
            to={listRoutes.AUTH}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Authentification
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
