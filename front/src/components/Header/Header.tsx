import './Header.css';
import { Link } from "react-router";
import { useAuth } from '../../contexts/auth.context';
import { useModal } from '../../contexts/modal.context';
import { useEffect, useRef, useState } from 'react';
import { useVar } from '../../contexts/var.context';

export default function Header() {
  const logoLink = useRef<HTMLAnchorElement>(null); // Création de la ref pour mettre l'input en Focus
    // Mettre le focus sur le logo au premier rendu pour la navigation au clavier
    useEffect(() => {
      if (logoLink.current) {
        logoLink.current.focus();
      }
    }, []);

  const { headerLogo } = useVar();
  const { setIsModalLoginOpen, setIsModalProfilOpen } = useModal();
  const { user, handleLogout } = useAuth();

  const menuBurgerRef = useRef<HTMLUListElement | null>(null);
  const burgerButtonRef = useRef<HTMLDivElement | null>(null); // Ajout d'une ref pour le bouton burger
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    // Vérifie si le clic est à l'extérieur du menu et du bouton burger
    if (
      menuBurgerRef.current &&
      !menuBurgerRef.current.contains(event.target as Node) &&
      burgerButtonRef.current &&
      !burgerButtonRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" ref={logoLink}className='link_logo'><h1 className="logo">{headerLogo}</h1></Link>

      <nav className={`header-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/recipes">
          <img className="icone-search" src="/icones/icons8-search-48.png" alt="Rechercher" />
        </Link>
        {!user ? (
          <div className="header-menu-unconnect">
            <span onClick={() => setIsModalLoginOpen(true)}>
              <img className="icone-user" src="/icones/icons8-user-64.png" alt="Connexion" />
            </span>
          </div>
        ) : (
          <>
            {/* Menu Burger pour les écrans petits */}
            <div className="burger-menu" ref={burgerButtonRef} onClick={toggleMenu}>
              <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
              <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
              <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>

            <ul
              className={`header-menu-connect ${isMenuOpen ? 'open' : ''}`}
              ref={menuBurgerRef}
              onClick={(e) => e.stopPropagation()} // Empêche les clics à l'intérieur du menu de fermer le menu
            >
              <li><Link onClick={closeMenu} to="/createRecipe">Créer une recette</Link></li>
              <li><Link onClick={closeMenu} to="/myRecipes">Mes Recettes</Link></li>
              <li><span onClick={() => {setIsModalProfilOpen(true); closeMenu()}}>Profil</span></li>
              {user.is_admin && <li><Link className="header_dashboard" to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>}
              <li><span onClick={() => {handleLogout(); closeMenu()}}>Déconnexion</span></li>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
}
