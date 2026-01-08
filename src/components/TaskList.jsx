import { useLocation, useNavigate } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";
import Button from "./Button";
import Card from "./Card";
import Heading from "./Heading";
import TaskFilters from "./TaskFilters";
import { useEffect } from "react";

const TaskList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tasks, loading, error, setFilters } = useTaskContext();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      project: "",
      team: "",
    }));
  }, [setFilters]);
  return (
    <>
      <div className="projects">
        <div className="section-header">
          <Heading title="Tasks" />
          <Button name="+ New Task" func={() => navigate("/addtask")} />
        </div>
        <TaskFilters />

        {loading && <p>Loading Tasks...</p>}
        {error && <p>Error in loading Tasks.</p>}

        {tasks && tasks.length > 0 && (
          <div className="card-row">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="card skeleton-card" />
                ))
              : (location.pathname === "/dashboard"
                  ? tasks.slice(0, 3)
                  : tasks
                ).map((task) => (
                  <Card
                    key={task._id}
                    taskId={task._id}
                    status={task.status}
                    to={`/tasks/${task._id}`}
                    title={task.name}
                    owners={task.owners}
                    timeToComplete={task.timeToComplete}
                  />
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
