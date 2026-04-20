import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Используем vi вместо jest
vi.mock('./App.css', () => ({}));
vi.mock('./components/Header.css', () => ({}));
