import { useLocation, useNavigate } from "react-router-dom";
import { useProjectContext } from "../contexts/ProjectContext";
import Button from "./Button";
import Card from "./Card";
import Filters from "./Filters";
import Heading from "./Heading";

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, loading, error } = useProjectContext();
  return (
    <>
      <div className="projects">
        <div className="section-header">
          <Heading title="Projects" />
          <Button name="+ New Project" func={() => navigate("/addproject")} />
        </div>

        {loading && <p>Loading Projects...</p>}
        {error && <p>Error in loading Projects.</p>}

        {projects && projects.length > 0 && (
          <div className="card-row">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="card skeleton-card" />
                ))
              : (location.pathname === "/dashboard"
                  ? projects.slice(0, 3)
                  : projects
                ).map((project) => (
                  <Card
                    key={project._id}
                    title={project.name}
                    description={project.description}
                  />
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
