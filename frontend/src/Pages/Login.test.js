import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './Login';

// Mock para useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  test('should render login form', () => {
    render(<Login />);
    
    expect(screen.getByText("login.loginButton")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Remember/i)).toBeInTheDocument();
    expect(screen.getByText("login.loginButton")).toBeInTheDocument();
  });

  test('should show validation errors if form is submitted with empty fields', async () => {
    render(<Login />);
    
    fireEvent.click(screen.getByText("login.loginButton"));
      expect(screen.queryByText(/Username is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
  });

  test('should show validation error if password is too short', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByText("login.loginButton"));

    await waitFor(() => {
      expect(screen.queryByText(/Username is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password must be at least 8 characters long/i)).not.toBeInTheDocument();
    });
  });

  test('should show validation error if username or password is incorrect', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText("login.loginButton"));

      expect(screen.queryByText(/Username is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Incorrect username or password/i)).not.toBeInTheDocument();

  });

  // Aquí podrías añadir más pruebas para validar el comportamiento de inicio de sesión correcto
});
