import { useState } from "react";
import { ModalContext } from "./modal.context";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  //les variables d'état pour afficher  les modals ou les fermer
  const [ isModalLoginOpen, setIsModalLoginOpen ] = useState<boolean>(false);
  const [ isModalRegisterOpen, setIsModalRegisterOpen ] = useState<boolean>(false);
  const [ isModalProfilOpen, setIsModalProfilOpen ] = useState<boolean>(false);
  const [ isModalFilterOpen, setIsModalFilterOpen ] = useState<boolean>(false);
  const [ isModalUpdateRecipeOpen, setIsModalUpdateRecipeOpen ] = useState<boolean>(false);
  const [ isModalMessageBoxOpen, setIsModalMessageBoxOpen ] = useState<boolean>(false);


    return (
        <ModalContext.Provider value={
          { isModalLoginOpen, 
            isModalRegisterOpen, 
            isModalProfilOpen, 
            isModalFilterOpen,
            isModalUpdateRecipeOpen, 
            setIsModalLoginOpen, 
            setIsModalRegisterOpen, 
            setIsModalProfilOpen, 
            setIsModalFilterOpen,
            setIsModalUpdateRecipeOpen,
            isModalMessageBoxOpen,
            setIsModalMessageBoxOpen }}>
              
              {children}

        </ModalContext.Provider>
    );
};

