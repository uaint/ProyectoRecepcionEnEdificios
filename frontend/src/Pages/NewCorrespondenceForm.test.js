import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewCorrespondenceForm from './NewCorrespondenceForm';

// Mock fetch fuction (simulate request)
global.fetch = jest.fn();

// Mock function t for translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('NewCorrespondenceForm Component', () => {
  test('renders search form by default', () => {
    const { getByLabelText, getByText } = render(<NewCorrespondenceForm />);
    
    // Verify if elements from the search form are present
    expect(getByText('correspondenceForm.addNewCorrespondence')).toBeInTheDocument();
    expect(getByLabelText('correspondenceForm.selectApartment')).toBeInTheDocument();
    expect(getByLabelText('correspondenceForm.selectTower')).toBeInTheDocument();
    expect(getByText('correspondenceForm.searchresident')).toBeInTheDocument();
  });

  test('switches to correspondence form after search', async () => {
    fetch.mockResolvedValueOnce({ json: () => [] });

    const { getByLabelText, getByText } = render(<NewCorrespondenceForm />);
    
    // Fill all the fields of the form and send it
    fireEvent.change(getByLabelText('correspondenceForm.selectApartment'), { target: { value: '101' } });
    fireEvent.change(getByLabelText('correspondenceForm.selectTower'), { target: { value: '1' } });
    fireEvent.click(getByText('correspondenceForm.searchresident'));

    // Wait for the request to be done and change to the correspondence form
        expect(getByText('correspondenceForm.addNewCorrespondence')).toBeInTheDocument();
        expect(getByText('correspondenceForm.addCorrespondence')).toBeInTheDocument();
        expect(getByText('correspondenceForm.timeOfArrival')).toBeInTheDocument();
        expect(getByText('correspondenceForm.type')).toBeInTheDocument();
        expect(getByText('correspondenceForm.letters')).toBeInTheDocument();
        expect(getByText('correspondenceForm.packages')).toBeInTheDocument();
        expect(getByText('correspondenceForm.item')).toBeInTheDocument();
        expect(getByText('correspondenceForm.food')).toBeInTheDocument();
        expect(getByText('correspondenceForm.others')).toBeInTheDocument();
  }); 

  test('complete form', async () => {
    fetch.mockResolvedValueOnce({ json: () => [] });

    const { getByLabelText, getByText } = render(<NewCorrespondenceForm />);
    
    // Fill all fields of the search form and send it
    fireEvent.change(getByLabelText('correspondenceForm.selectApartment'), { target: { value: '101' } });
    fireEvent.change(getByLabelText('correspondenceForm.selectTower'), { target: { value: '1' } });
    fireEvent.click(getByText('correspondenceForm.searchresident'));
    fireEvent.change(getByLabelText('correspondenceForm.timeOfArrival'), { target: { value: Date.now() } });
    fireEvent.click(getByText('correspondenceForm.addCorrespondence'));

  }); 
});
