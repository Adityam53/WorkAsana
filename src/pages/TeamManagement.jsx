import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useFetch } from "../hooks/useFetch";
import Button from "../components/Button";

const TeamManagement = () => {
  const { teamId } = useParams();
  const {
    data: tasks = [],
    loading,
    error,
  } = useFetch(
    `https://work-asana-backend-puce.vercel.app/tasks?team=${teamId}`
  );

  const team = tasks.length > 0 ? tasks[0].team : null;
  const navigate = useNavigate();

  return (
    <>
      <main className="row">
        <div>
          <SideBar />
        </div>
        <div className="main project-page">
          <div className="project-header">
            <div className="card-info">
              {team && (
                <>
                  <h1 className="card-heading">{team.name}</h1>
                  <p className="card-text">{team.description}</p>
                </>
              )}
            </div>
          </div>

          <section className="tasks">
            <div className="section-header">
              <h2 className="card-heading">Tasks</h2>

              <div className="buttons">
                <Button name="+ New Task" func={() => navigate("/addtask")} />

                <Button name="+ New Team" func={() => navigate("/addteam")} />
              </div>
            </div>

            {loading && <p className="center">Loading tasks...</p>}
            {error && <p className="center">Failed to load tasks</p>}

            {!loading && !error && (
              <div className="card-row">
                {tasks.length === 0 ? (
                  <p className="center">No tasks for this team</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task._id} className="card">
                      <div className="card-info">
                        <h3 className="card-heading">{task.name}</h3>

                        <p className="card-text">
                          <strong>Status:</strong> {task.status}
                        </p>

                        <p className="card-text">
                          <strong>Time to Complete:</strong>{" "}
                          {task.timeToComplete} hrs
                        </p>

                        <p className="card-text">
                          <strong>Team:</strong> {task.team?.name || "—"}
                        </p>

                        <p className="card-text">
                          <strong>Owners:</strong>{" "}
                          {task.owners?.map((o) => o.name).join(", ")}
                        </p>

                        <p className="card-text">
                          <strong>Tags:</strong>{" "}
                          {task.tags?.length ? task.tags.join(", ") : "—"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>{" "}
      </main>
    </>
  );
};

export default TeamManagement;
