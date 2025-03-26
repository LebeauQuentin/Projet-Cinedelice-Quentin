import { IUser } from "../@types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function register(lastname: string, firstname: string, email: string, password: string, confirmPassword: string): Promise<string | boolean> {  
  try {
  // On créé l'utilisateur : fetch : POST /api/users
  const httpResponse = await fetch(`${apiBaseUrl}/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({lastname, firstname, email, password, confirmPassword})
  });
  // CAS où le backend répond mais avec un statut d'erreur
  if (! httpResponse.ok) {
    const error = await httpResponse.json();
    return error.error || false; // si une erreur a lieu, on renvoie false
  }
  return httpResponse.ok;
  
  } catch (error) {
  // CAS où le backend ne répond pas
    console.error(error);
    return false; // Si une erreur a lieu, on renvoie false
  } 
}

export async function login(email: string, password: string): Promise< string | boolean> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}) // on envoie les données du formulaire
    });
    if (! httpResponse.ok) {
      const error = await httpResponse.json();
      console.error(error.error);
      return error.error || false;
    }
    return httpResponse.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserMe(): Promise<IUser |  null> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/auth/user`, {
      credentials: "include", // on envoie les cookies
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    });
    if (! httpResponse.ok) {
      const error = await httpResponse.json();
      console.error(error.error);
      return null;
    }
    return httpResponse.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/auth/logout`, {
      credentials: "include"
    });

    if (!httpResponse.ok) {
      const error = await httpResponse.json();
      console.error(error.error);
      return false;
    }
    return httpResponse.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
