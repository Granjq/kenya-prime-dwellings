import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: { name: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem("propertyHubSession");
    if (session) {
      const userData = JSON.parse(session);
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  const login = () => {
    const userData = { name: "John Doe", email: "john@example.com" };
    localStorage.setItem("propertyHubSession", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    
    // Fade transition handled in Auth component
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const logout = () => {
    localStorage.removeItem("propertyHubSession");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
