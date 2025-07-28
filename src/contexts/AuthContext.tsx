import { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  balance: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction = 
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "UPDATE_BALANCE"; payload: number };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isAuthenticated: true
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    case "UPDATE_BALANCE":
      return {
        ...state,
        user: state.user ? { ...state.user, balance: action.payload } : null
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

interface AuthContextType {
  state: AuthState;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updateBalance: (balance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: User) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = (updates: Partial<User>) => {
    dispatch({ type: "UPDATE_PROFILE", payload: updates });
  };

  const updateBalance = (balance: number) => {
    dispatch({ type: "UPDATE_BALANCE", payload: balance });
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      logout,
      updateProfile,
      updateBalance
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};