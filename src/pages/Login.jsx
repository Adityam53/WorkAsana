import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="row login-Form">
      <div className="form-container">
        <form className="job-form" onSubmit={handleSubmit}>
          <h1 className="center navbar-brand">workasana</h1>

          <h2 className="page-heading">Log in to your account</h2>
          <p className="center">Please enter your details.</p>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit-btn">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
