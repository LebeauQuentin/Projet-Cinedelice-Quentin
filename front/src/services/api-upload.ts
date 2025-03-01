const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function uploadNewFile(file: File, id:number) {
  if (!file || !id) {
    throw new Error("Fichier et ID requis !");
  }

  const idSend = id.toString()

  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", idSend); // On envoie l'ID pour renommer le fichier

  try {
    const response = await fetch(`${apiBaseUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data; // { original: 'URL', light: 'URL' }

  } catch (error) {
    console.error("Erreur lors de l'upload du fichier:", error);
    throw error;
  }
}

export async function deleteFile(id : number) {
  if (!id) {
    throw new Error("ID requis !");
  }

  const filename_normal = `${id}_normal.webp`;
  const filename_light = `${id}_light.webp`;

  try {
    const response_light = await fetch(`${apiBaseUrl}/delete/${filename_light}`, {
      method: "DELETE",
    });

    if (!response_light.ok) {
      console.error(`Erreur suppression light: ${response_light.status}`);
      return false; // Retourne false si la suppression échoue
    }

    const response_normal = await fetch(`${apiBaseUrl}/delete/${filename_normal}`, {
      method: "DELETE",
    });

    if (!response_normal.ok) {
      console.error(`Erreur suppression normal: ${response_normal.status}`);
      return false; // Retourne false si la suppression échoue
    }

    return true; // Tout s'est bien passé

  } catch (error) {
    console.error("Erreur lors de la suppression des fichiers:", error);
    return false; // Retourne false en cas d'erreur
  }
}

