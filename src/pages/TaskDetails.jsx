import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useTaskContext } from "../contexts/TaskContext";

const TaskDetails = () => {
  const { tasks } = useTaskContext();
  const { taskId } = useParams();

  const task = tasks.find((t) => t._id === taskId);

  if (!task) {
    return (
      <main className="row">
        <SideBar />
        <div className="main">
          <p className="center">Task not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="row">
      <div>
        <SideBar />
      </div>

      <div className="main">
        <div className="card-detail-align">
          <div className="card-detail">
            <div className="card-info">
              <p className="card-text muted">{task.status}</p>

              <h2 className="card-heading">{task.name}</h2>

              <p className="card-text">{task.description}</p>

              <p className="card-text">
                <strong>Project:</strong> {task.project?.name}
              </p>

              <p className="card-text">
                <strong>Team:</strong> {task.team?.name}
              </p>

              {task.owners?.length > 0 && (
                <>
                  <p className="card-text">
                    <strong>Owners</strong>
                  </p>
                  <ul className="">
                    {task.owners.map((owner) => (
                      <li key={owner._id} className="nav-item">
                        {owner.name}{" "}
                        <span className="muted">({owner.email})</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {task.tags?.length > 0 && (
                <p className="card-text">
                  <strong>Tags:</strong> {task.tags.join(", ")}
                </p>
              )}

              <p className="card-text">
                <strong>Time to complete:</strong> {task.timeToComplete} weeks
              </p>

              {task.status !== "Completed" && (
                <div className="buttons">
                  <button className="details-btn">Mark as Completed</button>
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
