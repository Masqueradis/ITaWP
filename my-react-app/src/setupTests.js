import '@testing-library/jest-dom';
import 'jest-location-mock';

// Мок alert
window.alert = jest.fn();

// Мок localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Мок location (реализует все методы, включая reload)
require('jest-location-mock');