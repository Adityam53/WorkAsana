import { useParams, Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AauthContext";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const { updateTask, deleteTask, getTaskById } = useTaskContext();
  const { taskId } = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const statusClass =
    task?.status?.toLowerCase() === "completed"
      ? "status-completed"
      : task?.status?.toLowerCase() === "in progress"
        ? "status-in-progress"
        : task?.status?.toLowerCase() === "blocked"
          ? "status-blocked"
          : "status-to-do";

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId);
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTask();
    }
  }, [taskId, token]);

  const markAsCompleted = async () => {
    try {
      const updated = await updateTask(taskId, {
        status: "Completed",
      });

      setTask(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      await deleteTask(taskId);

      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <main className="row">
        <div className="main">
          <p className="center">Task not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="row">
      {/* <div>
        <SideBar />
      </div> */}

      <div className="">
        <div className="card-detail-align">
          <div className="card-detail">
            <div className="card-info">
              <div className="task-header">
                <span className={`status-badge ${statusClass}`}>
                  {task.status}
                </span>

                <h1 className="task-title">{task.name}</h1>

                <p className="task-description">{task.description}</p>
              </div>

              <div className="task-meta-grid">
                <div className="task-meta-card">
                  <span>Project</span>
                  <strong>{task.project?.name}</strong>
                </div>

                <div className="task-meta-card">
                  <span>Team</span>
                  <strong>{task.team?.name}</strong>
                </div>

                <div className="task-meta-card">
                  <span>Duration</span>
                  <strong>{task.timeToComplete} days</strong>
                </div>
              </div>

              {task.owners?.length > 0 && (
                <>
                  <div className="task-section">
                    <h3 className="task-section-title">Owners</h3>

                    <div className="owners-pills">
                      {task.owners.map((owner) => (
                        <div className="owner-card">
                          <div className="owner-avatar">
                            {owner.name.charAt(0)}
                          </div>

                          <div>
                            <div>{owner.name}</div>
                            <small>{owner.email}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="task-section">
                <h3 className="task-section-title">Tags</h3>{" "}
                <div className="task-tags">
                  {task.tags.map((tag) => (
                    <span className="task-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="task-actions">
                <Link to={`/tasks/edit/${task._id}`}>
                  <button className="btn-primary">Edit</button>
                </Link>

                {task.status !== "Completed" && (
                  <button className="btn-success" onClick={markAsCompleted}>
                    Mark as Completed
                  </button>
                )}

                <button className="btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetails;
