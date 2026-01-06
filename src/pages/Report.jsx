import SideBar from "../components/SideBar";
import Visualization from "../components/Visualization";

const Report = () => {
  return (
    <>
      <main className="row">
        <div>
          <SideBar />
        </div>
        <div>
          <Visualization />
        </div>
      </main>
    </>
  );
};

export default Report;
