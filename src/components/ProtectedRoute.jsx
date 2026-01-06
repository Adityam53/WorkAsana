import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
