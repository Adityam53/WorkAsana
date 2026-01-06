import Heading from "./Heading";
import ReusableChart from "./ReusableChart";
import { useFetch } from "../hooks/useFetch";
import { useOwnersContext } from "../contexts/OwnersContext";

const Visualization = () => {
  const { data: lastWeekRes, loading: lwLoading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/report/last-week"
  );

  const { data: pendingRes, loading: pLoading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/report/pending"
  );

  const { data: closedByOwnerRes, loading: cLoading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/report/closed-tasks?groupBy=owner"
  );
  const { users = [] } = useOwnersContext();

  const ownerLabels =
    closedByOwnerRes && users.length > 0
      ? Object.keys(closedByOwnerRes).map(
          (ownerId) => users.find((u) => u._id === ownerId)?.name || "Unknown"
        )
      : [];
  return (
    <div className="main visualization">
      <Heading tag="h2" name="Report Overview" />

      <div className="charts-center">
        <div className="card-row">
          <div className="card">
            <div className="card-info">
              <h3 className="card-heading">Tasks Closed (Last 7 Days)</h3>

              {lwLoading && <p className="card-text">Loading data...</p>}

              {Array.isArray(lastWeekRes?.tasks) &&
                lastWeekRes.tasks.length > 0 && (
                  <ReusableChart
                    type="bar"
                    labels={lastWeekRes.tasks.map((task) =>
                      new Date(task.updatedAt).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })
                    )}
                    data={Array(lastWeekRes.tasks.length).fill(1)}
                    datasetLabel="Closed Tasks"
                    colors={["#36A2EB"]}
                    height="260px"
                  />
                )}
            </div>
          </div>

          <div className="card">
            <div className="card-info">
              <h3 className="card-heading">Pending Work Overview</h3>

              {pLoading && <p className="card-text">Loading data...</p>}

              {pendingRes && (
                <ReusableChart
                  type="doughnut"
                  labels={["Pending Days", "Total Tasks"]}
                  data={[pendingRes.totalPendingDays, pendingRes.totalTasks]}
                  datasetLabel="Pending"
                  colors={["#FFCE56", "#FF6384"]}
                  height="260px"
                />
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-info">
              <h3 className="card-heading">Closed Tasks by Owner</h3>

              {cLoading && <p className="card-text">Loading data...</p>}

              {closedByOwnerRes && Object.keys(closedByOwnerRes).length > 0 && (
                <ReusableChart
                  type="pie"
                  labels={ownerLabels}
                  data={Object.values(closedByOwnerRes)}
                  datasetLabel="Closed Tasks"
                  height="260px"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
