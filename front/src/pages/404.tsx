import "./style/404.css";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getQuote } from "../services/api-extern";
import { useEffect } from "react";
import { useVar } from "../contexts/var.context";

export default function NotFound() {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()
  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  // Utilisation de React Query pour gérer la requête
  const { data, isLoading, error } = useQuery({
      queryKey: ["quote"],
      queryFn: getQuote,
      retry: 2, // Nombre de tentatives en cas d'échec
  });

  return (
    <div className="section section_404">
      <h1 className="section_title">404 - Page non trouvée</h1>

      <Link to={"/"} className="link_home_page">
          <button className="section_button">Retourner sur la page d’accueil</button>
      </Link>

    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement de la citation...</p>}

    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger la citation. Veuillez réessayer plus tard.</p>}

    {/* Affichage de la citation si elle est disponible */}
    {data && (
      <blockquote cite="https://api.oss117quotes.xyz/v1/random">
        <p className="section_quote">"{data.sentence}"</p>
        <p className="section_author">{data.character.name}</p>
      </blockquote>
    )}

    <p className="section_movie">
      Citation du film <cite>OSS 117</cite> fournie par <span className="section_api">api.oss117quotes.xyz</span>
    </p>
  </div>
  );
}
