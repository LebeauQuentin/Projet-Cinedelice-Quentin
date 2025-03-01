import CancelButton from "../Button/CancelButton/CancelButton";
import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/auth.context";
import "./ModalRegisterBox.css";
import { useModal } from "../../contexts/modal.context";
import ValidateButton from "../Button/ValidateButton/ValidateButton";
import CloseButton from "../Button/CloseButton/CloseButton";

export default function ModalRegisterBox() {
  const { isModalRegisterOpen, setIsModalRegisterOpen, setIsModalLoginOpen } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { handleRegister } = useAuth();

  useEffect(() => {
    if (dialogRef.current && isModalRegisterOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current && !isModalRegisterOpen) {
      dialogRef.current.close();
    }
  }, [isModalRegisterOpen]);

  const handleClose = () => {
    setIsModalRegisterOpen(false);
  };

  const handleSwitchToLogin = () => {
    handleClose();
    setIsModalLoginOpen(true);
  }

  async function handleRegisterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputs = Object.fromEntries(formData);
    const lastname = inputs['register-lastname'] as string;
    const firstname = inputs['register-firstname'] as string;
    const email = inputs['register-email'] as string;
    const password = inputs['register-password'] as string;
    const confirmPassword = inputs['register-confirmPassword'] as string;
    
    await handleRegister(lastname, firstname, email, password, confirmPassword);
  }

  return (
    <dialog ref={dialogRef} className="modal-register">
      <h1 className="modal-title-register">Inscription</h1>
      <CloseButton onClose={handleClose}/> 
      <form className="modal-form-register" onSubmit={handleRegisterForm} noValidate>
        <div>
          <label htmlFor="register-lastname">Nom</label>
          <input type="text" id="register-lastname" name="register-lastname" required />
        </div>
        <div>
          <label htmlFor="register-firstname">Prénom</label>
          <input type="text" id="register-firstname" name="register-firstname" required />
        </div>
        <div>
          <label htmlFor="register-email">Email</label>
          <input type="email" id="register-email" name="register-email" required />
        </div>
        <div>
          <label htmlFor="register-password">Mot de passe</label>
          <input type="password" id="register-password" name="register-password" required minLength={6} />
        </div>
        <div>
          <label htmlFor="register-confirmPassword">Confirmer le mot de passe</label>
          <input type="password" id="register-confirmPassword" name="register-confirmPassword" required minLength={6} />
        </div>
        <span className="modal-link-register" onClick={handleSwitchToLogin}>
          Déjà un compte ? Connectez-vous
        </span>
        <div className="modal-button-container-register">
          <ValidateButton text="valider" type="submit"/>
          <CancelButton onClick={handleClose} text="annuler" />
        </div>
      </form>
    </dialog>
  );
}


