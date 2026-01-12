import { useState } from "react";
import SideBar from "../components/SideBar";
import Select from "react-select";
import { useTaskContext } from "../contexts/TaskContext";
import { useOwnersContext } from "../contexts/OwnersContext";
import { useTagContext } from "../contexts/TagContext";
import { useProjectContext } from "../contexts/ProjectContext";
import { useTeamContext } from "../contexts/TeamContext";
import { useNavigate } from "react-router-dom";
import { customSelectStyles } from "../styles/customSelectStyles";

const NewTask = () => {
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: [],
    timeToComplete: 0,
    status: "To Do",
  });

  const navigate = useNavigate();
  const { addTask } = useTaskContext();
  const { users = [] } = useOwnersContext();
  const { tags = [] } = useTagContext();
  const { projects = [] } = useProjectContext();
  const { teams = [] } = useTeamContext();

  const tagOptions = tags.map((tag) => ({ value: tag.name, label: tag.name }));
  const ownerOptions = users.map((u) => ({ value: u._id, label: u.name }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(formData);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions ? selectedOptions.map((o) => o.value) : [],
    }));
  };

  return (
    <main className="row">
      <div>
        <SideBar />
      </div>

      <div className="main form-page">
        <div className="form-container">
          <form className="job-form" onSubmit={handleSubmit}>
            <h2 className="page-heading">Create New Task</h2>
            <p className="center">Please enter task details.</p>

            <div className="flex">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Select Project</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                >
                  <option value="">Projects</option>
                  {projects.map((proj) => (
                    <option value={proj._id} key={proj._id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Select Team</label>
                <select
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  required
                >
                  <option value="">Teams</option>
                  {teams.map((t) => (
                    <option value={t._id} key={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Task Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter task name"
                required
              />
            </div>

            <div className="flex">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Owners</label>
                <Select
                  isMulti
                  styles={customSelectStyles}
                  options={ownerOptions}
                  isClearable
                  placeholder="owners"
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(selectedOptions, "owners")
                  }
                />
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Tags</label>
                <Select
                  styles={customSelectStyles}
                  isMulti
                  isClearable
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(selectedOptions, "tags")
                  }
                  options={tagOptions}
                  placeholder="tags"
                />
              </div>
            </div>

            <div className="flex">
              <div className="form-group" style={{ flex: 1 }}>
                <label>TimeToComplete</label>
                <input
                  type="number"
                  value={formData.timeToComplete}
                  onChange={handleChange}
                  placeholder="In days"
                  name="timeToComplete"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="details-btn">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewTask;
