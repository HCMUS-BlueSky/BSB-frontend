import { createContext, useContext, useEffect, useState } from "react";
import { authenticate, refreshToken } from "../apis/services/Auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apis/services/User";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const res = await getUser();
        if (res.statusCode === 401) {
          const refreshRes = await refreshToken();

          if (refreshRes.statusCode !== 200) {
            setIsAuthenticated(false);
            return;
          }

          localStorage.setItem("access_token", refreshRes.data.accessToken);
        }

        if (res.statusCode !== 200) return;
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkTokenValidity();
  }, [isAuthenticated]);

  const login = async (email, password, recaptchaToken) => {
    try {
      const response = await authenticate(email, password, recaptchaToken);
      const { accessToken } = response.data;
      localStorage.setItem("access_token", accessToken);
      setIsAuthenticated(true);
      navigate("/");
    } catch {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, user, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
