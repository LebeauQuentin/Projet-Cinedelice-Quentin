const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getAllDiets() {

    try {
    // On récupère les régimes : fetch : GET /api/diets
    const httpResponse = await fetch(`${apiBaseUrl}/diets`);
    // CAS où le backend répond mais avec un statut d'erreur
    if (! httpResponse.ok) {
      console.error(httpResponse);
      return null; // si une erreur a lieu, on renvoie null
    }
    
    const diets = await httpResponse.json(); // [{}, {}, {}]
    return diets;
    
  } catch (error) {
    // CAS où le backend ne répond pas
    console.error(error);
    return null; // Si une erreur a lieu, on renvoie null
  };
};

// on recupere un regime

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getOneDiet(id: number): Promise<any> {
  
  
  try {
  // On récupère le regime associer : fetch : GET /api/diets/:id
  const httpResponse = await fetch(`${apiBaseUrl}/diets/${id}`);
  // CAS où le backend répond mais avec un statut d'erreur
  if (! httpResponse.ok) {
    console.error(httpResponse);
    return null; // si une erreur a lieu, on renvoie null
  }
  
  const recipe = await httpResponse.json(); // [{}, {}, {}]
  return recipe;
  
  } catch (error) {
    // CAS où le backend ne répond pas
    console.error(error);
    return null; // Si une erreur a lieu, on renvoie null
  };
};


// on crée un regime

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createDiet(dietData:any): Promise<any> {
  try {
    //enregistrer  la nouvelle category dans api 
  const httpResponse = await fetch(`${apiBaseUrl}/diets`, {
    method: "POST", // je cible la route `POST`
    headers: {"Content-Type": "application/json"}, // je préviens que j'envoie du JSON
    body: JSON.stringify(dietData), // j'envoie mes données en JSON
  });
  if (! httpResponse.ok) {
    console.error(httpResponse);
    return null;
  }
  const createdDiet = await httpResponse.json();
  return createdDiet;
  } catch (error) {
    console.error(error);
    return null;
  }  
} 

// on modifier un regime 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateDiet(id: number, data: any): Promise<any> {
  try {
   //recuperer la category a modifier
  const dietToUpdateUrl = `${apiBaseUrl}/diets/${id}` 
  const httpResponse = await fetch(dietToUpdateUrl, {
   method: "PATCH", 
   headers: {"Content-type": "application/json"},
   body: JSON.stringify(data),
  });
  if (! httpResponse.ok) {
   console.error(httpResponse);
   return null
  };
  const updatedDiet = await httpResponse.json();
  return updatedDiet
  } catch (error) {
   console.error(error);
   return null;
  };
};
 // on supprime  un regime
export async function deleteDiet(id: number) : Promise<boolean> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/diets/${id}`, {
      method: "DELETE",
    });
    if (!httpResponse.ok) {
      console.error(httpResponse);
      return false;
    }
    return httpResponse.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
