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
    sessionStorage.setItem('user_role', '2');
    sessionStorage.setItem('tower_id_associated', '1');
    sessionStorage.setItem('apartment_id_associated', 'null');
    
    render(
      <Router>
        <NewCorrespondenceForm />
      </Router>
    );
    
    expect(screen.getByText('correspondenceForm.addNewCorrespondence')).toBeInTheDocument();
});

// TEST 2: Form Continue
test('continue to the next step of the form', async () => {
  sessionStorage.setItem('user_role', '2');
  sessionStorage.setItem('tower_id_associated', '1');
  sessionStorage.setItem('apartment_id_associated', 'null');
  
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