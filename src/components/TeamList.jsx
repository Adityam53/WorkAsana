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
      <p className="section-subtitle">
        Coordinate team collaboration and workload distribution{" "}
      </p>
      {error && <p>Error in loading Teams.</p>}

      <div className="card-row">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card skeleton-card" />
          ))}

        {!loading &&
          teams.map((team) => (
            <Card
              key={team._id}
              to={`/teams/${team._id}`}
              title={team.name}
              description={team.description}
            />
          ))}
      </div>

      {!loading && teams.length === 0 && (
        <div className="center">
          <p>No teams found.</p>
        </div>
      )}
    </div>
  );
};

export default TeamList;
