import { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router";
import { useModal } from "../contexts/modal.context";

// Fonction pour vérifier si l'utilisateur est connecté
export const useAuthVerification = (userType: string) => {
  const { user, handleAutoLogin} = useAuth();
  const navigate = useNavigate();
  const { setIsModalProfilOpen } = useModal();

  useEffect(() => {
    // redirige vers la page d'accueil si l'utilisateur n'as plus de session
    if (userType === "user" && !user) {
      navigate("/");
    }

    if (userType === "admin" && (!user || !user.is_admin)) {
      navigate("/");
    }

    if(userType === "profil" && !user) {
      setIsModalProfilOpen(false);
    }


  }, [user, navigate, userType, handleAutoLogin, setIsModalProfilOpen]);
}
