import { useEffect, useState } from "react";
import Select from "react-select";
import { useOwnersContext } from "../contexts/OwnersContext";
import { useProjectContext } from "../contexts/ProjectContext";
import { useTeamContext } from "../contexts/TeamContext";
import { useTagContext } from "../contexts/TagContext";
import { customSelectStyles } from "../styles/customSelectStyles";
import { toast } from "react-toastify";

const DEFAULT_TASK = {
  name: "",
  project: "",
  team: "",
  owners: [],
  tags: [],
  timeToComplete: 1,
  status: "To Do",
};
const TaskForm = ({
  initialData,
  onSubmit,
  buttonText,
  heading,
  subHeading,
}) => {
  const { users = [] } = useOwnersContext();
  const { projects = [] } = useProjectContext();
  const { teams = [] } = useTeamContext();
  const { tags = [] } = useTagContext();

  const [formData, setFormData] = useState(initialData || DEFAULT_TASK);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name || "",
      project:
        typeof initialData.project === "object"
          ? initialData.project?._id
          : initialData.project || "",
      team:
        typeof initialData.team === "object"
          ? initialData.team?._id
          : initialData.team || "",
      owners: initialData.owners
        ? initialData.owners.map((owner) =>
            typeof owner === "object" ? owner._id : owner,
          )
        : [],
      tags: initialData.tags || [],
      timeToComplete: initialData.timeToComplete || 1,
      status: initialData.status || "To Do",
    });
  }, [initialData]);

  const ownerOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const tagOptions = tags.map((tag) => ({
    value: tag.name,
    label: tag.name,
  }));

  const selectedOwners = ownerOptions.filter((option) =>
    formData.owners.includes(option.value),
  );

  const selectedTags = tagOptions.filter((option) =>
    formData.tags.includes(option.value),
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "timeToComplete"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formData.project) {
      toast.error("Please select a project.");
      return;
    }

    if (!formData.team) {
      toast.error("Please select a team.");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Task name is required.");
      return;
    }

    if (formData.owners.length === 0) {
      toast.error("Please select at least one owner.");
      return;
    }

    if (formData.tags.length === 0) {
      toast.error("Please select at least one tag.");
      return;
    }

    if (formData.timeToComplete < 1) {
      toast.error("Time to complete must be at least 1 day.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <form className="job-form" onSubmit={submitHandler}>
          <h2 className="page-heading">{heading}</h2>

          <p className="center">{subHeading}</p>

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

                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
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

                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
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
              placeholder="Enter task name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Owners</label>

              <Select
                styles={customSelectStyles}
                isMulti
                isClearable
                options={ownerOptions}
                value={selectedOwners}
                onChange={(selected) =>
                  handleMultiSelectChange(selected, "owners")
                }
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Tags</label>

              <Select
                styles={customSelectStyles}
                isMulti
                isClearable
                options={tagOptions}
                value={selectedTags}
                onChange={(selected) =>
                  handleMultiSelectChange(selected, "tags")
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Time To Complete (days)</label>

            <input
              type="number"
              min={1}
              name="timeToComplete"
              value={formData.timeToComplete}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Blocked">Blocked</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button className="btn-primary" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
