import './ModalDeleteBox.css';
import CancelButton from '../../Button/CancelButton/CancelButton';
import CloseButton from '../../Button/CloseButton/CloseButton';
import { useEffect, useRef } from 'react';

export default function ModalDeleteBox ({ isOpen, onClose, onDelete, description, title }: ModalDeleteBoxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current && isOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current && !isOpen) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    // Modale à utiliser pour la suppression d'un compte utilisateur ou d'une recette
    <dialog className="modal-delete-box open" ref={dialogRef}>
      <h1 className="modal-delete-box-title">{title}</h1>
      <CloseButton onClose={onClose}  />
      <p className="modal-delete-box-description">{description}</p>
      <div className="modal-delete-box-button-container">
        <button className="modal-delete-box-button-delete" onClick={onDelete}>Supprimer</button>
        <CancelButton onClick={onClose} text="annuler"/>
      </div>
    </dialog> 
  )
}

interface ModalDeleteBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  description: string;
  title: string;
}
