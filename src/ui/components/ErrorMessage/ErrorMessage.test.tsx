import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders null when no message', () => {
    const { container } = render(<ErrorMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders message with alert role', () => {
    render(<ErrorMessage message="Oops" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Oops');
  });
});


