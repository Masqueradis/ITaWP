import React from 'react';

const Button = ({ 
  children,           // Текст кнопки
  variant = 'primary', // Стиль: primary или outline
  isActive = false,    // Новая пропса: подсвечена ли кнопка
  onClick              // Функция (команда)
}) => {
  // Собираем классы: базовая кнопка + вариант + класс активности
  const className = `btn btn--${variant} ${isActive ? 'btn--active' : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;