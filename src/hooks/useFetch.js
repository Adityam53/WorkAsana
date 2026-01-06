import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers.authorization = `Bearer ${token}`;

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
  }, [url]);

  return { data, loading, error };
};
