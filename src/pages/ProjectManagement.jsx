import Projects from "../components/Projects";
import SideBar from "../components/SideBar";

const ProjectManagement = () => {
  return (
    <>
      <main className="row">
        <div>
          {" "}
          <SideBar />
        </div>

        <div className="main">
          {" "}
          <Projects />
        </div>
      </main>
    </>
  );
};

export default ProjectManagement;
