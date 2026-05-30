import { useLocation, useNavigate } from "react-router-dom";
import { useProjectContext } from "../contexts/ProjectContext";
import Button from "./Button";
import Card from "./Card";
import Heading from "./Heading";

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, loading, error } = useProjectContext();

  return (
    <div className="projects">
      <div className="section-header">
        <Heading title="Projects" />
        <Button name="+ New Project" func={() => navigate("/addproject")} />
      </div>
      <p className="section-subtitle">
        Plan, organize, and manage project workflows efficiently
      </p>
      {loading ? (
        <div className="card-row">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card skeleton-card" />
          ))}
        </div>
      ) : error ? (
        <p className="center">Error in loading Projects.</p>
      ) : projects.length === 0 ? (
        <div className="center">
          <p>No projects found.</p>
        </div>
      ) : (
        <div className="card-row">
          {(location.pathname === "/dashboard"
            ? projects.slice(0, 3)
            : projects
          ).map((project) => (
            <Card
              type="Project"
              key={project._id}
              to={`/projects/${project._id}`}
              title={project.name}
              description={project.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
