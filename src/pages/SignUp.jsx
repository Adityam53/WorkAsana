import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="row login-Form">
      <div className="form-container">
        <form className="job-form" onSubmit={handleSubmit}>
          <h1 className="center navbar-brand">workasana</h1>

          <h2 className="page-heading">Create New Account</h2>
          <p className="center">Please enter your details.</p>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button className="submit-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
