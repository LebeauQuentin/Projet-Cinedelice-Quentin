import '@testing-library/jest-dom/vitest';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ValidateButton from './ValidateButton';


// test pour le bouton de validation
describe('ValidateButton', () => {
  // test pour afficher le bouton d'annulation
  test('affiche le bouton de validation', () => {
    render(<ValidateButton onClick={() => {}} text="Validate" />);
    expect(screen.getByText('Validate')).toBeInTheDocument();
  });
  // test pour appeler la fonction onClick lorsque le bouton est cliqué
  test('appelle la fonction onClick lorsque le bouton est cliqué', () => {  
    const onClick = vi.fn();
    render(<ValidateButton onClick={onClick} text="Validate" />);
    fireEvent.click(screen.getByText('Validate'));
    expect(onClick).toHaveBeenCalled();
  });
});