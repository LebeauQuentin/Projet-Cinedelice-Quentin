import "./UsersListAdmin.css";
import { useEffect, useState } from "react";
import { IUser } from "../../../@types";
import { getAllUsers } from "../../../services/api-users";
import { DashboardAdminVue } from "../../../@types";
import { useQuery } from '@tanstack/react-query';

export default function UsersListAdmin({setCurrentView, setSelectedUserId}: UserAdminProps) {
  
   // On crée une fonction qui dirige vers la page de modification d'un régime (fonction dans le Onclick)
   function onUserClick(userId: number) {
    setSelectedUserId(userId);
    setCurrentView(DashboardAdminVue.USER_FORM);
  }

  //Récuperation les utilisateurs au chargement de la page
  const [users, setUsers] = useState<IUser[] | null>([])
  
  // Utilisation de React Query pour gérer la requête
  const { data : dataUsers, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    retry: 2, // Nombre de tentatives en cas d'échec
  });

  useEffect(() => {
    if(dataUsers) {setUsers(dataUsers)}
  }, [dataUsers]);
  
  return (

    <div >
      {/* Gestion du chargement */}
      {isLoading && <p className="loading_message">Chargement des utilisateurs. Votre séance va commencer...</p>}

      {/* Gestion des erreurs */}
      {error && <p className="error_message">Impossible de charger les utilisateurs. Veuillez réessayer plus tard.</p>}

      {/* Affichage des recettes si elles sont disponibles */}
      {dataUsers && (
      <ul className="user_admin_container">
        {
          users?.map((user) => (
            <li key={user.id} className="user_admin_item" data-user-id={user.id} onClick={() => onUserClick(user.id)}> 
                <div className="user_admin_item_title">
                  <p className="user_admin_item_p">Id : {user.id} </p>
                  <p className="user_admin_item_p">Email : {user.email} </p>
                  <p className="user_admin_item_p"> Lastname : {user.last_name} </p>
                  <p className="user_admin_item_p">Status : {user.is_admin ? "Admin" : "Membre"} </p>
                </div>
            </li>
            )
          )
        }
      </ul>)}
    </div>
  )
}

interface UserAdminProps {
  setSelectedUserId: (UserId: number) => void;
  setCurrentView: (view: DashboardAdminVue) => void;
}