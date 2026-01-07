import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Login
  const login = async (email, password) => {
    const response = await fetch(
      "https://work-asana-backend-puce.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // backend already sends correct error message
      alert(data.error || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  //signup
  const signup = async (name, email, password) => {
    const response = await fetch(
      "https://work-asana-backend-puce.vercel.app/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Signup failed");
      return;
    }

    alert("User registered successfully");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://work-asana-backend-puce.vercel.app/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await response.json();

        if (response.status === 401 || response.status === 403) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(userData.error || "Failed to fetch user");
        }

        console.log(userData);

        setUser(userData);
      } catch (error) {
        console.error("Auth fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
