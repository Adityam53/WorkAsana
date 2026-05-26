import { Link } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiFolder,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const Navigation = ({ setOpen }) => {
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
        {pages.map((page) => (
          <li key={page.name} className="nav-item">
            <Link
              to={`/${page.name.toLowerCase()}`}
              onClick={() => {
                setOpen(false);
                document.body.classList.remove("menu-open");
              }}
              className="nav-link"
            >
              <span className="nav-icon">{page.icon}</span>
              <span>{page.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navigation;
