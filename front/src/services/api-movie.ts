/* eslint-disable @typescript-eslint/no-explicit-any */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getAllMovies() {
  
    try {
    // On récupère les movies : fetch : GET /api/categories
    const httpResponse = await fetch(`${apiBaseUrl}/movies`);
    // CAS où le backend répond mais avec un statut d'erreur
    if (! httpResponse.ok) {
      console.error(httpResponse);
      return null; // si une erreur a lieu, on renvoie null
    }
    
    const movies = await httpResponse.json(); // [{}, {}, {}]
    return movies;
    
  } catch (error) {
    // CAS où le backend ne répond pas
    console.error(error);
    return null; // Si une erreur a lieu, on renvoie null
  };  
};

// recuperer un film 

export async function getOneMovie(id:number): Promise<any>{
    
    try {
       const httpResponse = await fetch(`${apiBaseUrl}/movies/${id}`);
    if(!httpResponse.ok) {
      console.error(httpResponse);
      return null;
    }
   const movie = await httpResponse.json(); // [{}, {}, {}]
   return movie;
  
    } catch (error) {
       // CAS où le backend ne répond pas
       console.error(error);
       return null; // Si une erreur a lieu, on renvoie null
    };
  };

// creation d'un film (le rajouter dans l'api)
export async function createMovie(movieData:any): Promise<any> {
    try {
      //enregistrer  le nouveau film dans api 
    const httpResponse = await fetch(`${apiBaseUrl}/movies`, {
      method: "POST", // je cible la route `POST`
      headers: {"Content-Type": "application/json"}, // je préviens que j'envoie du JSON
      body: JSON.stringify(movieData), // j'envoie mes données en JSON
    });
    if (! httpResponse.ok) {
      console.error(httpResponse);
      return null;
    };
    const createdMovie = await httpResponse.json();
    
    return createdMovie;
    } catch (error) {
      console.error(error);
      return null;
    };  
  }; 

//modifictation d'un film

export async function updateMovie(id: number, data: any): Promise<any> {
  try {
    const movieToUpdateUrl = `${apiBaseUrl}/movies/${id}`;

    const httpResponse = await fetch(movieToUpdateUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!httpResponse.ok) {
      console.error("Erreur API :", await httpResponse.json());
      return null;
    }

    const updatedMovie = await httpResponse.json();

    return updatedMovie;
  } catch (error) {
    console.error(" Erreur lors de la requête :", error);
    return null;
  }
}

   
   //suppression d'un film
export async function deleteMovie(id: number): Promise<boolean> {
    try {
      // On récupère le film : fetch : GET /api/movies/:id
    const httpResponse= await fetch(`${apiBaseUrl}/movies/${id}`, {
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
  