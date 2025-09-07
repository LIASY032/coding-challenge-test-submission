import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import AddressBook from './AddressBook';

// Mock store utilities
import { configureStore } from '@reduxjs/toolkit';
import addressBookReducer from '../../../core/reducers/addressBookSlice';
import useAddressBook from '../../hooks/useAddressBook';

// Mock hook module (we'll set return values per test)
jest.mock('../../hooks/useAddressBook');

function renderWithStore(preloadedState?: any) {
  const store = configureStore({
    reducer: { addressBook: addressBookReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <AddressBook />
    </Provider>
  );
}

describe('AddressBook', () => {
  it('renders empty state when no addresses', () => {
    (useAddressBook as jest.Mock).mockReturnValue({ removeAddress: jest.fn(), loadSavedAddresses: jest.fn(), loading: false });
    renderWithStore({ addressBook: { addresses: [] } });
    expect(screen.getByText(/No addresses found/i)).toBeInTheDocument();
    expect(screen.getByText('📓 Address book (0)')).toBeInTheDocument();
  });

  it('renders address items and Remove buttons', () => {
    (useAddressBook as jest.Mock).mockReturnValue({ removeAddress: jest.fn(), loadSavedAddresses: jest.fn(), loading: false });
    renderWithStore({
      addressBook: {
        addresses: [
          {
            id: '1',
            firstName: 'Alan',
            lastName: 'Turing',
            street: 'King St',
            houseNumber: '10',
            postcode: '00001',
            city: 'London',
          },
        ],
      },
    });
    expect(screen.getByText('📓 Address book (1)')).toBeInTheDocument();
    expect(screen.getByText('Alan Turing')).toBeInTheDocument();
    expect(screen.getByText('King St 10, 00001, London')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('calls removeAddress when clicking Remove', () => {
    const removeAddressMock = jest.fn();
    (useAddressBook as jest.Mock).mockReturnValue({ removeAddress: removeAddressMock, loadSavedAddresses: jest.fn(), loading: false });
    renderWithStore({
      addressBook: {
        addresses: [
          {
            id: '1',
            firstName: 'A',
            lastName: 'B',
            street: 'S',
            houseNumber: '1',
            postcode: '1234',
            city: 'C',
          },
        ],
      },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(removeAddressMock).toHaveBeenCalledWith('1');
  });
});


