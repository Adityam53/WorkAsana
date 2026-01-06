import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const OwnersContext = createContext();
export const useOwnersContext = () => useContext(OwnersContext);

export const OwnerProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { data, error, loading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/users"
  );

  useEffect(() => {
    if (data) {
      setUsers(data);
      console.log(data);
    }
  }, [data]);
  return (
    <OwnersContext.Provider value={{ users, error, loading }}>
      {children}
    </OwnersContext.Provider>
  );
};
