import { createContext, useContext } from "react";
import { IUser } from "../@types";

//  Contexte pour l'authentification

interface AuthContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleRegister: (lastname: string, firstname: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    handleLogout: () => Promise<void>;
    handleUpdateUser: (id: number, lastname: string, firstname: string, email: string) => Promise<void>;
    handleDeleteUser: (id: number) => Promise<void>;
    handleAutoLogin: () => Promise<void>;
    timeRemaining: number;
    setTimeRemaining: (timeRemaining: number) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    handleLogin: async () => {},
    handleRegister: async () => {},
    handleLogout: async () => {},
    handleUpdateUser: async () => {},
    handleDeleteUser: async () => {},
    handleAutoLogin: async () => {},
    timeRemaining: 0,
    setTimeRemaining: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
}
