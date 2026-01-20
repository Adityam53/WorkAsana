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
    "https://work-asana-backend-puce.vercel.app/projects"
  );

  useEffect(() => {
    if (data) {
      setProjects(data);
      console.log(data);
    }
  }, [data]);

  const addProject = async (projectData) => {
    try {
      const res = await fetch(
        "https://work-asana-backend-puce.vercel.app/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!res.ok) {
        toast.error("Failed to add Project");
        throw new Error(`Failed to add Project`);
      }

      const data = await res.json();
      toast.success("Project Added");
      console.log(data);

      setProjects((prev) => [...prev, data.savedProject]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, error, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
