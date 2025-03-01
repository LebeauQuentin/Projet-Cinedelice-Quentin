import { createContext, useContext } from "react";

interface IModalContext {
    isModalLoginOpen: boolean;
    isModalRegisterOpen: boolean;
    isModalProfilOpen: boolean;
    isModalFilterOpen: boolean;
    isModalUpdateRecipeOpen: boolean;
    isModalMessageBoxOpen: boolean;
    setIsModalLoginOpen: (isOpen: boolean) => void;
    setIsModalRegisterOpen: (isOpen: boolean) => void;
    setIsModalProfilOpen: (isOpen: boolean) => void;
    setIsModalFilterOpen: (isOpen: boolean) => void;
    setIsModalUpdateRecipeOpen: (isOpen: boolean) => void;
    setIsModalMessageBoxOpen: (isOpen: boolean) => void;
}

export const ModalContext = createContext<IModalContext>({
    isModalLoginOpen: false,
    isModalRegisterOpen: false,
    isModalProfilOpen: false,
    isModalFilterOpen: false,
    isModalUpdateRecipeOpen: false,
    isModalMessageBoxOpen: false,
    setIsModalLoginOpen: () => {},
    setIsModalRegisterOpen: () => {},
    setIsModalProfilOpen: () => {},
    setIsModalFilterOpen: () => {},
    setIsModalUpdateRecipeOpen: () => {},
    setIsModalMessageBoxOpen: () => {}
});

export const useModal = () => {
    return useContext(ModalContext);
}

