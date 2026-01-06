import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "./authContext";

const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { data, loading, error } = useFetch(
    "https://work-asana-backend-puce.vercel.app/tasks"
  );
  const { token } = useAuthContext();

  useEffect(() => {
    if (data) {
      setTasks(data);
      console.log(data);
    }
  }, [data]);

  const addTask = async (taskData) => {
    try {
      if (!token) {
        throw new Error("You must be logged in to add a task");
      }
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
      console.log(data);

      setTasks((prev) => [...prev, data]);
    } catch (error) {
      throw error;
    }
  };
  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
