import "./style/DashBoardAdmin.css";
import RecipesAdmin from "../components/Admin/RecipesAdmin/RecipesAdmin";
import {useVar} from "../contexts/var.context";
import { useAuthVerification } from "../utils/utils.authVerification";
import { useEffect, useState } from "react";
import { DashboardAdminVue, adminStatusTitleContent } from "../@types";
import MoviesAdmin from "../components/Admin/MoviesAdmin/MoviesAdmin";
import MoviesFormAdmin from "../components/Admin/MoviesFormAdmin/MoviesFormAdmin";
import MoviesCreateAdmin from "../components/Admin/MoviesCreateAdmin/MoviesCreateAdmin";
import DietsAdmin from "../components/Admin/DietsAdmin/DietsAdmin";
import DietsFormAdmin from "../components/Admin/DietsFormAdmin/DietsFormAdmin";
import DietsCreateAdmin from "../components/Admin/DietsCreateAdmin/DietsCreateAdmin";
import CategoriesAdmin from "../components/Admin/CategoriesAdmin/CategoriesAdmin";
import CategoriesFormAdmin from "../components/Admin/CategoriesFormAdmin/CategoriesFormAdmin";
import CategoriesCreateAdmin from "../components/Admin/CategoriesCreateAdmin/CategoriesCreateAdmin";
import IngredientsAdmin from "../components/Admin/IngredientsAdmin/IngredientsAdmin";
import UsersListAdmin from "../components/Admin/UsersListAdmin/UsersListAdmin";
import UserFormAdmin from "../components/Admin/UserFormAdmin/UserFormAdmin";
import RecipesFormAdmin from "../components/Admin/RecipesFormAdmin/RecipesFormAdmin";

export default function DashboardAdmin() {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()
  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  const { recipes } = useVar();
  const [ currentView, setCurrentView ] = useState<DashboardAdminVue>(DashboardAdminVue.RECIPES_LIST);
  const [ currentViewTitle, setCurrentViewTitle ] = useState<adminStatusTitleContent>(adminStatusTitleContent.RECIPES_LIST);
  const [ selectedRecipeId, setSelectedRecipeId ] = useState<number | null>(null);
  const recipesTabSorted = recipes.sort((a, b) => (a.validated === b.validated ? 0 : a.validated ? 1 : -1));
  const [ selectedMovieId, setSelectedMovieId ] = useState<number | null>(null);
  const [ selectedCategoryId, setSelectedCategoryId ] = useState<number | null>(null);
  const [ selectedDietId, setSelectedDietId ] = useState<number | null>(null);
  const [ selectedUserId, setSelectedUserId ] = useState<number | null>(null);

 // Affiche la vue actuelle en fonction de la valeur de currentView
 const renderCurrentView = () => {
  switch (currentView) {
    case DashboardAdminVue.RECIPES_LIST:
      return <RecipesAdmin recipes={recipesTabSorted} setSelectedRecipeId={setSelectedRecipeId} setCurrentView={setCurrentView} />;
    case DashboardAdminVue.RECIPES_FORM:
      return <RecipesFormAdmin recipeId={selectedRecipeId} setSelectedMovieId={setSelectedMovieId} setCurrentView={setCurrentView} onBack={() => setCurrentView(DashboardAdminVue.RECIPES_LIST)} />;
    case DashboardAdminVue.MOVIES_LIST:
      return <MoviesAdmin setSelectedMovieId={setSelectedMovieId} setCurrentView={setCurrentView}/>;
    case DashboardAdminVue.MOVIES_FORM:
      return <MoviesFormAdmin movieId={selectedMovieId} onBack={() => setCurrentView(DashboardAdminVue.MOVIES_LIST)} />;
    case DashboardAdminVue.MOVIES_CREATE:
      return <MoviesCreateAdmin onBack={() => setCurrentView(DashboardAdminVue.MOVIES_LIST)} />;
    case DashboardAdminVue.CATEGORIES_LIST:
      return <CategoriesAdmin setSelectedCategoryId={setSelectedCategoryId} setCurrentView={setCurrentView}/>;
    case DashboardAdminVue.CATEGORIES_FORM:
      return <CategoriesFormAdmin categoryId={selectedCategoryId} onBack={() => setCurrentView(DashboardAdminVue.CATEGORIES_LIST)} />;
    case DashboardAdminVue.CATEGORIES_CREATE:
      return <CategoriesCreateAdmin onBack={() => setCurrentView(DashboardAdminVue.CATEGORIES_LIST)} />;
    case DashboardAdminVue.DIETS_LIST:
      return <DietsAdmin setSelectedDietId={setSelectedDietId} setCurrentView={setCurrentView}/>;
    case DashboardAdminVue.DIETS_FORM:
      return <DietsFormAdmin dietId={selectedDietId} onBack={() => setCurrentView(DashboardAdminVue.DIETS_LIST)} />;
    case DashboardAdminVue.DIETS_CREATE:
      return <DietsCreateAdmin onBack={() => setCurrentView(DashboardAdminVue.DIETS_LIST)} />;
    case DashboardAdminVue.INGREDIENTS_LIST:
      return <IngredientsAdmin/>;
    case DashboardAdminVue.USER_LIST:
      return <UsersListAdmin setSelectedUserId={setSelectedUserId} setCurrentView={setCurrentView}/>;
    case DashboardAdminVue.USER_FORM:
      return <UserFormAdmin userId={selectedUserId} onBack={() => setCurrentView(DashboardAdminVue.USER_LIST)} />;
        
  }
 }

 // Permet d'afficher le titre du contenu actuelle
 // Dans un useEffect pour que le titre soit affiché correctement
 useEffect(() => {
  switch (currentView) {
    case DashboardAdminVue.RECIPES_LIST:
      setCurrentViewTitle(adminStatusTitleContent.RECIPES_LIST);
      break;
    case DashboardAdminVue.RECIPES_FORM:
      setCurrentViewTitle(adminStatusTitleContent.RECIPES_FORM);
      break;
    case DashboardAdminVue.MOVIES_LIST:
      setCurrentViewTitle(adminStatusTitleContent.MOVIES_LIST);
      break;
    case DashboardAdminVue.MOVIES_FORM:
      setCurrentViewTitle(adminStatusTitleContent.MOVIES_FORM);
      break;
    case DashboardAdminVue.MOVIES_CREATE:
      setCurrentViewTitle(adminStatusTitleContent.MOVIES_CREATE);
      break;
    case DashboardAdminVue.CATEGORIES_LIST:
      setCurrentViewTitle(adminStatusTitleContent.CATEGORIES_LIST);
      break;
    case DashboardAdminVue.CATEGORIES_FORM:
      setCurrentViewTitle(adminStatusTitleContent.CATEGORIES_FORM);
      break;
    case DashboardAdminVue.CATEGORIES_CREATE:
      setCurrentViewTitle(adminStatusTitleContent.CATEGORIES_CREATE);
      break;
    case DashboardAdminVue.DIETS_LIST:
      setCurrentViewTitle(adminStatusTitleContent.DIETS_LIST);
      break;
    case DashboardAdminVue.DIETS_FORM:
      setCurrentViewTitle(adminStatusTitleContent.DIETS_FORM);
      break;
    case DashboardAdminVue.DIETS_CREATE:
      setCurrentViewTitle(adminStatusTitleContent.DIETS_CREATE);
      break;
    case DashboardAdminVue.INGREDIENTS_LIST:
      setCurrentViewTitle(adminStatusTitleContent.INGREDIENTS_LIST);
      break;
    case DashboardAdminVue.USER_LIST:
      setCurrentViewTitle(adminStatusTitleContent.USER_LIST);
      break;
    case DashboardAdminVue.USER_FORM:
      setCurrentViewTitle(adminStatusTitleContent.USER_FORM);
      break;       
  }
 }, [currentView]);

 // Vérification de l'authentification de l'utilisateur
 useAuthVerification("admin");

 return (
  <div className="section_dashboard section">
    <h1>- Gestion du contenu -</h1>
    <div className="dashboard_container_admin">
      <aside className="aside_dashboard_admin">
        <h2 className="title_aside_dashboard_admin">- EDITION -</h2>
        <ul className="list_aside_dashboard_admin">
          <li className="list_aside_dashboard_admin_item" onClick={() => setCurrentView(DashboardAdminVue.RECIPES_LIST)}>Recettes</li>
          <li className="list_aside_dashboard_admin_item" onClick={() => setCurrentView(DashboardAdminVue.USER_LIST)}>Listes des utilisateurs</li>
          <li className="list_aside_dashboard_admin_item" onClick={() => setCurrentView(DashboardAdminVue.CATEGORIES_LIST)}>Catégories</li>
          <li className="list_aside_dashboard_admin_item" onClick={() => setCurrentView(DashboardAdminVue.DIETS_LIST)}>Régimes</li>
          <li className="list_aside_dashboard_admin_item" onClick={() => setCurrentView(DashboardAdminVue.INGREDIENTS_LIST)}>Ingrédients</li>
          <li className="list_aside_dashboard_admin_item" onClick={() => setCurrentView(DashboardAdminVue.MOVIES_LIST)}>Films</li>
        </ul>
      </aside>
      <div className="main_dashboard_admin">
        <h2 className="title_main_dashboard_admin">--{currentViewTitle}--</h2>
        {renderCurrentView()}
      </div>
    </div>
  </div>
 )
}
