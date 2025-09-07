import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  it('renders with placeholder and name', () => {
    render(
      <InputText
        name="firstName"
        placeholder="Enter first name"
        value=""
      />
    );
    const input = screen.getByPlaceholderText('Enter first name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'firstName');
  });

  it('fires onChange', () => {
    const handleChange = jest.fn();
    render(
      <InputText
        name="city"
        placeholder="City"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByPlaceholderText('City');
    fireEvent.change(input, { target: { value: 'Paris' } });
    expect(handleChange).toHaveBeenCalled();
  });
});


