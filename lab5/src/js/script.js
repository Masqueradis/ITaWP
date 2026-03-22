console.log('Hello world');

const header = document.querySelector('.site-header');
const allcards = document.querySelectorAll('.recipe-card');
const maincontainer = document.getElementById('menu');

console.log('найдено элементов:', {
  header: header,
  cards: allcards,
  container: maincontainer,
});

// Изменение текстового содержимого
// const projectTitle = document.querySelector('.logo-short');
// projectTitle.textContent = 'Новое название проекта';

// изменение HTML содержимого
// const mainContent = document.querySelector('.main-content');
// mainContent.innerHTML += '<div class="notification">Новое уведомление</div>';

// // Создание новых элементов
// const newButton = document.createElement('button');
// newButton.className = 'btn btn--primary';
// newButton.textContent = 'Новая кнопка';
// document.querySelector('.header__container').appendChild(newButton);

// 1. Находим все кнопки и все блоки контента
const tabsButtons = document.querySelectorAll('.filter-btn');
const tabsItems = document.querySelectorAll('.tab-pane');

// 2. Вешаем событие клика на каждую кнопку
tabsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target'); // Получаем id нужного блока
    const targetContent = document.getElementById(targetId);

    // 3. Убираем класс active у всех кнопок
    tabsButtons.forEach(btn => btn.classList.remove('active'));

    // 4. Убираем класс active у всех блоков контента
    tabsItems.forEach(item => item.classList.remove('active'));

    // 5. Добавляем класс active нажатой кнопке и соответствующему блоку
    button.classList.add('active');
    targetContent.classList.add('active');
  });
});

const modal = document.getElementById('recipe-modal');
const modalContent = modal.querySelector('.modal__content');
const closeBtn = modal.querySelector('.modal__close-btn');
const cards = document.querySelectorAll('.recipe-card');

// Проходимся по всем карточкам
cards.forEach(card => {
  card.addEventListener('click', () => {
    // 1. Берем данные из карточки
    const title = card.querySelector('.recipe-card__title').innerText;
    const img = card.querySelector('.recipe-card__image').src;
    const description = card.querySelector('.recipe-card__description').innerText;
    const details = card.querySelector('.recipe-card__schema').innerHTML; // Тот самый скрытый контент

    // 2. Формируем разметку внутри модалки
    modalContent.innerHTML = `     
  <div class="modal__image-container">
    <img src="${img}" alt="${title}">
    
    <!-- Контейнер для кнопок поверх фото -->
    <div class="modal__buttons-block">
        
        <!-- Кнопка комментария -->
        <button class="expanding-btn comment-btn" title="Оставить комментарий">
          <div class="expanding-btn__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8H17M7 12H13M21 12C21 16.9706 16.9706 21 12 21C10.685 21 9.4317 20.7178 8.3 20.21L3 22L4.79 16.7C4.28225 15.5683 4 14.315 4 13C4 8.02944 8.02944 4 13 4C17.9706 4 21 8.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="expanding-btn__text">Оставить отзыв</span>
        </button>

        <!-- Кнопка таймера -->
        <button class="expanding-btn timer-btn" title="Запустить таймер">
          <div class="expanding-btn__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="expanding-btn__text">Запустить таймер</span>
        </button>

    </div>
  </div>

  <div class="modal_text">
    <h2>${title}</h2>
    <p><i>${description}</i></p>
    <hr>
    <div class="modal-recipe-details">
      ${details} 
    </div>
  </div>
    `;

    // 3. Показываем модалку (метод showModal сразу активирует ::backdrop)
    modal.showModal();

    // Блокируем скролл основной страницы, пока открыто окно
    document.body.style.overflow = 'hidden';
  });
});

// Закрытие окна
closeBtn.addEventListener('click', () => {
  modal.close();
  document.body.style.overflow = '';
});

// Закрытие при клике на темную область (вне окна)
modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.close();
    document.body.style.overflow = '';
  }
});
