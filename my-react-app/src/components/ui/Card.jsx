import React from 'react';

const Card = ({ 
  title, 
  description, 
  image, 
  children, 
  className = '' 
}) => {
  return (
    <article className={`card ${className}`}>
      {/* Рисуем картинку, только если она передана */}
      {image && (
        <div className='card__image'>
          <img src={image} alt={title} />
        </div>
      )}

      <div className='card__content'>
        <h3 className='card__title'>{title}</h3>

        {/* Рисуем описание, только если оно есть */}
        {description && <p className='card__description'>{description}</p>}

        {/* Сюда попадет всё остальное (статусы, кнопки и т.д.) */}
        {children && <div className='card__children'>{children}</div>}
      </div>
    </article>
  );
};

export default Card;