import { describe, it, expect } from 'vitest';
import { filterByPriority } from '../../src/utils/helpers';

describe('Функция filterByPriority', () => {
  const mockTasks = [
    { id: 1, title: 'Задача 1', priority: 'Высокий' },
    { id: 2, title: 'Задача 2', priority: 'Низкий' }
  ];

  it('должна возвращать все задачи, если выбран фильтр "Все"', () => {
    const result = filterByPriority(mockTasks, 'Все');
    expect(result.length).toBe(2);
  });

  it('должна возвращать только задачи с нужным приоритетом', () => {
    const result = filterByPriority(mockTasks, 'Высокий');
    expect(result.length).toBe(1);
    expect(result[0].priority).toBe('Высокий');
  });
});