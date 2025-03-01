import { IUser } from "../@types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function updateUser(id: number, lastname: string, firstname: string, email: string): Promise<IUser | string | null> {
  try {
  const httpResponse = await fetch(`${apiBaseUrl}/users/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({lastname, firstname, email})
  });
  if (! httpResponse.ok) {
    const error = await httpResponse.json();
    console.error(error.error);
    return error.error || null; 
  }
  return httpResponse.json();
  
  } catch (error) {
    console.error(error);
    return null; 
  } 
}

export async function deleteUser(id: number): Promise< string | boolean> {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/users/${id}`, {
      method: "DELETE",
      credentials: "include",
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

export async function getAllUsers(): Promise<IUser[] | null> {

  try {
    const httpResponse = await fetch(`${apiBaseUrl}/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });
    
    if (! httpResponse.ok) {
      console.error(httpResponse);
      return null; 
    }
    return httpResponse.json();
    
    } catch (error) {
      console.error(error);
      return null; 
    } 
  }

  export async function getOneUser(id:number): Promise<IUser | null>{

    try {
       const httpResponse = await fetch(`${apiBaseUrl}/users/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      });
      
    if(!httpResponse.ok) {
      console.error(httpResponse);
      return null;
    }
   const user = await httpResponse.json(); // [{}, {}, {}]
   return user;
  
    } catch (error) {
       // CAS où le backend ne répond pas
       console.error(error);
       return null; // Si une erreur a lieu, on renvoie null
    };
  };

  export async function isAdminUser(id: number, is_admin: boolean): Promise<boolean> {
     
    try {
    const httpResponse = await fetch(`${apiBaseUrl}/admin/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({is_admin})
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