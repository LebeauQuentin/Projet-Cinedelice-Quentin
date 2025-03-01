import '@testing-library/jest-dom/vitest';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CancelButton from './CancelButton';


// test pour le bouton d'annulation
describe('CancelButton', () => {
  // test pour afficher le bouton d'annulation
  test('affiche le bouton d\'annulation', () => {
    render(<CancelButton onClick={() => {}} text="Cancel" />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  // test pour appeler la fonction onClick lorsque le bouton est cliqué
  test('appelle la fonction onClick lorsque le bouton est cliqué', () => {  
    const onClick = vi.fn();
    render(<CancelButton onClick={onClick} text="Cancel" />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClick).toHaveBeenCalled();
  });

  // test pour le bouton d'annulation avec un texte personnalisé
  test('affiche le bouton d\'annulation avec un texte personnalisé', () => {
    render(<CancelButton onClick={() => {}} text="Custom Text" />);
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });
});


