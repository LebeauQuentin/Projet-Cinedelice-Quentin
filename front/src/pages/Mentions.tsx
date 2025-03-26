import "./style/Mentions.css";
import { useEffect } from "react";
import { useVar } from "../contexts/var.context";

export default function MentionsLegales() {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()
  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  return (
    <div className="section">
      <h2 className="mentions_section_title"><strong>Mentions Légales</strong></h2>
      <section className="mentions_section">
        <h3><strong>éditeur du site</strong> </h3>
        <p><strong>Nom du projet</strong> Ciné Délices</p>
        <p>le présent site web  est édité par</p>
        <p><strong>XXXX</strong></p>
        <p><strong>XXXX</strong></p>
        <p>apprenants de l'école <strong>O'clock</strong> </p>
      </section>

      <section className="mentions_section">
        <h3><strong>Hébergeur du site</strong> </h3>

      </section>
      <section className="mentions_section">
        <h3><strong>Propriété intellectuelle</strong> </h3>
        <p>Tous les contenus présents sur ce site (textes, images, logos, vidéos, recettes, etc.) sont protégés par le droit d'auteur et les lois sur la propriété intellectuelle.
          Les recettes, bien qu'inspirées de films, sont des créations personnelles basées sur des œuvres cinématographiques.
          Toute reproduction, redistribution ou exploitation non autorisée des contenus de ce site est interdite sans l'accord préalable de l'éditeur.
          Les marques, titres, personnages et autres éléments mentionnés sont la propriété de leurs détenteurs respectifs. L'utilisation de ces éléments est à titre informatif et éducatif dans le cadre d'un projet de fin de formation.</p>
      </section>
      <section className="mentions_section">
        <h3><strong>données personnelles</strong></h3>
        <p>Les informations collectées sur ce site sont destinées uniquement à [objectif de collecte]. Conformément à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification et d’opposition sur vos données personnelles. Pour exercer ces droits, contactez-nous à l’adresse suivante : [email].
        </p>
      </section>
      <section className="mentions_section">
        <h3><strong>Cookies</strong></h3>
        <p>Ce site utilise des cookies pour améliorer l’expérience de navigation. Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
        </p>
      </section>

      <section className="mentions_section">
        <h3><strong>limitation de résponsabilité</strong> </h3>
        <p>L’éditeur du site ne pourra être tenu responsable des erreurs ou des omissions dans les contenus du site, ni des problèmes techniques liés à l’accès ou à l’utilisation du site.
        </p>
      </section>
      <section className="mentions_section">
        <h3><strong>Droit applicable</strong></h3>
        <p>Le présent site est régi par le droit français. Tout litige sera soumis aux tribunaux compétents de paris.
        </p>
      </section>




    </div>
  )
}