import "./ModalMessageBox.css";
import { useModal } from "../../contexts/modal.context";
import CancelButton from "../Button/CancelButton/CancelButton";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/auth.context";
import ValidateButton from "../Button/ValidateButton/ValidateButton";
export default function ModalMessageBox () {
  const { isModalMessageBoxOpen, setIsModalMessageBoxOpen, setIsModalLoginOpen } = useModal();
  const { timeRemaining, setTimeRemaining } = useAuth();
  const initialTimer = timeRemaining ? timeRemaining * 60 : 3 * 60;
  const [timer, setTimer] = useState<number>(initialTimer);

  const handleClose = useCallback(() => {
    setIsModalMessageBoxOpen(false);
  }, [setIsModalMessageBoxOpen]);

  const handleReconnect = useCallback(() => {
    setIsModalMessageBoxOpen(false);
    setIsModalLoginOpen(true);
  }, [setIsModalMessageBoxOpen, setIsModalLoginOpen]);

  useEffect(() => {
    let timerCountDown = 0 as number;
    if(isModalMessageBoxOpen) {
        timerCountDown = setTimeout(() => {
          setTimer(timer - 1);
          if (timer <= 0) {
           handleClose();
        }
      }, 1000);
    }
    return () => clearTimeout(timerCountDown);
  }, [timer, handleClose, isModalMessageBoxOpen]);

  useEffect(() => {
    // console.log("timeRemaining change in message box", timeRemaining);
    // console.log("reste timeRemaining", timeRemaining);
    // à optimiser
    const resetTimer = timeRemaining ? timeRemaining * 60 : 3 * 60;
    setTimer(resetTimer);
  }, [isModalMessageBoxOpen, timeRemaining, setTimeRemaining]);

  return (
    // Modale utilisée pour afficher des messages de session
    <dialog className="modal-message-box" open={isModalMessageBoxOpen}>
      <h1 className="modal-message-box-title">Message de session</h1>
      <button className="modal-message-box-button-close" onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="32px" height="32px"><path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"/></svg> 
      </button>
      <p className="modal-message-box-description">
        Attention vous allez être déconnecté. dans ({timer} secondes)
      </p>
      <div className="modal-message-box-button-container">
        <ValidateButton onClick={handleReconnect} text="Reconnecter vous"/>
        <CancelButton onClick={handleClose} text="Annuler"/>
      </div>
    </dialog> 
  )
}

