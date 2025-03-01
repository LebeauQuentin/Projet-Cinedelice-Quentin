import { IRecipeDataUpdate, IRecipe } from "../@types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
import { IIngredientsList } from '../@types';



export async function getAllRecipes() {
    try {
    // On récupère les recettes : fetch : GET /api/recipe
    const httpResponse = await fetch(`${apiBaseUrl}/recipes`);
    // CAS où le backend répond mais avec un statut d'erreur
    if (! httpResponse.ok) {
      throw new Error(`Erreur HTTP: ${httpResponse.status}`);
    }
    
    const recipes = await httpResponse.json(); // [{}, {}, {}]
    return recipes;
    
  } catch (error) {
    // CAS où le backend ne répond pas
    console.error(error);
    return null; // Si une erreur a lieu, on renvoie null
  };
};

export async function getOneRecipe(id: number) {
  try {
      const httpResponse = await fetch(`${apiBaseUrl}/recipes/${id}`);
      if (!httpResponse.ok) {
          throw new Error(`Erreur HTTP: ${httpResponse.status}`);
      }
      const recipe = await httpResponse.json();
      return recipe;
  } catch (error) {
      console.error("Erreur dans getOneRecipe:", error);
      throw error; // Rejette l'erreur pour qu'elle soit capturée dans le composant
  }
}

// supprimer une recette
export async function deleteRecipe(id: number) : Promise<boolean> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/recipes/${id}`, {
      method: "DELETE",
    });
    if (!httpResponse.ok) {
      throw new Error(`Erreur HTTP: ${httpResponse.status}`);
    }
    return httpResponse.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// valider une recette
export async function validateRecipe(id: number, validated: boolean) : Promise<boolean> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/admin/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ validated }),
    });
    if (!httpResponse.ok) {
      throw new Error(`Erreur HTTP: ${httpResponse.status}`);
    }
    return httpResponse.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// pour update une recette
export async function updateRecipe(id: number, recipeData: IRecipeDataUpdate) : Promise<IRecipe | null> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });
    if (!httpResponse.ok) {
      throw new Error(`Erreur HTTP: ${httpResponse.status}`);
    }
    const recipe = await httpResponse.json();
    return recipe;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function createRecipe(title: string, description: string, duration: number, difficulty: string, ingredients: IIngredientsList[], instruction: string, diets: number[], category_id: number, movie_id: number, user_id: number, image: string) {
  
  try {
  // On créé la recette : fetch : POST /api/recipes
  const httpResponse = await fetch(`${apiBaseUrl}/recipes`, {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, description, duration, difficulty, image, ingredients, instruction, diets, category_id, movie_id, user_id})
  });
  
  // CAS où le backend répond mais avec un statut d'erreur
  if (! httpResponse.ok) {
    console.error(httpResponse);
    return false;
  }

  const createdRecipe = await httpResponse.json();
  return createdRecipe as IRecipe

  } catch (error) {
  // CAS où le backend ne répond pas
    console.error("Erreur lors de la création de la recette :", error);
    return false;
  } 
}
