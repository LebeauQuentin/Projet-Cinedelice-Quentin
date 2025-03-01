import { createContext, useContext } from "react";
import { ICategory, IDiets, IIngredients, IMovie, IRecipe } from "../@types";

interface IVarContext {
    headerLogo: string;
    setHeaderLogo: (value : string) => void;
    recipes: IRecipe[],
    ingredients: IIngredients[],
    categories: ICategory[],
    diets: IDiets[],
    movies: IMovie[],
    setUpdateTriggerRecipes: (value: boolean | ((prev: boolean) => boolean)) => void; // Ajout de setUpdateTrigger
    setUpdateTriggerIngredients: (value: boolean | ((prev: boolean) => boolean)) => void;
    setUpdateTriggerCategories: (value: boolean | ((prev: boolean) => boolean)) => void; 
    setUpdateTriggerDiets: (value: boolean | ((prev: boolean) => boolean)) => void;
    setUpdateTriggerMovies: (value: boolean | ((prev: boolean) => boolean)) => void;
    isLoading: boolean;
    error: string | Error | null;
}

export const VarContext = createContext<IVarContext>({
    headerLogo: "O'clock Présente",
    setHeaderLogo: () => {},
    recipes: [],
    ingredients: [],
    categories: [],
    diets: [],
    movies: [],
    setUpdateTriggerRecipes: () => {}, 
    setUpdateTriggerIngredients: () => {}, 
    setUpdateTriggerCategories: () => {}, 
    setUpdateTriggerDiets: () => {},
    setUpdateTriggerMovies: () => {}, 
    isLoading: false,
    error: null,
});

export const useVar = () => {
    return useContext(VarContext);
}

