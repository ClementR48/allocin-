import Nav from "./Nav/Nav";
import SearchMovie from "./Search/SearchMovie";
import '../Header/header.css';

const Header = () => {
  return (
    <header className="header">
      <Nav />
      <SearchMovie />
    </header>
  );
};

export default Header;
