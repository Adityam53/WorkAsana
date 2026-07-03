import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./AauthContext";

const TaskContext = createContext(null);

export const useTaskContext = () => useContext(TaskContext);

const BASE_URL = "https://work-asana-backend-puce.vercel.app";

export const TaskProvider = ({ children }) => {
  const { token } = useAuthContext();

  const addTask = async (taskData) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to add task");
    }

    const task = await res.json();

    toast.success("Task Added");

    return task;
  };

  const getTaskById = async (taskId) => {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch task");
    }

    return await res.json();
  };

  const updateTask = async (taskId, updates) => {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update task");
    }

    const data = await res.json();

    toast.success("Task Updated");

    return data.task;
  };

  const deleteTask = async (taskId) => {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete task");
    }

    const data = await res.json();

    toast.success("Task Deleted");

    return data;
  };

  const value = {
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
