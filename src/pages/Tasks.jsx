import SideBar from "../components/SideBar";
import TaskList from "../components/TaskList";

const Tasks = () => {
  return (
    <main className="row">
      <div>
        <SideBar />
      </div>
      <div className="main">
        <TaskList />
      </div>
    </main>
  );
};

export default Tasks;
