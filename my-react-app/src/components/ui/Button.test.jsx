import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../../src/components/ui/Button';

describe('Компонент Button', () => {
  it('корректно рендерит переданный текст (children)', () => {
    render(<Button>Нажми меня</Button>);
    // Проверяем, что элемент с таким текстом появился в DOM
    expect(screen.getByText('Нажми меня')).toBeInTheDocument();
  });

  it('добавляет класс активности, если передано isActive={true}', () => {
    render(<Button isActive={true}>Активная кнопка</Button>);
    const buttonElement = screen.getByText('Активная кнопка');
    // Проверяем наличие нужного CSS класса
    expect(buttonElement).toHaveClass('btn--active');
  });

  it('вызывает функцию onClick при нажатии', () => {
    // Создаем "шпионскую" (mock) функцию
    const handleClick = vi.fn(); 
    render(<Button onClick={handleClick}>Кликни</Button>);
    
    // Имитируем клик пользователя
    fireEvent.click(screen.getByText('Кликни'));
    
    // Проверяем, что функция была вызвана ровно 1 раз
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});