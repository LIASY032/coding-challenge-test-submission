import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  const baseEntries = [
    { name: 'firstName', placeholder: 'First Name', extraProps: { value: '' } },
    { name: 'lastName', placeholder: 'Last Name', extraProps: { value: '' } },
  ];

  it('renders label, inputs and submit button', () => {
    render(
      <Form
        label="Create"
        formEntries={baseEntries}
        onFormSubmit={jest.fn()}
        submitText="Add"
      />
    );
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('calls onFormSubmit when submitting', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form
        label="Create"
        formEntries={baseEntries}
        onFormSubmit={handleSubmit}
        submitText="Add"
      />
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Add' }).closest('form')!);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('renders footer when provided', () => {
    render(
      <Form
        label="L"
        formEntries={baseEntries}
        onFormSubmit={jest.fn()}
        submitText="S"
        footer={<div data-testid="footer">footer</div>}
      />
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});


