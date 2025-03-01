import "./ModalLoginBox.css";
import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/auth.context";
import { useModal } from "../../contexts/modal.context";
import CancelButton from "../Button/CancelButton/CancelButton";
import CloseButton from "../Button/CloseButton/CloseButton";
import ValidateButton from "../Button/ValidateButton/ValidateButton";

export default function ModalLoginBox() {
  const { isModalLoginOpen, setIsModalLoginOpen, setIsModalRegisterOpen } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { handleLogin } = useAuth();

  useEffect(() => {
    if (dialogRef.current && isModalLoginOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current && !isModalLoginOpen) {
      dialogRef.current.close();
    }
  }, [isModalLoginOpen]);

  const handleClose = () => {
    setIsModalLoginOpen(false);
  };

  const handleSwitchToRegister = () => {
    handleClose();
    setIsModalRegisterOpen(true);
  }

  async function handleLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputs = Object.fromEntries(formData);
    const email = inputs['login-email'] as string;
    const password = inputs['login-password'] as string;
    await handleLogin(email, password);
  }

  return (
      <dialog ref={dialogRef} className="modal-login">
          <h1 className="modal-title-login">Connexion</h1>
          <CloseButton onClose={handleClose}/> 
          <form className="modal-form-login" onSubmit={handleLoginForm} noValidate>
            <div>
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" name="login-email" required />
            </div>
            <div>
              <label htmlFor="login-password">Mot de passe</label>
              <input type="password" id="login-password" name="login-password" required minLength={6} />
            </div>
            <span className="modal-link-login" onClick={handleSwitchToRegister}>Pas de compte ? Inscrivez-vous</span>
            <div className="modal-button-container-login">
              <ValidateButton text="valider" type="submit"/>
              <CancelButton  onClick={handleClose} text="annuler"/>
            </div>
          </form>
      </dialog>
  );
}

