import SideBar from "../components/SideBar";
import { useAuthContext } from "../contexts/AauthContext";
import Button from "../components/Button";

const Settings = () => {
  const { user, logout } = useAuthContext();

  return (
    <main className="row">
      <div>
        {" "}
        <SideBar />
      </div>

      <div className="main">
        <div className="settings-wrapper">
          <div className="card settings-card">
            <div className="card-info settings-card-info">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h2 className="card-heading">{user?.name}</h2>
              <p className="card-text muted">{user?.email}</p>

              <div className="settings-divider" />

              <div className="buttons">
                <button className="delete-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
