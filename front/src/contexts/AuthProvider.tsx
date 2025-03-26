import { useState, useEffect } from "react";
import { AuthContext } from "./auth.context";
import { IUser } from "../@types";
import { login } from '../services/api-auth';
import { getUserMe } from '../services/api-auth';
import { register } from '../services/api-auth';
import { logout } from '../services/api-auth';
import { toast } from "react-toastify";
import { useModal } from "./modal.context";
import { deleteUser, updateUser } from "../services/api-users";
import { useNavigate } from "react-router";

// Provider pour l'authentification

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const { setIsModalLoginOpen, setIsModalRegisterOpen, setIsModalProfilOpen, setIsModalMessageBoxOpen, isModalMessageBoxOpen } = useModal();
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [cookieExpiry, setCookieExpiry] = useState<number | null>(null);
    const [isMessageSession, setIsMessageSession] = useState<boolean>(false);

    async function handleLogin(email: string, password: string) {
        setCookieExpiry(null);//reste le cookie null pour reinitialiser le timer de session
        const isLogged = await login(email, password);
        if (!isLogged || typeof isLogged === "string") {
            toast.error(isLogged);
            return;
        }
        
        const user = await getUserMe();
        setUser(user);
        toast.success("Connexion réussie");
        setIsModalLoginOpen(false);
        const cookieExpiry = getCookieExpiry();
        setCookieExpiry(cookieExpiry);
        setIsMessageSession(false);
        if(!isConnected) {
          navigate("/myRecipes");// redirige vers la page myRecipes une fois connecté
          setIsConnected(true);
        }
    }

    async function handleRegister(lastname: string, firstname: string, email: string, password: string, confirmPassword: string) {
        const isRegistered = await register(lastname, firstname, email, password, confirmPassword);
        if (!isRegistered || typeof isRegistered === "string") {
            toast.error(isRegistered);
            return;
        }
        toast.success("Inscription réussie");
        setIsModalRegisterOpen(false);
        setIsModalLoginOpen(true);
    }

    async function handleLogout() {
        const isLoggedOut = await logout();
        if (!isLoggedOut) {
            toast.error("Déconnexion échouée");
            return;
        }
        setUser(null);
        setIsConnected(false);
        setCookieExpiry(null);
        setIsMessageSession(false)
        toast.info("Déconnexion réussie");
    }

    async function handleUpdateUser(id: number, lastname: string, firstname: string, email: string) {
        const updatedUser = await updateUser(id, lastname, firstname, email);
        if (!updatedUser || typeof updatedUser === "string") {
            toast.error(updatedUser);
            return;
        }
        toast.success("Mise à jour réussie");
        setUser(updatedUser);
        setIsModalProfilOpen(false);
    }

    async function handleDeleteUser(id: number) {
        const isDeleted = await deleteUser(id);
        if (!isDeleted || typeof isDeleted === "string") {
            toast.error(isDeleted);
            return;
        }
        toast.info("Suppression réussie");
        setUser(null);
        setIsConnected(false);
        setIsModalProfilOpen(false);
    }

    async function handleAutoLogin() {
        setCookieExpiry(null);//reste le cookie null pour reinitialiser le timer de session
        const user = await getUserMe();
        if(user){
            const cookieExpiry = getCookieExpiry();
            setCookieExpiry(cookieExpiry);
            setIsConnected(true);
            setUser(user);
            return; 
        }
        setUser(null);
        setIsConnected(false);
    }

    // ici faire la gestion de l'authentification automatique avec timer
    useEffect(() => {
        // authentication automatique
        handleAutoLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // récupérer la date d'expiration du cookie
    function getCookieExpiry() {
        const cookie = document.cookie;
        const cookieExpiry = cookie.split("; ").find(row => row.startsWith("x-auth-token-expiry="));
        if(cookieExpiry) {
            return parseInt(cookieExpiry.split("=")[1]);
        }
        return null;
    }

    useEffect(() => {
        const updateTimeRemaining = () => {
            if(!cookieExpiry) {
                setTimeRemaining(0);
                return;
            }
            const timeRemaining = Math.floor((cookieExpiry - Date.now()) / (1000 * 60));
            if(timeRemaining <= 3 && timeRemaining > 0) {
                setTimeRemaining(timeRemaining);// problème réglé sur le timeRemaining à voir, à optimiser
                if(!isMessageSession) {
                    setIsModalMessageBoxOpen(true);
                    setIsMessageSession(true);
                }
            }
            if(timeRemaining <= 0 && isConnected && isMessageSession) {
                handleLogout();
                setIsModalMessageBoxOpen(false);
                setIsMessageSession(false);
            }
        }
        updateTimeRemaining();
        const timer = setInterval(updateTimeRemaining, 1000);
        return () => clearInterval(timer);
    }, [cookieExpiry, isModalMessageBoxOpen, setIsModalMessageBoxOpen, isConnected, isMessageSession, setIsMessageSession, setCookieExpiry]);


    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin, handleRegister, handleLogout, handleUpdateUser, handleDeleteUser, handleAutoLogin, timeRemaining, setTimeRemaining }}>{children}</AuthContext.Provider>
    );
}
