import "./DietsAdmin.css";
import { DashboardAdminVue } from "../../@types";
import { useVar } from "../../contexts/var.context";

export default function DietsAdmin({setCurrentView, setSelectedDietId}: DietsAdminProps) {
   // On importe les régimes présent dans le VAR CONTEXT
   const { diets, isLoading, error } = useVar()

   // On crée une fonction qui dirige vers la page de modification d'un régime (fonction dans le Onclick)
   function onDietClick(dietId: number) {
    setSelectedDietId(dietId);
    setCurrentView(DashboardAdminVue.DIETS_FORM);
  }

  // Dans le dashboard on affiche tous les régimes existant pour pouvoir soit en créer un nouveau, soit en supprimer ou en modifier
  return (
    <>
    {/* Bouton pour créer un nouveau regime */}
    <button className="diet_admin_create" onClick={() => setCurrentView(DashboardAdminVue.DIETS_CREATE) }> Créer Nouveau Régime </button> 
    
    {/* Gestion du chargement */}
{isLoading && <p className="loading_message">Chargement des regimes. Votre séance va commencer...</p>}

{/* Gestion des erreurs */}
{error && <p className="error_message">Impossible de charger les reigmes. Veuillez réessayer plus tard.</p>}

{/* Affichage des recettes si elles sont disponibles */}
{diets && (
    <div className="diets_admin_container">
    {/* On fait séléctionne chacun des régimes présent dans l'objet "diets" pour pouvoir les afficher et les sélectionner individuellement */}
       <ul>
        {
          diets.map((diet) => (
            <li key={diet.id} className="diet_admin_item" data-diet-id={diet.id} onClick={() => onDietClick(diet.id)}>  {/* Quand on clique, l'on arrive sur la page 1 régime */}
                <div className="diet_admin_item_title">
                  <p>{diet.name}</p>
                  <div className="diet_admin_item_color" style={{ backgroundColor: diet.color}}></div>
                </div>
            </li>
            )
          )
        }
      </ul>
    </div>)}
    </>
  );
}

interface DietsAdminProps {
  setSelectedDietId: (DietId: number) => void;
  setCurrentView: (view: DashboardAdminVue) => void;
}
