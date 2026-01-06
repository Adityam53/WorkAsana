import SideBar from "../components/SideBar";
import TeamList from "../components/TeamList";

const Teams = () => {
  return (
    <main className="row">
      <div>
        <SideBar />
      </div>
      <div className="main">
        <TeamList />
      </div>
    </main>
  );
};
export default Teams;
