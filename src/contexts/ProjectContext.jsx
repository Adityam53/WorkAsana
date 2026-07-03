import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useTaskContext } from "./TaskContext";
import { useAuthContext } from "./AauthContext";
import { toast } from "react-toastify";

const ProjectContext = createContext();
export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [projects, setProjects] = useState([]);

  const { data, error, loading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/projects",
  );

  useEffect(() => {
    if (data) {
      setProjects(data);
      console.log(data);
    }
  }, [data]);

  const addProject = async (projectData) => {
    const res = await fetch(
      "https://work-asana-backend-puce.vercel.app/projects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to add project");
    }

    toast.success("Project added");

    setProjects((prev) => [...prev, data.savedProject]);

    return data.savedProject;
  };
  return (
    <ProjectContext.Provider value={{ projects, loading, error, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
