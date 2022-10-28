import Nav from "./Nav/Nav";
import SearchMovie from "./Search/SearchMovie";
import "../Header/header.css";

const Header = (props: any) => {
  return (
    <header className="header">
      <Nav />
    </header>
  );
};

export default Header;
