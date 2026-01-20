import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "./AauthContext";
import { toast } from "react-toastify";

const TeamContext = createContext();

export const useTeamContext = () => useContext(TeamContext);
export const TeamProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [teams, setTeams] = useState([]);
  const { data, error, loading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/teams"
  );

  useEffect(() => {
    if (data) {
      setTeams(data);
      console.log(data);
    }
  }, [data]);

  const addTeam = async (teamData) => {
    try {
      const res = await fetch(
        "https://work-asana-backend-puce.vercel.app/teams",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(teamData),
        }
      );

      if (!res.ok) {
        toast.error("Failed to add Team");
        throw new Error("Failed to add team");
      }

      const data = await res.json();
      toast.success("Team added");

      console.log(data);

      setTeams((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TeamContext.Provider value={{ teams, loading, error, addTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
