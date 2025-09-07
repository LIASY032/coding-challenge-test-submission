import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './Section';

describe('Section', () => {
  it('renders children', () => {
    render(<Section>hello</Section>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('applies light variant by default', () => {
    const { container } = render(<Section>light</Section>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});


