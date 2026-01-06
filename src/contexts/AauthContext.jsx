import { createContext, useContext, useEffect, useState } from "react";

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

    if (!response.ok) {
      throw new Error("Invalid Credentials");
    }

    const data = await response.json();
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

    if (!response.ok) {
      throw new Error("SignUp failed");
    }
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

        if (response.status === 401 || response.status === 403) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error("Server error");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Auth fetch failed:", error);
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
