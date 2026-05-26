import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AauthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let timer;

    if (!isAuthenticated) {
      timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
    } else {
      setShouldRedirect(false);
    }

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (!isAuthenticated && shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  // if (!isAuthenticated) {
  //   return <div>Redirecting...</div>; // Optional loader/message
  // }

  return children;
};

export default ProtectedRoute;
