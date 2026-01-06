import { useState } from "react";
import SideBar from "../components/SideBar";
import { useTeamContext } from "../contexts/TeamContext";
import { useNavigate } from "react-router-dom";

const NewTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { addTeam } = useTeamContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTeam(formData);
    } catch (error) {
      alert(error.message);
    } finally {
      navigate("/teams");
    }
  };
  return (
    <>
      <main className="row">
        <div>
          <SideBar />
        </div>
        <div className="main form-page">
          <div className="form-container">
            <form className="job-form" onSubmit={handleSubmit}>
              <h2 className="page-heading">Create New Team</h2>
              <p className="center">Please enter team details.</p>

              <div className="form-group">
                <label>Team Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter team description"
                  rows="4"
                  required
                />
              </div>

              <button className="submit-btn">Add Team</button>
            </form>
          </div>
        </div>{" "}
      </main>
    </>
  );
};

export default NewTeam;
