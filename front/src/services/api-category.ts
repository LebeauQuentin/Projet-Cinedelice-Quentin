import { ICategory } from "../@types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getAllCategories() {
    try {
    // On récupère les categories  : fetch : GET /api/categories
    const httpResponse = await fetch(`${apiBaseUrl}/categories`);
    // CAS où le backend répond mais avec un statut d'erreur
    if (! httpResponse.ok) {
      console.error(httpResponse);
      return null; // si une erreur a lieu, on renvoie null
    }
    
    const categories = await httpResponse.json(); // [{}, {}, {}]
    return categories;
    
  } catch (error) {
    // CAS où le backend ne répond pas
    console.error(error);
    return null; // Si une erreur a lieu, on renvoie null
  };
};

// recuperer une categorie
export async function getOneCategory(id:number): Promise<ICategory | null> {

  try {
     const httpResponse = await fetch(`${apiBaseUrl}/categories/${id}`);
  if(!httpResponse.ok) {
    console.error(httpResponse);
    return null;
  }
 const category = await httpResponse.json(); // [{}, {}, {}]
 return category;

  } catch (error) {
     // CAS où le backend ne répond pas
     console.error(error);
     return null; // Si une erreur a lieu, on renvoie null
  };
};

// creation d'une categorie
export async function createCategory(categoryData:any): Promise<ICategory | null> {
  try {
    //enregistrer  la nouvelle category dans api 
  const httpResponse = await fetch(`${apiBaseUrl}/categories`, {
    method: "POST", // je cible la route `POST`
    headers: {"Content-Type": "application/json"}, // je préviens que j'envoie du JSON
    body: JSON.stringify(categoryData), // j'envoie mes données en JSON
  });
  if (! httpResponse.ok) {
    console.error(httpResponse);
    return null;
  };
  const createdCategory = await httpResponse.json();
  return createdCategory;
  } catch (error) {
    console.error(error);
    return null;
  };  
}; 

// modification d'une categorie

export async function updateCategory(id: number, data: any): Promise<ICategory | null> {
 try {
  //recuperer la categorie a modifier
 const categoryToUpdateUrl = `${apiBaseUrl}/categories/${id}` 
 const httpResponse = await fetch(categoryToUpdateUrl, {
  method: "PATCH", 
  headers: {"Content-type": "application/json"},
  body: JSON.stringify(data),
 });
 if (! httpResponse.ok) {
  console.error(httpResponse);
  return null
 };
 const updatedCategory = await httpResponse.json();
 return updatedCategory
 } catch (error) {
  console.error(error);
  return null;
 };
};

// suppression d'une catégorie
export async function deleteCategory(id: number): Promise<boolean> {
  try {
    // On récupère la categorie : fetch : GET /api/categories/:id
  const httpResponse= await fetch(`${apiBaseUrl}/categories/${id}`, {
    method:"DELETE",
  })
  // CAS où le backend répond mais avec un statut d'erreur
  if(!httpResponse.ok) {
    console.error(httpResponse);
    return false;
  };
  return httpResponse.ok

  } catch (error) {
    console.error(error);
    return false
  };
 };
