import "./DietsFormAdmin.css";
import { useEffect, useState } from "react";
import { getOneDiet, updateDiet, deleteDiet } from "../../services/api-diet";
import { IDiets } from "../../@types";
import { toast } from "react-toastify";
import ModalDeleteBox from "../ModalDeleteBox/ModalDeleteBox";
import { useVar } from "../../contexts/var.context";
import { useQuery } from '@tanstack/react-query';

export default function DietsFormAdmin({ dietId, onBack }: DietsFormAdminProps) {
  const [diet, setDiet] = useState<IDiets | null>(null);
  const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState<boolean>(false);
  
  // On importe le setter dans le VAR CONTEXT permettant d'actualiser la liste des régimes après modification ou supression d'un régime
  const { setUpdateTriggerDiets } = useVar()

  // Utilisation de React Query pour gérer la requête
  const { data, isLoading, error } = useQuery({
    queryKey: ["diet", dietId],
    queryFn: () => getOneDiet(Number(dietId)),
    retry: 2, // Nombre de tentatives en cas d'échec
  });

  useEffect(() => {
    if(data) {setDiet(data)}
  }, [data]);

  // Soumission du formulaire de Modification
  const handleSubmit = async (e: React.FormEvent) => {
    // Annulation du comportement par défault
    e.preventDefault();
    // Si aucun régime n'a été trouvé on annule
    if (!diet) return;
    // Lors de l'envoi du formulaire, l'on supprime les données que l'on a pas besoin d'envoyer
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, deleted_at, created_at, updated_at, ...filteredData } = diet;
  
    // On essaie de mettre à jour le régime
    try {
      const updated = await updateDiet(diet.id, filteredData);
  
      if (updated) {
        toast.success("Régime mis à jour");
        // Après la MAJ, on déclenche le raffraichissement
        setUpdateTriggerDiets((prev) => !prev);
        onBack();
      } else {
        toast.error("La mise à jour a échoué.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      toast.error("Une erreur est survenue lors de la mise à jour.");
    }
  };

  // Bouton de suppression de recette
  const handleDelete = async () => {
    if (diet) {
      try {
        const deleted = await deleteDiet(diet.id);
        if (deleted) {
          toast.success("Régime supprimé");
          // Après la suppression, on déclenche le raffraichissement
          setUpdateTriggerDiets((prev) => !prev);
          onBack();
        } else {
          toast.error("La supression a échoué.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression du régime :", err);
        toast.error("La supression a échoué.");
      }
    }
    setIsModalDeleteOpen(false);
  };
  
  return (
    <>
  {/* Gestion du chargement */}
  {isLoading && <p className="loading_message">Chargement du régime. Votre séance va commencer...</p>}

  {/* Gestion des erreurs */}
  {error && <p className="error_message">Impossible de charger le régime. Veuillez réessayer plus tard.</p>}

  {/* Affichage des recettes si elles sont disponibles */}
  {data && (
    <div className="diet_form_admin_container">
      <div className="diet_admin_container_infos">
        <div className="diet_admin_container_infos_title">
          <h2>{diet?.name}</h2>
          <p>Couleur : {diet?.color}</p>

          <time className="diet_admin_container_infos_title_date" dateTime={diet?.created_at}>
            <p>Créé le : </p>
             {diet?.created_at && new Date(diet?.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </time>
        </div>
      </div>

      <form className="diet_form_admin_container_form" onSubmit={handleSubmit} noValidate>
        <div className="diet_form_admin_container_name">
           <label htmlFor="name">Nom du régime</label>
           <input type="text" id="name" name="name" value={diet?.name ?? ""} onChange={(e) => setDiet(diet ? {...diet, name: e.target.value} : null)} />  
        </div>

        <div className="diet_form_admin_container_color">
          <label htmlFor="color"> Couleur</label>
          <input type="color" id="color" name="color" value={diet?.color ?? ""} onChange={(e) => setDiet(diet ? {...diet, color: e.target.value} : null)} />
        </div>

        <div className="admin_button_form_diet">
          <button type="submit" className="admin_button_validate_diet">
            Valider
          </button>
          <button type="button" onClick={onBack} className="admin_button_reset_diet">
            Annuler
          </button>
          <button type="button" onClick={() => setIsModalDeleteOpen(true)} className="admin_button_delete_diet">
            Supprimer
          </button>
        </div>
      </form>
    </div>)}
    <ModalDeleteBox isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} onDelete={handleDelete} description="Voulez-vous vraiment supprimer ce régime ?" title="Suppression de régime" />
  </>
  );
}

interface DietsFormAdminProps {
  dietId: number | null;
  onBack: () => void;
}

