import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuthContext } from "./AauthContext";

const TaskContext = createContext(null);
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { token } = useAuthContext();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    project: null,
    team: null,
    owner: "",
    status: "",
    tags: "",
  });

  const fetchTasks = useCallback(async () => {
    try {
      if (!token) return;

      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const res = await fetch(
        `https://work-asana-backend-puce.vercel.app/tasks?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [filters, token]);

  useEffect(() => {
    if (filters.project === null && filters.team === null) {
      return;
    }
    fetchTasks();
  }, [fetchTasks, filters]);

  const addTask = async (taskData) => {
    if (!token) throw new Error("You must be logged in");

    const res = await fetch(
      "https://work-asana-backend-puce.vercel.app/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to add task");
    }

    const data = await res.json();
    setTasks((prev) => [...prev, data]);
  };

  const updateTask = async (taskId, updates) => {
    if (!token) throw new Error("You must be logged in");

    try {
      const res = await fetch(
        `https://work-asana-backend-puce.vercel.app/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update task");
      }

      const data = await res.json();
      const updatedTask = data.task;

      // 🔥 update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );

      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      owner: "",
      status: "",
      tags: "",
    }));
  };

  const value = {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    clearFilters,
    fetchTasks,
    addTask,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
