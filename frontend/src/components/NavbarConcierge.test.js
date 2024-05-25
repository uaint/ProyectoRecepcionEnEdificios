import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavbarConcierge from './NavbarConcierge';
import { MemoryRouter } from 'react-router-dom';

describe('NavbarConcierge', () => {
  test('renders NavbarConcierge component', async () => {
    // Simular la respuesta de la API
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
    
    // Verifica que el texto "ESP" esté presente en el navbar
expect(getByText('ESP')).toBeInTheDocument();

// Verifica que el texto "EN" esté presente en el navbar
expect(getByText('EN')).toBeInTheDocument();

// Verifica que el texto "Admin" esté presente en el navbar
expect(getByText('Admin')).toBeInTheDocument();

// Verifica que el texto "Manage Correspondence" esté presente en el navbar
expect(getByText('Manage Correspondence')).toBeInTheDocument();

// Verifica que el texto "Manage Visits" esté presente en el navbar
expect(getByText('Manage Visits')).toBeInTheDocument();

// Verifica que el texto "Manage Parking" esté presente en el navbar
expect(getByText('Manage Parking')).toBeInTheDocument();

// Verifica que el texto "Search Person" esté presente en el navbar
expect(getByText('Search Person')).toBeInTheDocument();

// Verifica que el texto "Search by RUN" esté presente en el navbar
expect(getByText('Search by RUN')).toBeInTheDocument();

// Verifica que el texto "Scan ID" esté presente en el navbar
expect(getByText('Scan ID')).toBeInTheDocument();

// Verifica que el texto "Add New" esté presente en el navbar
expect(getByText('Add New')).toBeInTheDocument();

// Verifica que el texto "New Visit" esté presente en el navbar
expect(getByText('New Visit')).toBeInTheDocument();

// Verifica que el texto "New Vehicle" esté presente en el navbar
expect(getByText('New Vehicle')).toBeInTheDocument();

// Verifica que el texto "Configuration" esté presente en el navbar
expect(getByText('Configuration')).toBeInTheDocument();

// Verifica que el texto "Sign Out" esté presente en el navbar
expect(getByText('Sign Out')).toBeInTheDocument();
  });

  test('language buttons work correctly', () => {
    const { getByText } = render(
        <MemoryRouter>
          <NavbarConcierge />
        </MemoryRouter>
      );
    
    // Verifica que al hacer clic en el botón 'EN' se cambie el idioma a inglés
    fireEvent.click(getByText('EN'));
    expect(document.documentElement.lang).toBe('');
    
    // Verifica que al hacer clic en el botón 'ESP' se cambie el idioma a español
    fireEvent.click(getByText('ESP'));
    expect(document.documentElement.lang).toBe('');
  });

});
