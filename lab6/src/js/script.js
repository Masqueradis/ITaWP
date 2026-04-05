/* ==========================================
   1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И ПОИСК ЭЛЕМЕНТОВ
   ========================================== */
const header = document.querySelector('.site-header');
const allCards = document.querySelectorAll('.recipe-card');
const mainContainer = document.getElementById('menu');

// Переменные плавающего таймера
let stickyTimerInterval = null;
let timeLeft = 0;
let isTimerRunning = false;

const stickyTimer = document.getElementById('sticky-timer');
const timerDisplay = stickyTimer.querySelector('.sticky-timer__display');
const timerSetup = stickyTimer.querySelector('.timer-setup');
const minutesInput = document.getElementById('timer-minutes');
const btnStartStop = stickyTimer.querySelector('.start-stop');
const btnResetClose = stickyTimer.querySelector('.reset-close');
const iconStartStop = btnStartStop.querySelector('i');

// --- НОВОЕ: ПУТЬ К ВАШЕМУ БУРГЕРУ-ЛОГОТИПУ ---
const LOGO_BURGER_SRC = '/lab5/src/images/logo.png';

console.log('Найдены базовые элементы страницы:', {
  header: header,
  cards: allCards,
  container: mainContainer,
});


/* ==========================================
   2. ЛОГИКА ТАБОВ (ФИЛЬТРАЦИЯ РЕЦЕПТОВ)
   ========================================== */
const tabsButtons = document.querySelectorAll('.filter-btn');
const tabsItems = document.querySelectorAll('.tab-pane');

tabsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const targetContent = document.getElementById(targetId);

    tabsButtons.forEach(btn => btn.classList.remove('active'));
    tabsItems.forEach(item => item.classList.remove('active'));

    button.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
  });
});


/* ==========================================
   3. ЛОГИКА ПЛАВАЮЩЕГО (STICKY) ТАЙМЕРА
   ========================================== */

// Кнопки плюс и минус минуты
document.getElementById('plus-min').addEventListener('click', () => {
  minutesInput.value = Math.min(parseInt(minutesInput.value) + 1, 180);
});

document.getElementById('minus-min').addEventListener('click', () => {
  minutesInput.value = Math.max(parseInt(minutesInput.value) - 1, 1);
});

// Обновление цифр на табло
const updateTimerDisplay = () => {
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
};

// Функция "Сброс и закрытие" (убивает процесс в фоне)
const resetAndClose = () => {
  if (stickyTimerInterval) {
    clearInterval(stickyTimerInterval);
    stickyTimerInterval = null;
  }

  isTimerRunning = false;
  timeLeft = 0;

  stickyTimer.style.display = 'none';
  timerSetup.style.display = 'flex';
  timerDisplay.style.display = 'none';
  iconStartStop.className = 'fas fa-play';
};

// Логика кнопки Старт/Пауза
const toggleTimer = () => {
  if (isTimerRunning) {
    // Пауза
    clearInterval(stickyTimerInterval);
    isTimerRunning = false;
    iconStartStop.className = 'fas fa-play';
  } else {
    // Старт (первый запуск)
    if (!stickyTimerInterval && timeLeft <= 0) {
      const mins = parseInt(minutesInput.value) || 10;
      timeLeft = mins * 60;
      timerSetup.style.display = 'none';
      timerDisplay.style.display = 'block';
    }

    isTimerRunning = true;
    iconStartStop.className = 'fas fa-pause';

    updateTimerDisplay();

    if (stickyTimerInterval) clearInterval(stickyTimerInterval);

    stickyTimerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        alert('Блюдо готово!');
        resetAndClose();
      }
    }, 1000);
  }
};

btnStartStop.addEventListener('click', toggleTimer);
btnResetClose.addEventListener('click', resetAndClose);

const openStickyTimer = () => {
  stickyTimer.style.display = 'block';
};


/* ==========================================
   4. ЛОГИКА МОДАЛЬНОГО ОКНА (РЕЦЕПТЫ И ОТЗЫВЫ)
   ========================================== */
const modal = document.getElementById('recipe-modal');
const modalContent = modal.querySelector('.modal__content');
const closeBtn = modal.querySelector('.modal__close-btn');

// --- ОБНОВЛЕНО: Генерация картинок бургеров в отзывах ---
const generateBurgerRatingHTML = (score) => {
  let html = '<div class="comment-rating">';
  for (let i = 0; i < score; i++) {
    // Заменяем <i> на <img> с классом
    html += `<img src="${LOGO_BURGER_SRC}" alt="Бургер" class="rating-logo-icon">`;
  }
  html += '</div>';
  return html;
};

allCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.recipe-card__title').innerText;
    const img = card.querySelector('.recipe-card__image').src;
    const description = card.querySelector('.recipe-card__description').innerText;
    const details = card.querySelector('.recipe-card__schema').innerHTML;

    // Генерируем внутренности модалки
    modalContent.innerHTML = `     
      <div class="modal__image-container">
        <img src="${img}" alt="${title}">
        <div class="modal__buttons-block">
            <button class="expanding-btn comment-btn" title="Оставить комментарий">
              <div class="expanding-btn__icon"><i class="fas fa-comment"></i></div>
              <span class="expanding-btn__text">Оставить отзыв</span>
            </button>
            <button class="expanding-btn timer-btn" title="Запустить таймер">
              <div class="expanding-btn__icon"><i class="fas fa-stopwatch"></i></div>
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

        <div class="modal-extensions">
            <div class="comments-container" style="display: none;">
                <h3 style="margin-bottom: 15px;">Отзывы</h3>
                <ul class="comments-list">
                </ul>
                <form class="comment-form">
                    <input type="text" class="comment-name" placeholder="Ваше имя" required>
                    
                    <div class="rating-selection">
                        <input type="radio" id="burger5" name="rating" value="5"><label for="burger5"><img src="${LOGO_BURGER_SRC}" alt="5 бургеров" class="rating-logo-form"></label>
                        <input type="radio" id="burger4" name="rating" value="4"><label for="burger4"><img src="${LOGO_BURGER_SRC}" alt="4 бургера" class="rating-logo-form"></label>
                        <input type="radio" id="burger3" name="rating" value="3"><label for="burger3"><img src="${LOGO_BURGER_SRC}" alt="3 бургера" class="rating-logo-form"></label>
                        <input type="radio" id="burger2" name="rating" value="2"><label for="burger2"><img src="${LOGO_BURGER_SRC}" alt="2 бургера" class="rating-logo-form"></label>
                        <input type="radio" id="burger1" name="rating" value="1"><label for="burger1"><img src="${LOGO_BURGER_SRC}" alt="1 бургер" class="rating-logo-form"></label>
                    </div>

                    <textarea class="comment-text" placeholder="Ваш отзыв..." required></textarea>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
      </div>
    `;

    modal.showModal();
    document.body.style.overflow = 'hidden';

    // Находим и вешаем события на кнопки после генерации HTML
    const btnTriggerTimer = modalContent.querySelector('.timer-btn');
    const btnShowComments = modalContent.querySelector('.comment-btn');
    const commentsContainer = modalContent.querySelector('.comments-container');
    const commentForm = modalContent.querySelector('.comment-form');
    const commentsList = modalContent.querySelector('.comments-list');
    const ratingSelection = modalContent.querySelector('.rating-selection');

    // Нажатие на таймер (закрывает рецепт и открывает стики)
    btnTriggerTimer.addEventListener('click', () => { 
      closeModal(); 
      openStickyTimer(); 
    });

    // Показ формы отзывов
    btnShowComments.addEventListener('click', () => {
      const isHidden = commentsContainer.style.display === 'none';
      commentsContainer.style.display = isHidden ? 'block' : 'none';
      if (isHidden) commentsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Отправка отзыва
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = commentForm.querySelector('.comment-name').value;
      const text = commentForm.querySelector('.comment-text').value;
      const selectedRating = commentForm.querySelector('input[name="rating"]:checked');

      if (!selectedRating) {
        ratingSelection.classList.add('error');
        setTimeout(() => ratingSelection.classList.remove('error'), 500);
        return;
      }

      const score = selectedRating.value;

      const newComment = document.createElement('li');
      newComment.className = 'comment-item';
      newComment.innerHTML = `
        ${generateBurgerRatingHTML(score)}
        <strong>${name}:</strong>
        <p>${text}</p>
      `;

      commentsList.appendChild(newComment);
      commentForm.reset();
      commentsList.scrollTop = commentsList.scrollHeight;
    });
  });
});

const closeModal = () => {
  modal.close();
  document.body.style.overflow = '';
};

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });