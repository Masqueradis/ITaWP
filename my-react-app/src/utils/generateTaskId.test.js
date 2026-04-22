import { generateTaskId } from './generateTaskId';

describe('Функция generateTaskId', () => {
  it('возвращает строку', () => {
    const id = generateTaskId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('генерирует уникальные ID', () => {
    const id1 = generateTaskId();
    const id2 = generateTaskId();
    expect(id1).not.toBe(id2);
  });
});