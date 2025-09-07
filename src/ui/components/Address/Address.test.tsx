import React from 'react';
import { render, screen } from '@testing-library/react';
import Address from './Address';

describe('Address', () => {
  it('renders formatted address', () => {
    render(
      <Address
        street="Main St"
        houseNumber="123"
        postcode="10001"
        city="NYC"
      />
    );
    expect(screen.getByText('Main St 123, 10001, NYC')).toBeInTheDocument();
  });
});


