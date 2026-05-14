import { sortTasks, SORT_OPTIONS } from './sortTasks';

describe('Функция sortTasks', () => {
  const mockTasks = [
    { id: 1, title: 'Яблоко', priority: 'Низкий' },
    { id: 2, title: 'Апельсин', priority: 'Высокий' },
    { id: 3, title: 'Банан', priority: 'Средний' },
  ];

  it('сортирует по алфавиту (А-Я)', () => {
    const sorted = sortTasks(mockTasks, 'Название (А-Я)');
    expect(sorted[0].title).toBe('Апельсин');
    expect(sorted[1].title).toBe('Банан');
    expect(sorted[2].title).toBe('Яблоко');
  });

  it('сортирует против алфавита (Я-А)', () => {
    const sorted = sortTasks(mockTasks, 'Название (Я-А)');
    expect(sorted[0].title).toBe('Яблоко');
    expect(sorted[2].title).toBe('Апельсин');
  });

  it('сортирует сначала важные', () => {
    const sorted = sortTasks(mockTasks, 'Сначала важные');
    expect(sorted[0].priority).toBe('Высокий');
    expect(sorted[2].priority).toBe('Низкий');
  });

  it('сортирует сначала простые', () => {
    const sorted = sortTasks(mockTasks, 'Сначала простые');
    expect(sorted[0].priority).toBe('Низкий');
    expect(sorted[2].priority).toBe('Высокий');
  });

  it('возвращает исходный массив при неизвестном типе сортировки', () => {
    const sorted = sortTasks(mockTasks, 'Неизвестно');
    expect(sorted[0].title).toBe('Яблоко');
  });
});