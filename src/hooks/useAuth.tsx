import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser, type UserProfile } from "@/lib/auth";

interface AuthContextValue {
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  profile: null,
  loading: true,
  refreshProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = () => {
    const user = getCurrentUser();
    setProfile(user);
    setLoading(false);
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
