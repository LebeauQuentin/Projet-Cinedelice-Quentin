import { IIngredients } from "../@types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getAllIngredients() {
    try {
    // On récupère les ingrédients : fetch : GET /api/ingredients
    const httpResponse = await fetch(`${apiBaseUrl}/ingredients`);
    // CAS où le backend répond mais avec un statut d'erreur
    if (! httpResponse.ok) {
      console.error(httpResponse);
      return null; // si une erreur a lieu, on renvoie null
    }
    
    const ingredients = await httpResponse.json(); // [{}, {}, {}]
    return ingredients;
    
  } catch (error) {
    // CAS où le backend ne répond pas
    console.error(error);
    return null; // Si une erreur a lieu, on renvoie null
  };
};

// Récuperer un ingredient
export async function getOneIngredient(id:number): Promise<IIngredients | null> {
  try {
     const httpResponse = await fetch(`${apiBaseUrl}/ingredients/${id}`);
  if(!httpResponse.ok) {
    console.error(httpResponse);
    return null;
  }
 const ingredient = await httpResponse.json(); // [{}, {}, {}]
 return ingredient;

  } catch (error) {
     // CAS où le backend ne répond pas
     console.error(error);
     return null; // Si une erreur a lieu, on renvoie null
  };
};

// Création d'un ingredient 
export async function createIngredient(ingredientData:any): Promise<IIngredients | null> {
  try {
  const httpResponse = await fetch(`${apiBaseUrl}/ingredients`, {
    method: "POST", // je cible la route `POST`
    headers: {"Content-Type": "application/json"}, // je préviens que j'envoie du JSON
    body: JSON.stringify(ingredientData), // j'envoie mes données en JSON
  });
  if (! httpResponse.ok) {
    console.error(httpResponse);
    return null;
  };
  const createdIngredient = await httpResponse.json();
  return createdIngredient;
  } catch (error) {
    console.error(error);
    return null;
  };  
};

export async function updateIngredient(data: any, id: number): Promise<IIngredients | null> {
  try {
  const ingredientToUpdateUrl = `${apiBaseUrl}/ingredients/${id}` 
  const httpResponse = await fetch(ingredientToUpdateUrl, {
   method: "PATCH", 
   headers: {"Content-type": "application/json"},
   body: JSON.stringify(data),
  });
  if (! httpResponse.ok) {
   console.error(httpResponse);
   return null
  };
  const updatedIngredient = await httpResponse.json();
  return updatedIngredient
  } catch (error) {
   console.error(error);
   return null;
  };
 };

// Suppression d'un ingredient
export async function deleteIngredient(id: number): Promise<boolean> {
  try {
  const httpResponse= await fetch(`${apiBaseUrl}/ingredients/${id}`, {
    method:"DELETE",
  })
  //CAS où le backend répond mais avec un statut d'erreur
  if(!httpResponse.ok) {
    console.error(httpResponse);
    // si une erreur a lieu, on renvoie null
    return false;
  };
  return httpResponse.ok

  } catch (error) {
    console.error(error);
    return false
  };
 }; 


