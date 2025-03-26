import "./CategoriesFormAdmin.css";
import { useEffect, useState } from "react";
import { getOneCategory, updateCategory, deleteCategory } from "../../../services/api-category";
import { ICategory } from "../../../@types";
import { toast } from "react-toastify";
import ModalDeleteBox from "../../Modals/ModalDeleteBox/ModalDeleteBox";
import { useVar } from "../../../contexts/var.context";
import { useQuery } from '@tanstack/react-query';

export default function CategoriesFormAdmin({ categoryId, onBack }: CategoriesFormAdminProps)  {
  
  const [ category, setCategory] = useState<ICategory | null>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen ] = useState<boolean>(false);

  // On importe le setter dans le VAR CONTEXT permettant d'actualiser la liste des régimes apres modification ou supression d'un ingredients
  const {setUpdateTriggerCategories} = useVar()

  // Utilisation de React Query pour gérer la requête
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getOneCategory(Number(categoryId)),
    retry: 2, // Nombre de tentatives en cas d'échec
  });

  useEffect(() => {
    if(data) {setCategory(data)}
  }, [data]);

  // Soumission du formulaire de Modification
  const handleSubmit = async (e: React.FormEvent) => {
    // Annulation du comportement par défault
    e.preventDefault();
    // Si aucun régime n'a été trouvé on annule
    if (!category) return;
    // Lors de l'envoi du formulaire, l'on supprime les données que l'on a pas besoin d'envoyer
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, deleted_at, created_at, updated_at, ...filteredData } = category;
  
    // On essaie de mettre à jour la catégorie
    try {
      const updated = await updateCategory(category.id, filteredData);
  
      if (updated) {
        toast.success("Catégorie mis à jour");
        // Après la MAJ, on déclenche le raffraichissement
        setUpdateTriggerCategories((prev) => !prev);
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
    if (category) {
      try {
        const deleted = await deleteCategory(category.id);
        if (deleted) {
          toast.success("Catégorie supprimé");
          // Après la suppression, on déclenche le raffraichissement
          setUpdateTriggerCategories((prev) => !prev);
          onBack();
        } else {
          toast.error("La supression a échoué.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression de la categorie :", err);
        toast.error("La supression a échoué.");
      }
    }
    setIsModalDeleteOpen(false);
  };
  return (
  <>

  {/* Gestion du chargement */}
  {isLoading && <p className="loading_message">Chargement de la catégorie. Votre séance va commencer...</p>}

  {/* Gestion des erreurs */}
  {error && <p className="error_message">Impossible de charger la catégorie. Veuillez réessayer plus tard.</p>}

  {/* Affichage des catégories si elles sont disponibles */}
  {data && (
      <div className="category_form_admin_container">
      <div className="category_admin_container_infos">
        <div className="category_admin_container_infos_title">
          <h2>{category?.name}</h2>
          <p>Couleur : {category?.color}</p>

          <time className="category_admin_container_infos_title_date" dateTime={category?.created_at}>
            <p>Créé le : </p>
             {category?.created_at && new Date(category?.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </time>
        </div>
      </div>

      <form className="category_form_admin_container_form" onSubmit={handleSubmit} noValidate>
        <div className="category_form_admin_container_name">
           <label htmlFor="name">Nom de catégorie</label>
           <input type="text" id="name" name="name" value={category?.name ?? ""} onChange={(e) => setCategory(category ? {...category, name: e.target.value} : null)} />  
        </div>

        <div className="category_form_admin_container_color">
          <label htmlFor="color"> Couleur</label>
          <input type="color" id="color" name="color" value={category?.color ?? ""} onChange={(e) => setCategory(category ? {...category, color: e.target.value} : null)} />
        </div>

        <div className="admin_button_form_category">
          <button type="submit" className="admin_button_validate_category">
            Valider
          </button>
          <button type="button" onClick={onBack} className="admin_button_reset_category">
            Annuler
          </button>
          <button type="button" onClick={() => setIsModalDeleteOpen(true)} className="admin_button_delete_category">
            Supprimer
          </button>
        </div>
      </form>
    </div>)}
    <ModalDeleteBox isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} onDelete={handleDelete} description="Voulez-vous vraiment supprimer cette catégorie ?" title="Suppression de catégorie" />
 
  </>
  );
}

interface CategoriesFormAdminProps {
  categoryId: number | null;
  onBack: () => void;
}

