import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "./Button";
import Card from "./Card";
import Heading from "./Heading";
import TaskFilters from "./TaskFilters";

import { useTaskQuery } from "../hooks/useTaskQuery";
import { useAuthContext } from "../contexts/AauthContext";

const BASE_URL = "https://work-asana-backend-puce.vercel.app";

const TaskList = ({ projectId = "", teamId = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAuthContext();

  const isDashboard = location.pathname === "/dashboard";

  const { page, setPage, project, team, owner, status, tags } = useTaskQuery();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) return;

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        const effectiveProject = projectId || project;
        const effectiveTeam = teamId || team;

        if (effectiveProject) {
          params.append("project", effectiveProject);
        }

        if (effectiveTeam) {
          params.append("team", effectiveTeam);
        }

        if (owner) {
          params.append("owner", owner);
        }

        if (status) {
          params.append("status", status);
        }

        if (tags) {
          params.append("tags", tags);
        }

        params.append("page", page);
        params.append("limit", 9);

        const res = await fetch(`${BASE_URL}/tasks?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        console.log(`${BASE_URL}/tasks?${params.toString()}`);
        const data = await res.json();

        setTasks(data.tasks || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [token, page, project, team, owner, status, tags, projectId, teamId]);

  return (
    <div className="projects">
      <div className="section-header">
        <Heading title="Tasks" />
        <Button name="+ New Task" func={() => navigate("/addtask")} />
      </div>
      <p className="section-subtitle">
        Organize, prioritize, and manage tasks efficiently
      </p>
      {!isDashboard && <TaskFilters />}

      {loading ? (
        <div className="card-row">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card skeleton-card" />
          ))}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <>
          <div className="card-row">
            {(isDashboard ? tasks.slice(0, 3) : tasks).map((task) => (
              <Card
                key={task._id}
                taskId={task._id}
                status={task.status}
                to={`/tasks/${task._id}`}
                title={task.name}
                owners={task.owners}
                timeToComplete={task.timeToComplete}
              />
            ))}
          </div>

          {!isDashboard && totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`pagination-btn ${page === p ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

              <button
                className="pagination-btn"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
