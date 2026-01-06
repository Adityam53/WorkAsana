import { Link } from "react-router-dom";
const Card = ({
  status,
  title,
  description,
  owners = [],
  timeToComplete,
  taskId,
  to,
}) => {
  const Wrapper = to ? Link : "div";
  return (
    <div className="card">
      <Wrapper to={to}>
        <div className="card-info">
          <p className="card-text muted">{status}</p>
          <h2 className="card-heading">{title}</h2>
          <p className="card-text">{description}</p>
          {owners.length > 0 && (
            <>
              <p className="card-text">
                <strong>Owners</strong>
              </p>
              <ul className="">
                {owners.map((owner) => (
                  <li key={owner._id} className="nav-item">
                    {owner.name} <span className="muted">({owner.email})</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {timeToComplete && (
            <p className="card-text">
              <strong>Time to complete:</strong> {timeToComplete} weeks
            </p>
          )}
        </div>{" "}
      </Wrapper>
    </div>
  );
};

export default Card;
