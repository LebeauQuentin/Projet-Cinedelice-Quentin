import './ModalUpdateRecipeBox.css';
import CancelButton from '../../Button/CancelButton/CancelButton';
import CloseButton from '../../Button/CloseButton/CloseButton';
import { useEffect, useRef } from 'react';
import ValidateButton from '../../Button/ValidateButton/ValidateButton';
import { useModal } from '../../../contexts/modal.context';

export default function ModalUpdateRecipeBox({ title, onClick }: ModalUpdateRecipeBoxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

    // MODAL
    const { isModalUpdateRecipeOpen, setIsModalUpdateRecipeOpen } = useModal();
  // Partie Ouverture / Fermeture de Modal
  useEffect(() => {
    if (dialogRef.current && isModalUpdateRecipeOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current && !isModalUpdateRecipeOpen) {
      dialogRef.current.close();
    }
    }, [isModalUpdateRecipeOpen]);


  const handleClose = () => {
    setIsModalUpdateRecipeOpen(false);
  };
  return (
    // Modale à utiliser pour la suppression d'un compte utilisateur ou d'une recette
    <dialog className="modal-update-recipe-box open" ref={dialogRef}>
      <h1 className="modal-update-recipe-box-title">Modfication : {title}</h1>
      <CloseButton onClose={handleClose}  />
      <p className="modal-update-recipe-box-description">En modifiant cette recette, celle-ci redeviendra en attente de validation par le modérateur</p>
      <div className="modal-update-recipe-box-button-container">
        <ValidateButton text="valider" onClick={onClick} />
        <CancelButton onClick={handleClose} text="annuler"/>
      </div>
    </dialog> 
  )
}

interface ModalUpdateRecipeBoxProps {
  title: string;
  onClick: () => Promise<void>; // Accepte une fonction asynchrone
}
