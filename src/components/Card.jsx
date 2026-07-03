import { Link } from "react-router-dom";
import { FiFolder, FiUsers, FiCheckSquare } from "react-icons/fi";

const Card = ({
  type,
  status,
  title,
  description,
  owners = [],
  timeToComplete,
  to,
}) => {
  const Wrapper = to ? Link : "div";

  const statusClass =
    status?.toLowerCase() === "completed"
      ? "status-completed"
      : status?.toLowerCase() === "in progress"
        ? "status-in-progress"
        : status?.toLowerCase() === "blocked"
          ? "status-blocked"
          : "status-to-do";

  const iconMap = {
    Project: <FiFolder />,
    Team: <FiUsers />,
    Task: <FiCheckSquare />,
  };

  return (
    <div className="card">
      <Wrapper to={to}>
        <div className="card-info">
          {type && (
            <div className="card-type">
              {iconMap[type]}
              <span>{type}</span>
            </div>
          )}

          {status && (
            <div className={`status-badge ${statusClass}`}>{status}</div>
          )}

          <h2 className="card-heading">{title}</h2>

          {description && <p className="card-description">{description}</p>}

          {(owners.length > 0 || timeToComplete != null) && (
            <div className="card-meta">
              {owners.length > 0 && (
                <div className="card-owners">
                  <span className="card-label">Owners</span>

                  <div className="owners-list">
                    {owners.slice(0, 3).map((owner) => (
                      <span key={owner._id} className="owner-pill">
                        {owner.name}
                      </span>
                    ))}

                    {owners.length > 3 && (
                      <span className="owner-pill">+{owners.length - 3}</span>
                    )}
                  </div>
                </div>
              )}

              {timeToComplete != null && (
                <div className="card-time">
                  <span className="card-label">Timeline</span>
                  <span>
                    {timeToComplete === 0
                      ? "Immediate"
                      : `${timeToComplete} days`}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default Card;
