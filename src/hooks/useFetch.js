import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers.authorization = `Bearer ${token}`;

        const response = await fetch(url, {
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};
