import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from './Radio';

describe('Radio', () => {
  it('renders label and input with id/name', () => {
    render(
      <Radio id="opt1" name="group1">Option 1</Radio>
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('name', 'group1');
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('value', 'opt1');
  });

  it('triggers onChange', () => {
    const handleChange = jest.fn();
    render(
      <Radio id="opt2" name="group1" onChange={handleChange}>Option 2</Radio>
    );
    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(handleChange).toHaveBeenCalled();
  });
});


