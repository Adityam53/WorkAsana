import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AauthContext";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const { updateTask } = useTaskContext();
  const { taskId } = useParams();
  const { token } = useAuthContext();

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
        const res = await fetch(
          `https://work-asana-backend-puce.vercel.app/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
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
      await updateTask(taskId, { status: "Completed" });

      setTask((prev) => ({
        ...prev,
        status: "Completed",
      }));
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
                  <strong>{task.timeToComplete} weeks</strong>
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

              {task.status !== "Completed" && (
                <div className="task-actions">
                  <button className="btn-success" onClick={markAsCompleted}>
                    Mark as Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetails;
