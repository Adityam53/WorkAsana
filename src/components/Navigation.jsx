import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiFolder,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const Navigation = ({ setOpen }) => {
  const location = useLocation();
  const pages = [
    {
      name: "Dashboard",
      icon: <FiHome />,
    },
    {
      name: "Tasks",
      icon: <FiCheckSquare />,
    },
    {
      name: "Projects",
      icon: <FiFolder />,
    },
    {
      name: "Teams",
      icon: <FiUsers />,
    },
    {
      name: "Reports",
      icon: <FiBarChart2 />,
    },
    {
      name: "Settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <>
      <ul className="nav container">
        {pages.map((page) => {
          const path = `/${page.name.toLowerCase()}`;

          return (
            <li key={page.name} className="nav-item">
              <Link
                to={path}
                onClick={() => {
                  setOpen(false);
                  document.body.classList.remove("menu-open");
                }}
                className={`nav-link ${
                  location.pathname === path ? "active-nav" : ""
                }`}
              >
                <span className="nav-icon">{page.icon}</span>
                <span>{page.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Navigation;
