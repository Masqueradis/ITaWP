import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterGroup from '../../../src/components/ui/FilterGroup';

describe('Компонент FilterGroup', () => {
  const options = ['Все', 'Высокий', 'Низкий'];

  it('рендерит заголовок и все переданные опции как кнопки', () => {
    render(
      <FilterGroup 
        label="Приоритет" 
        options={options} 
        activeValue="Все" 
        onSelect={() => {}} 
      />
    );

    // Проверяем заголовок
    expect(screen.getByText('Приоритет:')).toBeInTheDocument();
    
    // Проверяем, что отрендерились все 3 кнопки
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('передает правильное значение при клике на опцию', () => {
    const handleSelect = vi.fn();
    render(
      <FilterGroup 
        label="Статус" 
        options={options} 
        activeValue="Все" 
        onSelect={handleSelect} 
      />
    );

    // Кликаем по кнопке "Высокий"
    fireEvent.click(screen.getByText('Высокий'));
    
    // Проверяем, что onSelect вызвался с аргументом "Высокий"
    expect(handleSelect).toHaveBeenCalledWith('Высокий');
  });
});