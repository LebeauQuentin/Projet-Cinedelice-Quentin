import "./ValidateButton.css";

export default function ValidateButton ({ onClick, text, type = "button" }: ValidateButtonProps) {

  return (
    // Bouton de validation dans les fenetres de dialogue
    <>
      <button type={type} className="button_validate" onClick={onClick}>{text}</button>
    </>
  )

}

interface ValidateButtonProps {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit"; // Ajout du type
}