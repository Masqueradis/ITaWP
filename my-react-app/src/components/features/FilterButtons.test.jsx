import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterButtons from './FilterButtons';

// Мокаем дочерний компонент FilterGroup для изоляции теста
jest.mock("../ui/FilterGroup", () => ({ label, options, activeValue, onSelect }) => (
  <div data-testid={`group-${label}`}>
    <label>{label}</label>
    <span data-testid={`active-${label}`}>{activeValue}</span>
    {options.map(option => (
      <button key={option} onClick={() => onSelect(option)}>
        {option}
      </button>
    ))}
  </div>
));

/**
 * @description Тестирует компонент FilterButtons (группа фильтров приоритета и статуса)
 * @case Отображение фильтров с корректными активными значениями
 * @case Проверка наличия всех вариантов выбора (options)
 * @case Отработка кликов и вызов функций обратного вызова
 */
describe('FilterButtons компонент', () => {
  const mockProps = {
    currentPriority: "Высокий",
    currentStatus: "В процессе",
    onPriorityChange: jest.fn(),
    onStatusChange: jest.fn(),
  };

  const priorityOptions = ["Все", "Высокий", "Средний", "Низкий"];
  const statusOptions = ["Все", "Нужно сделать", "В процессе", "Готово"];

  test('должен корректно обрабатывать нормальный случай', () => {
    console.group('Тест FilterButtons: Нормальный случай');
    console.log('Проверка отображения групп фильтров с заданными пропсами:');
    console.table({ 
      Приоритет: mockProps.currentPriority, 
      Статус: mockProps.currentStatus 
    });

    render(<FilterButtons {...mockProps} />);

    // Проверка заголовков групп
    expect(screen.getByText('Приоритет')).toBeInTheDocument();
    expect(screen.getByText('Статус')).toBeInTheDocument();

    // Проверка активных значений
    expect(screen.getByTestId('active-Приоритет')).toHaveTextContent("Высокий");
    expect(screen.getByTestId('active-Статус')).toHaveTextContent("В процессе");

    console.log('Результат: Компонент отобразил правильные активные значения.');
    console.groupEnd();
  });

  test('должен обрабатывать крайние случаи', () => {
    console.group('Тест FilterButtons: Крайние случаи');
    console.log('Проверка наличия всех опций в фильтрах:');
    
    render(<FilterButtons {...mockProps} />);

    console.log('Опции приоритета:');
    console.table(priorityOptions);
    priorityOptions.forEach(opt => {
      const buttons = screen.getAllByRole('button', { name: opt });
      expect(buttons.length).toBeGreaterThan(0);
    });

    console.log('Опции статуса:');
    console.table(statusOptions);
    statusOptions.forEach(opt => {
      const buttons = screen.getAllByRole('button', { name: opt });
      expect(buttons.length).toBeGreaterThan(0); 
      expect(buttons[0]).toBeInTheDocument();
    });

    console.log('Результат: Все кнопки опций присутствуют в DOM.');
    console.groupEnd();
  });

  test('должен обрабатывать ошибки и вызовы функций', () => {
    console.group('Те?ст FilterButtons: Логирование и события');
    render(<FilterButtons {...mockProps} />);

    console.log('Имитация выбора нового приоритета "Низкий"...');
    const lowPriorityBtn = screen.getByRole('button', { name: 'Низкий' });
    fireEvent.click(lowPriorityBtn);
    expect(mockProps.onPriorityChange).toHaveBeenCalledWith('Низкий');

    console.log('Имитация выбора нового статуса "Готово"...');
    const doneStatusBtn = screen.getByRole('button', { name: 'Готово' });
    fireEvent.click(doneStatusBtn);
    expect(mockProps.onStatusChange).toHaveBeenCalledWith('Готово');

    console.log('Результат: Колбэки вызваны с верными аргументами.');
    console.groupEnd();
  });
});