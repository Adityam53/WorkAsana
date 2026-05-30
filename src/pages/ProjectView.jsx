import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import { useProjectContext } from "../contexts/ProjectContext";
import TaskFilters from "../components/TaskFilters";
import { useEffect, useState } from "react";
import { useTaskContext } from "../contexts/TaskContext";
import TaskList from "../components/TaskList";
import { FiFolder } from "react-icons/fi";

const ProjectView = () => {
  const { projectId } = useParams();
  const { projects } = useProjectContext();
  const navigate = useNavigate();
  const [taskCount, setTaskCount] = useState(0);

  const { loading, error, setFilters, currentPage, totalPages, goToPage } =
    useTaskContext();

  const project = projects.find((p) => p._id === projectId);

  return (
    <main className="row">
      <div className="project-page">
        <div className="project-header">
          <div className="card-info">
            {project && (
              <>
                <div className="card-type">
                  <FiFolder />
                  <span>Project</span>
                </div>
                <div className="project-header-top">
                  <div>
                    <h1 className="project-title">{project.name}</h1>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>

                <div className="project-meta">
                  <div className="project-stat">
                    <span>{taskCount}</span>
                    <small>Tasks</small>
                  </div>

                  <div className="project-stat">
                    <span>{project.status || "Active"}</span>
                    <small>Status</small>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className="buttons">
          <Button name="+ New Task" func={() => navigate("/addtask")} />
          <Button name="+ New Project" func={() => navigate("/addproject")} />
        </div> */}
        {/* <TaskFilters /> */}

        <TaskList onCountChange={setTaskCount} projectId={projectId} />
      </div>
    </main>
  );
};

export default ProjectView;
