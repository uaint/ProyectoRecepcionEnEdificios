import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewCorrespondenceForm from './NewCorrespondenceForm';
import { EmailMsg, WhatsAppMsg } from '../Utils';

// Mock the `useTranslation` hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key) => key,
    }),
}));

// Mock Utils.js
jest.mock('../Utils', () => ({
    formatDateLarge: jest.fn((date) => date),
    timeAlerts: jest.fn((callback) => callback()),
    logToDatabase: jest.fn(),
    WhatsAppMsg: jest.fn(),
    EmailMsg: jest.fn()
}));

// Mock the sessionStorage
const mockSessionStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
        store[key] = value.toString();
        },
        clear: () => {
        store = {};
        },
    };
})();
Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

beforeEach(() => {
  sessionStorage.clear();
  WhatsAppMsg.mockClear();
  EmailMsg.mockClear();
});

// TEST 1: Page Render
test('renders NewCorrespondenceForm component correctly', () => {
    localStorage.setItem('user_role', '2');
    localStorage.setItem('tower_id_associated', '1');
    localStorage.setItem('apartment_id_associated', 'null');
    
    render(
      <Router>
        <NewCorrespondenceForm />
      </Router>
    );
    
    expect(screen.getByText('correspondenceForm.addNewCorrespondence')).toBeInTheDocument();
});

// TEST 2: Form Continue
test('continue to the next step of the form', async () => {
  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', 'null');
  
  render(
    <Router>
      <NewCorrespondenceForm />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('correspondenceForm.selectApartment'), { target: { value: '101' } });
  fireEvent.click(screen.getByText('correspondenceForm.searchresident'));

  await waitFor(() => {
    expect(screen.getByText('correspondenceForm.addNewCorrespondence')).toBeInTheDocument();
  });
});

// TEST 3: Handle checkboxes
test('handle checkbox for WhatsApp and Email', async () => {
  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', 'null');

  render(
    <Router>
      <NewCorrespondenceForm />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('correspondenceForm.selectApartment'), { target: { value: '101' } });
  fireEvent.click(screen.getByText('correspondenceForm.searchresident'));

  // Wait for the form to render and inhabitants to load
  await waitFor(() => screen.getByText('correspondenceForm.selectMsg'));

  // Simulate selecting checkbox of WhatsApp & Email
  fireEvent.click(screen.getAllByRole('checkbox')[0]);
  fireEvent.click(screen.getAllByRole('checkbox')[1]);
  expect(screen.getAllByRole('checkbox')[0].checked).toBe(true);
  expect(screen.getAllByRole('checkbox')[1].checked).toBe(true);
});

// TEST 4: User interaction with the form
test('user interaction with the form', async () => {
  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', 'null');

  render(
    <Router>
      <NewCorrespondenceForm />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('correspondenceForm.selectApartment'), { target: { value: '101' } });
  fireEvent.click(screen.getByText('correspondenceForm.searchresident'));

  // Wait for the form to render and inhabitants to load
  await waitFor(() => screen.getByText('correspondenceForm.selectMsg'));
  fireEvent.change(screen.getByLabelText('Default select example'), { target: { value: 'Packages' } });
  fireEvent.change(screen.getByLabelText('correspondenceForm.timeOfArrival'), { target: { value: '2024-06-20T12:00' } });
  fireEvent.click(screen.getByText('correspondenceForm.addCorrespondence'));
  expect(screen.getByText('✔ correspondenceForm.MsgSuccessAlert')).toBeInTheDocument();
});