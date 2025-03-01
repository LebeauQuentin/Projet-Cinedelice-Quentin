import { useRef, useEffect, useState } from "react";
import CancelButton from "../Button/CancelButton/CancelButton"
import './ModalProfilBox.css'
import { useModal } from "../../contexts/modal.context";
import { useAuth } from "../../contexts/auth.context";
import ModalDeleteBox from "../ModalDeleteBox/ModalDeleteBox";
import { useAuthVerification } from "../../utils/utils.authVerification";
import CloseButton from "../Button/CloseButton/CloseButton";
import ValidateButton from "../Button/ValidateButton/ValidateButton";

export default function ModalProfilBox () {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isModalProfilOpen, setIsModalProfilOpen } = useModal();
  const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState<boolean>(false);
  const { user, handleUpdateUser, handleDeleteUser } = useAuth();
  const [ formData, setFormData ] = useState({
    last_name: user?.last_name ?? "",
    first_name: user?.first_name ?? "",
    email: user?.email ?? "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        last_name: user.last_name ?? "",
        first_name: user.first_name ?? "",
        email: user.email ?? "",
      });
    }
    if (dialogRef.current && isModalProfilOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current && !isModalProfilOpen) {
      dialogRef.current.close();
    }
  }, [isModalProfilOpen, user]);

  const handleClose = () => {
    setIsModalProfilOpen(false);
  };

  const handleInputChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const  name  = (event.target as HTMLButtonElement).dataset.name;
    if (name) {
      const input = document.getElementById(name) as HTMLInputElement;
      if (input.disabled) {
        input.disabled = false;
      } else {
        input.disabled = true;
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name.replace('profil-', '')]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      handleUpdateUser(user.id, formData.last_name, formData.first_name, formData.email);
    }
  };

  const handleDelete = () => {
    if (user) {
      handleDeleteUser(user.id);
    }
    setIsModalDeleteOpen(false);
  };

  useAuthVerification("profil");
    return (
      // Modale pour que le membre puisse modifier ses informations ou supprimer son compte
      <>
        <dialog ref={dialogRef} className={`${isModalDeleteOpen ? 'modal-profil-opacity' : 'modal-profil'}`}>
          <h1 className="modal-title-profil">Mon Profil</h1>
          <CloseButton onClose={handleClose}/> 
          <form className="modal-form-profil" onSubmit={handleSubmit} noValidate>
            <label htmlFor="profil-last_name">nom</label>
              <div className="modal-form-profil-div">
                <input type="text" id="profil-last_name" name="profil-last_name" placeholder="XXXX" value={formData.last_name} onChange={handleChange} disabled/>
                <button className="modal-form-profil-button-input" data-name="profil-last_name" onClick={handleInputChange}>modifer</button>
              </div>

            <label htmlFor="profil-first_name">prénom</label>
              <div className="modal-form-profil-div">
                <input type="text" id="profil-first_name" name="profil-first_name" placeholder="YYYY" value={formData.first_name} onChange={handleChange} disabled/>
                <button className="modal-form-profil-button-input" data-name="profil-first_name" onClick={handleInputChange}>modifer</button>
              </div>
            <label htmlFor="profil-email">email</label>
              <div className="modal-form-profil-div">
                  <input type="text" id="profil-email" name="profil-email" placeholder="axy@oclok.io" value={formData.email} onChange={handleChange} disabled/>
                  <button className="modal-form-profil-button-input" data-name="profil-email" onClick={handleInputChange}>modifer</button>
              </div>
              <div className="modal-button-container-profil">
                <ValidateButton text="valider" type="submit"/>
                <CancelButton  onClick={handleClose} text="Annuler" />
              </div>
          </form>
          <button className="modal-button-delete-profil" onClick={() => setIsModalDeleteOpen(true)}>Supprimer mon compte</button>
        </dialog> 
        <ModalDeleteBox isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} onDelete={handleDelete} description="Voulez-vous vraiment supprimer votre compte ?" title="Suppression de votre compte" />
      </>
    )
  }