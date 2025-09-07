import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './core/store';
import App from './App';

describe('App flows', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('validates empty postcode/houseNumber', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Find' }));
    expect(await screen.findByText('Postcode and street number fields mandatory!')).toBeInTheDocument();
  });

  it('fetches addresses successfully and shows radios', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', details: [
        { city: 'Sydney', houseNumber: '1', postcode: '2000', street: '33 Edward Street', lat: 0, long: 0 },
      ] })
    } as any);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Post Code'), { target: { value: '2000', name: 'postCode' } });
    fireEvent.change(screen.getByPlaceholderText('House number'), { target: { value: '33', name: 'houseNumber' } });
    fireEvent.click(screen.getByRole('button', { name: 'Find' }));

    await waitFor(() => expect(screen.getByLabelText(/Sydney/)).toBeInTheDocument());
  });

  it('validates first/last name before add', async () => {
    // Arrange addresses
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', details: [
        { city: 'Sydney', houseNumber: '1', postcode: '2000', street: '33 Edward Street', lat: 0, long: 0, id: 'id-1' },
      ] })
    } as any);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Post Code'), { target: { value: '2000', name: 'postCode' } });
    fireEvent.change(screen.getByPlaceholderText('House number'), { target: { value: '33', name: 'houseNumber' } });
    fireEvent.click(screen.getByRole('button', { name: 'Find' }));
    await waitFor(() => expect(screen.getByRole('radio')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('radio'));

    // Try submit without names
    fireEvent.click(screen.getByRole('button', { name: 'Add to addressbook' }));
    expect(await screen.findByText('First name and last name fields mandatory!')).toBeInTheDocument();
  });
});


