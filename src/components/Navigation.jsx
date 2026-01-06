import { Link } from "react-router-dom";
const Navigation = () => {
  const pages = ["Dashboard", "Projects", "Teams", "Reports", "Settings"];
  return (
    <>
      <div className="sidebar">
        <ul className="nav container">
          {pages.map((page) => (
            <li key={page} className="nav-item">
              <Link to={`/${page.toLocaleLowerCase()}`} className="nav-link">
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
