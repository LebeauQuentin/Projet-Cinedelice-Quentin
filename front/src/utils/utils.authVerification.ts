import { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router";
import { useModal } from "../contexts/modal.context";

export const useAuthVerification = (userType: string) => {
  const { user, handleAutoLogin} = useAuth();
  const navigate = useNavigate();
  const { setIsModalProfilOpen } = useModal();

  useEffect(() => {
    // redirige vers la page d'accueil si l'utilisateur n'as plus de session
    if (userType === "user" && !user) {
      // console.log("user redirige vers la page d'accueil");
      navigate("/");
    }

    if (userType === "admin" && (!user || !user.is_admin)) {
      // console.log("admin redirige vers la page d'accueil");
      navigate("/");
    }

    if(userType === "profil" && !user) {
      // console.log("user ferme le modal profil");
      setIsModalProfilOpen(false);
    }


  }, [user, navigate, userType, handleAutoLogin, setIsModalProfilOpen]);
}
