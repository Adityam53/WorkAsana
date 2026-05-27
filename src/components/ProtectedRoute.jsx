import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AauthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
