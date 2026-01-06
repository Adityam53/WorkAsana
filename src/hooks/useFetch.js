import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AauthContext";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { token, loading: authLoading } = useAuthContext();
  useEffect(() => {
    if (!url || !token || authLoading) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch(url, {
          headers,
        });

        if (!response.ok) {
          const err = new Error("Request failed");
          err.status = response.status;
          throw err;
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token, authLoading]);

  return { data, loading, error };
};
