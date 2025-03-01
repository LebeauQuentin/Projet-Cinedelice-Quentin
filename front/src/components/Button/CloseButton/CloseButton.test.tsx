import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom"; // Import pour les matchers supplémentaires
import CloseButton from "./CloseButton";

// test pour le bouton d'annulation
describe("CloseButton", () => {
  test("Le bouton doit s'afficher et appeler onClose au clic", () => {
    const onCloseMock = vi.fn(); // Création d'une fonction mock

    render(<CloseButton onClose={onCloseMock} />);

    const button = screen.getByRole("button"); // Récupération du bouton
    expect(button).toBeInTheDocument(); // Vérifier qu'il est bien rendu

    fireEvent.click(button); // Simuler un clic

    expect(onCloseMock).toHaveBeenCalledTimes(1); // Vérifier que onClose est appelé une fois
  });
});