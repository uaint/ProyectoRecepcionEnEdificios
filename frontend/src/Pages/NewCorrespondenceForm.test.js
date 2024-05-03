import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewCorrespondenceForm from './NewCorrespondenceForm';

// Mock de la función fetch para simular la solicitud
global.fetch = jest.fn();

// Mock de la función t para la traducción
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('NewCorrespondenceForm Component', () => {
  test('renders search form by default', () => {
    const { getByLabelText, getByText } = render(<NewCorrespondenceForm />);
    
    // Verifica que los elementos del formulario de búsqueda estén presentes
    expect(getByText('correspondenceForm.addNewCorrespondence')).toBeInTheDocument();
    expect(getByLabelText('correspondenceForm.selectApartment')).toBeInTheDocument();
    expect(getByLabelText('correspondenceForm.selectTower')).toBeInTheDocument();
    expect(getByText('correspondenceForm.searchresident')).toBeInTheDocument();
  });

  test('switches to correspondence form after search', async () => {
    fetch.mockResolvedValueOnce({ json: () => [] });

    const { getByLabelText, getByText } = render(<NewCorrespondenceForm />);
    
    // Completa los campos del formulario de búsqueda y envía el formulario
    fireEvent.change(getByLabelText('correspondenceForm.selectApartment'), { target: { value: '101' } });
    fireEvent.change(getByLabelText('correspondenceForm.selectTower'), { target: { value: '1' } });
    fireEvent.click(getByText('correspondenceForm.searchresident'));

    // Espera a que se realice la solicitud y cambie al formulario de correspondencia
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
    
    // Completa los campos del formulario de búsqueda y envía el formulario
    fireEvent.change(getByLabelText('correspondenceForm.selectApartment'), { target: { value: '101' } });
    fireEvent.change(getByLabelText('correspondenceForm.selectTower'), { target: { value: '1' } });
    fireEvent.click(getByText('correspondenceForm.searchresident'));
    fireEvent.change(getByLabelText('correspondenceForm.timeOfArrival'), { target: { value: Date.now() } });
    fireEvent.click(getByText('correspondenceForm.addCorrespondence'));

  }); 
});
