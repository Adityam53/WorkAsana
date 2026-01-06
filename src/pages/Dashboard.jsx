import Projects from "../components/Projects";
import SideBar from "../components/SideBar";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  return (
    <>
      <main className="row">
        <div>
          <SideBar />
        </div>
        <div className="main">
          <Projects />
          <TaskList />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
