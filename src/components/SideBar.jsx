import Header from "./Header";
import Navigation from "./Navigation";
import { FiLogOut } from "react-icons/fi";
import { useAuthContext } from "../contexts/AauthContext";
import { useState } from "react";

const SideBar = () => {
  const { logout } = useAuthContext();
  const [open, setOpen] = useState(false);

  return (
    <aside className="sidebar">
      <Header open={open} setOpen={setOpen} />

      <div className="sidebar-content">
        <Navigation setOpen={setOpen} />

        <button
          className="sidebar-logout"
          onClick={() => {
            logout();
            document.body.classList.remove("menu-open");
          }}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
