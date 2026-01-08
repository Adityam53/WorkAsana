import { useOwnersContext } from "../contexts/OwnersContext";
import { useTagContext } from "../contexts/TagContext";
import { useTaskContext } from "../contexts/TaskContext";

const TaskFilters = () => {
  const { filters, setFilters, clearFilters } = useTaskContext();
  const { users = [] } = useOwnersContext();
  const { tags = [] } = useTagContext();

  const handleSingleChange = (key) => (e) => {
    setFilters((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="task-filters ">
      <div className="form-group">
        <label>Status</label>
        <select
          value={filters.status || ""}
          onChange={handleSingleChange("status")}
        >
          <option value="">All Status</option>
          <option value="To Do">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Blocked">Blocked</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tags</label>
        <select
          value={filters.tags || ""}
          onChange={handleSingleChange("tags")}
        >
          <option value="">All Tags</option>
          {tags.map((t) => (
            <option key={t._id || t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Owner</label>
        <select
          value={filters.owner || ""}
          onChange={handleSingleChange("owner")}
        >
          <option value="">All Owners</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>&nbsp;</label>
        <button type="button" className="delete-btn" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
