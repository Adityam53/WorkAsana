import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import { useTeamContext } from "../contexts/TeamContext";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect } from "react";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";

const TeamManagement = () => {
  const { teamId } = useParams();
  const { teams } = useTeamContext();
  const {
    tasks,
    loading,
    error,
    setFilters,
    currentPage,
    totalPages,
    goToPage,
  } = useTaskContext();

  const team = teams.find((t) => t._id === teamId);
  const navigate = useNavigate();

  return (
    <>
      <main className="row">
        <div className="project-page">
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

          {/* <TaskFilters /> */}

          <div className="buttons">
            {/* <Button name="+ New Task" func={() => navigate("/addtask")} /> */}
            <Button name="+ New Team" func={() => navigate("/addteam")} />
          </div>

          <TaskList teamId={teamId} />
        </div>
      </main>
    </>
  );
};

export default TeamManagement;
