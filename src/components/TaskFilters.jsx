import { useLocation } from "react-router-dom";
import { useOwnersContext } from "../contexts/OwnersContext";
import { useTagContext } from "../contexts/TagContext";
import { useTaskQuery } from "../hooks/useTaskQuery";

const TaskFilters = () => {
  const { users = [] } = useOwnersContext();
  const { tags = [] } = useTagContext();

  const location = useLocation();

  const isDashboard = location.pathname !== "/dashboard";
  const {
    owner,
    status,
    tags: tag,
    updateFilter,
    clearFilters,
  } = useTaskQuery();

  return (
    <div className="task-filters">
      <div className="form-group">
        <label>Status</label>

        <select
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
        >
          <option value="">All Status</option>
          <option value="To Do">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Blocked">Blocked</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {isDashboard && (
        <div className="form-group">
          <label>Tags</label>

          <select
            value={tag}
            onChange={(e) => updateFilter("tags", e.target.value)}
          >
            <option value="">All Tags</option>

            {tags.map((tag) => (
              <option key={tag._id || tag.name} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Owner</label>

        <select
          value={owner}
          onChange={(e) => updateFilter("owner", e.target.value)}
        >
          <option value="">All Owners</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>&nbsp;</label>

        <button className="btn-ghost" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
