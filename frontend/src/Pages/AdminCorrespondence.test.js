import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminCorrespondence, { sortCorrespondence } from './AdminCorrespondence';

// Mock i18
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
}));

// Mock sessionStorage
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
});

// TEST 1: Page Render
test('renders AdminCorrespondence component correctly', () => {
  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', '101');
  
  render(
    <Router>
      <AdminCorrespondence />
    </Router>
  );
  
  expect(screen.getByText('adminCorrespondence.adminCorrespondence')).toBeInTheDocument();
});

// TEST 2: Redirect /newcorrespondenceform
test('redirects to new correspondence form', async () => {
  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', 'null');
  
  render(
    <Router>
      <AdminCorrespondence />
    </Router>
  );
  
  fireEvent.click(screen.getByText('adminCorrespondence.addNewCorrespondence'));
  
  await waitFor(() => {
    expect(window.location.href).toBe('http://localhost/newcorrespondenceform');
  });
});

// TEST 3: Redirect /allcorrespondence
test('redirects to all correspondence', async () => {
  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', 'null');
  
  render(
    <Router>
      <AdminCorrespondence />
    </Router>
  );
  
  fireEvent.click(screen.getByText('adminCorrespondence.allCorrespondence'));
  
  await waitFor(() => {
    expect(window.location.href).toBe('http://localhost/allcorrespondence');
  });
});

// TEST 4: API Fetch
test('API Fetch test', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: () => Promise.resolve([
      {
        "id": 1,
        "apartment_identifier": 101,
        "tower": 1,
        "mail_type": "Packages",
        "arrival_time": "2024-05-26T03:35:00.000Z",
        "is_notified": 0,
        "is_claimed": 0
      },
      {
        "id": 2,
        "apartment_identifier": 101,
        "tower": 1,
        "mail_type": "Letters",
        "arrival_time": "2024-05-26T03:42:00.000Z",
        "is_notified": 1,
        "is_claimed": 0
      }
    ]),
  });
  render(
    <Router>
      <AdminCorrespondence />
    </Router>
  );
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('https://dduhalde.online/.netlify/functions/api/unclaimed_correspondence/null/null')
  });
});

// TEST 5: Sorting
test('Sorting test', async () => {

  // Data mock for test
  const data_test = [
    {
      "id": 1,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Packages",
      "arrival_time": "2024-05-26T03:35:00.000Z",
      "is_notified": 0,
      "is_claimed": 0
    },
    {
      "id": 2,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Letters",
      "arrival_time": "2024-05-26T03:42:00.000Z",
      "is_notified": 1,
      "is_claimed": 0
    }
  ];
  
  // sortConfig for the sort mock
  const sortConfig1 = { key: 'id', direction: 'descending' };
  const sortConfig2 = { key: 'arrival_time', direction: 'descending' };
  const sortConfig3 = { key: 'apartment', direction: 'descending' };

  localStorage.setItem('user_role', '2');
  localStorage.setItem('tower_id_associated', '1');
  localStorage.setItem('apartment_id_associated', 'null');
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: () => Promise.resolve([
      {
        "id": 1,
        "apartment_identifier": 101,
        "tower": 1,
        "mail_type": "Packages",
        "arrival_time": "2024-05-26T03:35:00.000Z",
        "is_notified": 0,
        "is_claimed": 0
      },
      {
        "id": 2,
        "apartment_identifier": 101,
        "tower": 1,
        "mail_type": "Letters",
        "arrival_time": "2024-05-26T03:42:00.000Z",
        "is_notified": 1,
        "is_claimed": 0
      }
    ]),
  });

  render(
    <Router>
      <AdminCorrespondence />
    </Router>
  );

  // Check all the sorting options
  fireEvent.click(screen.getByText('adminCorrespondence.id'));
  expect(screen.getByText('adminCorrespondence.id ▲')).toBeInTheDocument();
  fireEvent.click(screen.getByText('adminCorrespondence.apartment'));
  expect(screen.getByText('adminCorrespondence.apartment ▲')).toBeInTheDocument();
  fireEvent.click(screen.getByText('adminCorrespondence.type'));
  expect(screen.getByText('adminCorrespondence.type ▲')).toBeInTheDocument();
  fireEvent.click(screen.getByText('adminCorrespondence.date'));
  expect(screen.getByText('adminCorrespondence.date ▲')).toBeInTheDocument();
  fireEvent.click(screen.getByText('adminCorrespondence.notified'));
  expect(screen.getByText('adminCorrespondence.notified ▲')).toBeInTheDocument();

  // Check the sorting results
  const sortedCorrespondence1 = sortCorrespondence(data_test, sortConfig1);
  const sortedCorrespondence2 = sortCorrespondence(data_test, sortConfig2);
  const sortedCorrespondence3 = sortCorrespondence(data_test, sortConfig3);

  expect(sortedCorrespondence1).toEqual([
    {
      "id": 2,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Letters",
      "arrival_time": "2024-05-26T03:42:00.000Z",
      "is_notified": 1,
      "is_claimed": 0
    },
    {
      "id": 1,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Packages",
      "arrival_time": "2024-05-26T03:35:00.000Z",
      "is_notified": 0,
      "is_claimed": 0
    }
  ]);

  expect(sortedCorrespondence2).toEqual([
    {
      "id": 2,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Letters",
      "arrival_time": "2024-05-26T03:42:00.000Z",
      "is_notified": 1,
      "is_claimed": 0
    },
    {
      "id": 1,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Packages",
      "arrival_time": "2024-05-26T03:35:00.000Z",
      "is_notified": 0,
      "is_claimed": 0
    }
  ]);

  expect(sortedCorrespondence3).toEqual([
    {
      "id": 1,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Packages",
      "arrival_time": "2024-05-26T03:35:00.000Z",
      "is_notified": 0,
      "is_claimed": 0
    },
    {
      "id": 2,
      "apartment_identifier": 101,
      "tower": 1,
      "mail_type": "Letters",
      "arrival_time": "2024-05-26T03:42:00.000Z",
      "is_notified": 1,
      "is_claimed": 0
    }
  ]);
});

// TEST 6: API Fetch (error handling)
test('alert shows up when an API fetch error occurs', async () => {
  global.fetch = jest.fn().mockRejectedValueOnce(new Error('API fetch error'));

  render(
    <Router>
      <AdminCorrespondence />
    </Router>
  );

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('https://dduhalde.online/.netlify/functions/api/unclaimed_correspondence/null/null');
  });
  expect(screen.getByText('❌ adminCorrespondence.generalFailAlert')).toBeInTheDocument();
});