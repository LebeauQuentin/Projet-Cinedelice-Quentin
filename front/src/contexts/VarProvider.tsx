import { useEffect, useState } from "react";
import { VarContext } from "./var.context";
import { getAllRecipes } from "../services/api-recipe";
import { getAllIngredients } from "../services/api-ingredient";
import { getAllCategories } from "../services/api-category";
import { getAllDiets } from "../services/api-diet";
import { getAllMovies } from "../services/api-movie";
import { useQuery} from '@tanstack/react-query';

export const VarProvider = ({ children }: { children: React.ReactNode }) => {
  //les variables d'état pour Changer le logo en fonction de la page
  const [ headerLogo, setHeaderLogo ] = useState<string>("O'clock Présente");

  // Variables pour rappeler les élements apres MAJ (create / update / delete)
  const [updateTriggerRecipes, setUpdateTriggerRecipes] = useState<boolean>(false);
  const [updateTriggerIngredients, setUpdateTriggerIngredients] = useState<boolean>(false);
  const [updateTriggerCategories, setUpdateTriggerCategories] = useState<boolean>(false);
  const [updateTriggerDiets, setUpdateTriggerDiets] = useState<boolean>(false);
  const [updateTriggerMovies, setUpdateTriggerMovies] = useState<boolean>(false);
  
  function useDelayedLoading(isLoading: boolean, delay = 200) {
    const [showLoader, setShowLoader] = useState(false);
  
    useEffect(() => {
      let timer: number;
      if (isLoading) {
        // Délai avant d'afficher le loader
        timer = setTimeout(() => setShowLoader(true), delay);
      } else {
        // Cache immédiatement le loader
        setShowLoader(false);
      }
  
      return () => clearTimeout(timer);
    }, [isLoading, delay]);
  
    return showLoader;
  }

  // Fetch avec React Query
  const { data : recipes = [], isLoading: isLoadingRecipes, error: errorRecipes, refetch: refetchRecipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
    retry: 2,
  });

  const { data: ingredients = [], isLoading: isLoadingIngredients, error: errorIngredients, refetch: refetchIngredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getAllIngredients,
    retry: 2,
  });

  const { data: categories = [], isLoading: isLoadingCategories, error: errorCategories, refetch: refetchCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    retry: 2,
  });

  const { data: diets = [], isLoading: isLoadingDiets, error: errorDiets, refetch: refetchDiets } = useQuery({
    queryKey: ["diets"],
    queryFn: getAllDiets,
    retry: 2,
  });

  const { data: movies = [], isLoading: isLoadingMovies, error: errorMovies, refetch: refetchMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: getAllMovies,
    retry: 2,
  });

  // Gestion globale du chargement et des erreurs
  const isLoadingNotDelay = isLoadingRecipes || isLoadingIngredients || isLoadingCategories || isLoadingDiets || isLoadingMovies;
  const isLoading = useDelayedLoading(isLoadingNotDelay, 200); // ⬅️ Ajoute le délai avant d'afficher le loader
  const error = errorRecipes || errorIngredients || errorCategories || errorDiets || errorMovies;
  

  // Watcher pour recettes
  useEffect(() => {
      refetchRecipes();
  }, [updateTriggerRecipes, refetchRecipes]);

  // Watcher pour Ingredients
  useEffect(() => {
    refetchIngredients()
  }, [updateTriggerIngredients, refetchIngredients]);

  // Watcher pour Categories
  useEffect(() => {
      refetchCategories();
  }, [updateTriggerCategories, refetchCategories]);

  // Watcher pour Diets
  useEffect(() => {
      refetchDiets();
  }, [updateTriggerDiets, refetchDiets]);

  // Watcher pour Movies
  useEffect(() => {
      refetchMovies();
  }, [updateTriggerMovies, refetchMovies]);


  return (
      <VarContext.Provider value={{ 
        headerLogo, 
        setHeaderLogo, 
        recipes, 
        ingredients, 
        categories, 
        diets,
        movies,
        setUpdateTriggerRecipes,
        setUpdateTriggerIngredients,
        setUpdateTriggerCategories,
        setUpdateTriggerDiets,
        setUpdateTriggerMovies,
        isLoading,
        error,
        }}>

          {children}
      </VarContext.Provider>
  );
};

