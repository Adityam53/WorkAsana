import { useTeamContext } from "../contexts/TeamContext";
import Heading from "./Heading";
import Button from "./Button";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
const TeamList = () => {
  const navigate = useNavigate();

  const { teams, error, loading } = useTeamContext();

  return (
    <div className="projects">
      <div className="section-header">
        <Heading title="Teams" />
        <Button func={() => navigate("/addteam")} name="+ New Team" />
      </div>

      {loading && <p>Loading Teams...</p>}
      {error && <p>Error in loading Teams.</p>}

      {teams && teams.length > 0 && (
        <div className="card-row">
          {teams.map((team) => (
            <Card
              key={team._id}
              title={team.name}
              description={team.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TeamList;
