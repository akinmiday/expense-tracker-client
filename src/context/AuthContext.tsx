import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const storedAuthData = localStorage.getItem("auth");

    if (storedAuthData) {
      const { isAuthenticated, expirationTime } = JSON.parse(storedAuthData);

      // Check if the session is still valid (1 hour expiration)
      if (new Date().getTime() < expirationTime) {
        setIsAuthenticated(isAuthenticated);
      } else {
        // Session expired, remove from localStorage
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = () => {
    // Set authentication data in localStorage with expiration time
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
    const authData = {
      isAuthenticated: true,
      expirationTime,
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("auth");
    setIsAuthenticated(false);

    // Optional: Call API to handle server-side logout (if required)
    axios.post("/api/logout", {}, { withCredentials: true }).then(() => {
      setIsAuthenticated(false);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
