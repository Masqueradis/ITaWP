import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskForm from './AddTaskForm';

describe('Компонент AddTaskForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('выводит alert, если название пустое', () => {
    render(<AddTaskForm />);
    const submitButton = screen.getByRole('button', { name: /Добавить задачу/i });
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith('Введите название!');
  });

  it('сохраняет задачу в localStorage и перезагружает страницу', () => {
    render(<AddTaskForm />);
    const titleInput = screen.getByPlaceholderText('Что нужно сделать?');
    const submitButton = screen.getByRole('button', { name: /Добавить задачу/i });

    fireEvent.change(titleInput, { target: { value: 'Новая задача' } });
    fireEvent.click(submitButton);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'added_tasks',
      expect.any(String)
    );
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});