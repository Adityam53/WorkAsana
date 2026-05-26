import { useSearchParams } from "react-router-dom";

export const useTaskQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const project = searchParams.get("project") || "";
  const team = searchParams.get("team") || "";
  const owner = searchParams.get("owner") || "";
  const status = searchParams.get("status") || "";
  const tags = searchParams.get("tags") || "";

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();

    params.set("page", "1");

    setSearchParams(params);
  };

  return {
    page,
    project,
    team,
    owner,
    status,
    tags,
    updateFilter,
    setPage,
    clearFilters,
  };
};
