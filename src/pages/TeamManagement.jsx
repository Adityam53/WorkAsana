import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import { useTeamContext } from "../contexts/TeamContext";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import { FiUsers } from "react-icons/fi";

const TeamManagement = () => {
  const [taskCount, setTaskCount] = useState(0);
  const { teamId } = useParams();
  const { teams } = useTeamContext();

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
                  <div className="card-type">
                    <FiUsers />
                    <span>Team</span>
                  </div>

                  <div className="project-header-top">
                    <div>
                      <h1 className="project-title">{team.name}</h1>
                      <p className="project-description">{team.description}</p>
                    </div>
                  </div>

                  <div className="project-meta">
                    <div className="project-stat">
                      <span>{taskCount}</span>
                      <small>Tasks</small>
                    </div>

                    <div className="project-stat">
                      <span>{team.status || "Active"}</span>
                      <small>Status</small>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* <TaskFilters /> */}

          <div className="buttons">
            {/* <Button name="+ New Task" func={() => navigate("/addtask")} /> */}
            {/* <Button name="+ New Team" func={() => navigate("/addteam")} /> */}
          </div>

          <TaskList onCountChange={setTaskCount} teamId={teamId} />
        </div>
      </main>
    </>
  );
};

export default TeamManagement;
