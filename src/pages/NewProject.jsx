import { useState } from "react";
import SideBar from "../components/SideBar";
import { useProjectContext } from "../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjectContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProject(formData);
    } catch (error) {
      alert(error.message);
    } finally {
      navigate("/projects");
    }
  };

  return (
    <main className="row">
      <div>
        {" "}
        <SideBar />
      </div>

      <div className="main form-page">
        <div className="form-container">
          <form className="job-form" onSubmit={handleSubmit}>
            <h2 className="page-heading">Create New Project</h2>
            <p className="center">Please enter project details.</p>

            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows="4"
                required
              />
            </div>

            <button className="submit-btn">Add Project</button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default NewProject;
