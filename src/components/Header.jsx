import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/dashboard" className="navbar-brand">
          WorkAsana
        </Link>
      </div>
    </header>
  );
};

export default Header;
