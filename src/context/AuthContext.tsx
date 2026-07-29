import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
  } from "react";
  import type { UserRole } from "../types/Role";
  
  type User = {
    name: string;
    email: string;
    role: UserRole;
  };
  
  type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    setRole: (role: UserRole) => void;
  };
  
  const AuthContext = createContext<AuthContextValue | undefined>(undefined);
  
  const STORAGE_KEY = "cloudops-user";
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
      const savedUser = localStorage.getItem(STORAGE_KEY);
  
      if (!savedUser) {
        return null;
      }
  
      try {
        return JSON.parse(savedUser) as User;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    });
  
    useEffect(() => {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, [user]);
  
    function login(email: string, password: string) {
      if (email.trim() === "" || password.trim() === "") {
        return false;
      }
  
      setUser({
        name: "Raymond Wannamaker",
        email,
        role: "Admin",
      });
  
      return true;
    }
  
    function logout() {
      setUser(null);
    }
  
    function setRole(role: UserRole) {
      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              role,
            }
          : null,
      );
    }
  
    const value = useMemo(
      () => ({
        user,
        isAuthenticated: user !== null,
        login,
        logout,
        setRole,
      }),
      [user],
    );
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuth must be used inside an AuthProvider.");
    }
  
    return context;
  }