import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from './TaskItem';

/**
 * @description Тестирует компонент TaskItem на корректность отображения данных и функциональность кнопки.
 * @case Отображение корректных данных задачи (нормальный случай)
 * @case Обработка задачи с минимальными данными (крайние случаи)
 * @case Проверка вызова лога при нажатии на кнопку (логирование)
 */
describe('TaskItem компонент', () => {
  
  // Мокаем console.log, чтобы проверить его вызов
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const mockTask = {
    id: 1,
    title: 'Тестовая задача',
    description: 'Описание тестовой задачи',
    priority: 'high',
    status: 'в работе'
  };

  test('должен корректно обрабатывать нормальный случай', () => {
    console.group('Тест: Нормальный случай');
    console.log('Входные данные задачи:');
    console.table(mockTask);

    render(<TaskItem task={mockTask} />);

    // Проверка рендеринга данных
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(/Статус: в работе/i)).toBeInTheDocument();
    
    console.log('Результат: Компонент успешно отрендерил все поля.');
    console.groupEnd();
  });

  test('должен обрабатывать крайние случаи (пустые поля)', () => {
    console.group('Тест: Крайние случаи');
    const minimalTask = {
      id: 99,
      title: '',
      description: '',
      priority: 'low',
      status: 'новое'
    };
    
    console.log('Тестирование с пустыми строками в заголовке и описании:');
    console.table(minimalTask);

    render(<TaskItem task={minimalTask} />);
    
    const button = screen.getByRole('button', { name: /завершить/i });
    expect(button).toBeInTheDocument();
    
    console.log('Результат: Компонент не упал при пустых строках.');
    console.groupEnd();
  });

  test('должен обрабатывать ошибки и логирование при клике', () => {
    console.group('Тест: Логирование и действия');
    
    render(<TaskItem task={mockTask} />);
    
    const button = screen.getByRole('button', { name: /завершить/i });
    
    console.log('Имитация нажатия на кнопку "Завершить"...');
    fireEvent.click(button);

    // Проверка, что console.log был вызван с правильным текстом
    expect(consoleSpy).toHaveBeenCalledWith(`Задача ${mockTask.id} завершена!`);
    
    console.log('Результат: Событие клика обработано, лог в консоль отправлен.');
    console.groupEnd();
  });

  // Очищаем мок после тестов
  afterAll(() => {
    consoleSpy.mockRestore();
  });
});