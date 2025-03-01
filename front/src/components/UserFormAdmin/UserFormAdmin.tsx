import "./UserFormAdmin.css";
import { useEffect, useState } from "react";
import { getOneUser, deleteUser, isAdminUser, updateUser} from "../../services/api-users";
import { toast } from "react-toastify";
import ModalDeleteBox from "../ModalDeleteBox/ModalDeleteBox";
import { useQuery } from '@tanstack/react-query';
import { IUser } from "../../@types";
export default function UserFormAdmin({ userId, onBack }: UserFormAdminProps)  {
  
  const [isModalDeleteOpen, setIsModalDeleteOpen ] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Utilisation de React Query pour gérer la requête
  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getOneUser(Number(userId)),
    retry: 2, // Nombre de tentatives en cas d'échec
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      const updatedUser = await updateUser(user.id, user.last_name, user.first_name, user.email);
      if (!updatedUser || typeof updatedUser === "string") {
          toast.error(updatedUser);
          return;
      }
      toast.success("Mise à jour réussie");
      setUser(updatedUser);
    }
  }
  
  // Gestion de la soumission de la validation
  const handleSubmitIsAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const is_admin = user?.is_admin;
    const userId = user?.id;

    if (!userId || is_admin === undefined) {
      return;
    }
    const isUserAmdin = await isAdminUser(userId, is_admin);
    
    if (!isUserAmdin) {
      toast.error("Erreur lors de la validation du status de l'utilisateur");
      return;
    }
    toast.success("Le changement de status de l'utilisateur a été effectué");
    onBack();
  }
    



  // Bouton de suppression de l'utilisateur
  const handleDelete = async () => {
    if (user) {
      try {
        const deleted = await deleteUser(user.id);
        if (deleted) {
          toast.success("Utilisateur supprimé");
          onBack();
        } else {
          toast.error("La supression a échoué.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur' :", err);
        toast.error("La supression a échoué.");
      }
    }
    setIsModalDeleteOpen(false);
  };
  return (
    <>
      <div className="user_form_admin_container">
      <div className="user_admin_container_infos">
        <div className="user_admin_container_infos_title">
          <h2>{user?.first_name} {user?.last_name}</h2>
          <p>ID : {user?.id}</p>

          <time className="user_admin_container_infos_title_date" dateTime={user?.created_at}>
            <p>Créé le : </p>
             {user?.created_at && new Date(user?.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </time>
        </div>
      </div>

      <form className="user_form_admin_container_form" onSubmit={handleSubmit} >
        <div className="user_form_admin_container_name">
           <label htmlFor="name">Email</label>
           <input type="text" id="name" name="name" value={user?.email || ""} onChange={(e) => setUser(user ? {...user, email: e.target.value} : null)} />  
        </div>

        <div className="user_form_admin_container_name">
           <label htmlFor="name">Prénom</label>
           <input type="text" id="firstname" name="firstname" value={user?.first_name || ""} onChange={(e) => setUser(user ? {...user, first_name: e.target.value} : null)} />  
        </div>

        <div className="user_form_admin_container_name">
           <label htmlFor="name">Nom</label>
           <input type="text" id="lastname" name="lastname" value={user?.last_name || ""} onChange={(e) => setUser(user ? {...user, last_name: e.target.value} : null)} />  
        </div>
        <button className="user_form_admin_container_button" type="submit">Enregistrer</button>
      </form>

        <div className="user_form_admin_container_validation">
          <form className="user_user_admin_container_validation_form" onSubmit={handleSubmitIsAdmin}>
            <div className="user_form_admin_container_validation_form_checkbox">
              <p className="user_form_admin_container_validation_p">Passer le status en administrateur</p>
              <label className="switch">
                <input
                  type="checkbox" 
                  checked={user?.is_admin} 
                  onChange={(e) => setUser(user ? {...user, is_admin: e.target.checked} : null)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <button type="submit" className="user_form_admin_container_validation_button">
            Valider
          </button>
          </form> 
        </div>
        
        <div className="admin_button_form_user">

          <button type="button" onClick={onBack} className="admin_button_reset_user">
            Annuler
          </button>
          <button type="button" onClick={() => setIsModalDeleteOpen(true)} className="admin_button_delete_user">
            Supprimer
          </button>
        </div>
      </div>
      <ModalDeleteBox isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} onDelete={handleDelete} description="Voulez-vous vraiment supprimer cet utilisateur ?" title="Suppression de l'utilisateur" />
    </>
  );
}

interface UserFormAdminProps {
  userId: number | null;
  onBack: () => void;
}

