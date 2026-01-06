import { useContext } from "react";
import { createContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { useState } from "react";

const TagContext = createContext();
export const useTagContext = () => useContext(TagContext);
export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const { data, error, loading } = useFetch(
    "https://work-asana-backend-puce.vercel.app/tags"
  );

  useEffect(() => {
    if (data) {
      setTags(data);
      console.log(data);
    }
  }, [data]);
  return (
    <TagContext.Provider value={{ tags, error, loading }}>
      {children}
    </TagContext.Provider>
  );
};
