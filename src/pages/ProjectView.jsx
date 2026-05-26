import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import { useProjectContext } from "../contexts/ProjectContext";
import TaskFilters from "../components/TaskFilters";
import { useEffect } from "react";
import { useTaskContext } from "../contexts/TaskContext";
import TaskList from "../components/TaskList";

const ProjectView = () => {
  const { projectId } = useParams();
  const { projects } = useProjectContext();
  const navigate = useNavigate();

  const {
    tasks,
    loading,
    error,
    setFilters,
    currentPage,
    totalPages,
    goToPage,
  } = useTaskContext();

  const project = projects.find((p) => p._id === projectId);

  return (
    <main className="row">
      <div className="project-page">
        <div className="project-header">
          <div className="card-info">
            {project && (
              <>
                <h1 className="card-heading">{project.name}</h1>
                <p className="card-text">{project.description}</p>
              </>
            )}
          </div>
        </div>
        <div className="buttons">
          {/* <Button name="+ New Task" func={() => navigate("/addtask")} /> */}
          <Button name="+ New Project" func={() => navigate("/addproject")} />
        </div>
        {/* <TaskFilters /> */}

        <TaskList projectId={projectId} />
      </div>
    </main>
  );
};

export default ProjectView;
