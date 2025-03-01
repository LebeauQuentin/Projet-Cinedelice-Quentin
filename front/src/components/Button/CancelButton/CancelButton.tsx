import "./CancelButton.css";

export default function CancelButton ({ onClick, text }: { onClick: () => void, text: string }) {


  return (
    // Boutton d'annulation dans les fenetres de dialogue
    <>
      <button className="button_cancel" type="button" onClick={onClick}>{text}</button>
    </>
  )

}