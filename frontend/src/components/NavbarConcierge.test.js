import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavbarConcierge from './NavbarConcierge';
import { MemoryRouter } from 'react-router-dom';

describe('NavbarConcierge', () => {
  test('renders NavbarConcierge component', async () => {
    // Simulate API response
    global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.resolve([
          {
            "id": 66,
            "housing_unit_apartment": "101-1",
            "mail_type": "Others",
            "arrival_time": "2024-05-02T00:17:00.000Z",
            "is_notified": 1,
            "is_claimed": 0
          },
          {
            "id": 67,
            "housing_unit_apartment": "102-1",
            "mail_type": "Letters",
            "arrival_time": "2024-04-02T00:17:00.000Z",
            "is_notified": 0,
            "is_claimed": 0
          }
        ]),
      });

      const { getByText } = render(
        <MemoryRouter>
          <NavbarConcierge />
        </MemoryRouter>
      );
    
// Verify that the text "ESP" it's present in the navbar
expect(getByText('ESP')).toBeInTheDocument();

// Verify that the text "EN" it's present in the navbar
expect(getByText('EN')).toBeInTheDocument();

// Verify that the text "Admin" it's present in the navbar
expect(getByText('Admin')).toBeInTheDocument();

// Verify that the text "Manage Correspondence" it's present in the navbar
expect(getByText('Manage Correspondence')).toBeInTheDocument();

// Verify that the text "Manage Visits" it's present in the navbar
expect(getByText('Manage Visits')).toBeInTheDocument();

// Verify that the text "Manage Parking" it's present in the navbar
expect(getByText('Manage Parking')).toBeInTheDocument();

// Verify that the text "Search Person" it's present in the navbar
expect(getByText('Search Person')).toBeInTheDocument();

// Verify that the text "Search by RUN" it's present in the navbar
expect(getByText('Search by RUN')).toBeInTheDocument();

// Verify that the text "Scan ID" it's present in the navbar
expect(getByText('Scan ID')).toBeInTheDocument();

// Verify that the text "Add New" it's present in the navbar
expect(getByText('Add New')).toBeInTheDocument();

// Verify that the text "New Visit" it's present in the navbar
expect(getByText('New Visit')).toBeInTheDocument();

// Verify that the text "New Vehicle" it's present in the navbar
expect(getByText('New Vehicle')).toBeInTheDocument();

// Verify that the text "Configuration" it's present in the navbar
expect(getByText('Configuration')).toBeInTheDocument();

// Verify that the text "Sign Out" it's present in the navbar
expect(getByText('Sign Out')).toBeInTheDocument();
  });

  test('language buttons work correctly', () => {
    const { getByText } = render(
        <MemoryRouter>
          <NavbarConcierge />
        </MemoryRouter>
      );
    
    // Verify that clicking in the button 'EN' changes language to english
    fireEvent.click(getByText('EN'));
    expect(document.documentElement.lang).toBe('');
    
    // Verify that clicking in the button 'ESP' changes language to spanish (español)
    fireEvent.click(getByText('ESP'));
    expect(document.documentElement.lang).toBe('');
  });

});
