import { render, screen } from '@testing-library/react';
import PriorityBadge from './PriorityBadge';

describe('Компонент PriorityBadge', () => {
  it('рендерит высокий приоритет с правильным классом', () => {
    render(<PriorityBadge priority="Высокий" />);
    const badge = screen.getByText('Высокий');
    expect(badge).toHaveClass('badge', 'badge--high');
  });

  it('рендерит средний приоритет с правильным классом', () => {
    render(<PriorityBadge priority="Средний" />);
    expect(screen.getByText('Средний')).toHaveClass('badge--medium');
  });

  it('рендерит низкий приоритет с правильным классом', () => {
    render(<PriorityBadge priority="Низкий" />);
    expect(screen.getByText('Низкий')).toHaveClass('badge--low');
  });

  it('рендерит дефолтный класс при неизвестном приоритете', () => {
    render(<PriorityBadge priority="Неизвестно" />);
    expect(screen.getByText('Неизвестно')).toHaveClass('badge--default');
  });
});