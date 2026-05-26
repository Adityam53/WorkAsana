import { useAuthContext } from "../contexts/AauthContext";

const Settings = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Manage your profile and account preferences
        </p>
      </div>

      <div className="settings-grid">
        {/* Profile Card */}
        <div className="settings-panel">
          <div className="profile-section">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="profile-name">{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

          <div className="settings-divider" />

          <div className="profile-details">
            <div className="profile-row">
              <span>Full Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="profile-row">
              <span>Email Address</span>
              <strong>{user?.email}</strong>
            </div>

            <div className="profile-row">
              <span>Account Status</span>
              <strong className="status-active">Active</strong>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="settings-panel">
          <h3 className="settings-section-title">Account</h3>

          <p className="settings-description">
            Sign out of your account on this device.
          </p>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
