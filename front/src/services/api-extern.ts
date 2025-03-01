export async function getQuote() {
    try {
         // On récupère aléatoirement ... 
    const httpResponse = await fetch("https://api.oss117quotes.xyz/v1/random")
    // CAS où le backend répond mais avec un statut d'erreur
    if (!httpResponse.ok) {
        console.error(httpResponse);
        // si une erreur a lieu, on renvoie null
        return
        ;
    };
    const quote = await httpResponse.json(); // {}

    return quote; 



    } catch (error) {
        // cas ou le backend ne repond pas 
        console.error(error);
        return null;
        
    }
   

      
}