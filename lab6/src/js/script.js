/* ==========================================
   1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И ПОИСК ЭЛЕМЕНТОВ
   ========================================== */
import { fetchRandomRecipe } from './api/apiService.js';
import { parseRecipeData } from './utils/dataParser.js';
import { StorageService } from './storage/localStorage.js';

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
const LOGO_BURGER_SRC = '/lab6/src/images/logo.png';

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

/* ==========================================
   5. ИНТЕГРАЦИЯ API И UI (СЛУЧАЙНЫЙ РЕЦЕПТ)
   ========================================== */
const initApiFeature = () => {
    const mainContainer = document.querySelector('.main-content');
    if (!mainContainer) return;

    // Шаг 4: Динамическое создание UI для взаимодействия с API
    const apiSection = document.createElement('div');
    apiSection.className = 'hero api-block';
    apiSection.style.marginTop = '30px';
    apiSection.innerHTML = `
        <h2>Не знаете, что приготовить?</h2>
        <button id="btn-fetch-api" class="filter-btn hover" style="margin: 20px auto;">Получить случайный рецепт</button>
        <div id="api-status" style="margin-top: 10px; font-weight: bold;"></div>
        
        <div id="api-result" style="display: none; margin-top: 20px; text-align: left; background: var(--color-secondary); padding: 20px; border-radius: 15px; color: var(--color-accent);">
            <h3 id="api-title" style="margin-bottom: 15px; font-size: 24px;"></h3>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <img id="api-img" src="" alt="Рецепт" style="max-width: 300px; border-radius: 10px; object-fit: cover;">
                <p id="api-text" style="flex: 1; font-family: var(--font-secondary); line-height: 1.5; max-height: 300px; overflow-y: auto;"></p>
            </div>
        </div>
    `;
    
    // Вставляем блок перед сеткой рецептов
    const recipesGrid = document.querySelector('.recipes-grid');
    if (recipesGrid) {
        recipesGrid.parentNode.insertBefore(apiSection, recipesGrid);
    } else {
        mainContainer.appendChild(apiSection);
    }

    const btnFetch = document.getElementById('btn-fetch-api');
    const statusBox = document.getElementById('api-status');
    const resultBox = document.getElementById('api-result');

    // Функция обновления UI данными (Шаг 4)
    const renderRecipe = (data) => {
        document.getElementById('api-title').innerText = `${data.title} (${data.area})`;
        document.getElementById('api-img').src = data.image;
        document.getElementById('api-text').innerText = data.instructions;
        resultBox.style.display = 'block';
    };

    // Обработчик кнопки
    btnFetch.addEventListener('click', async () => {
        // Установка состояния загрузки
        statusBox.innerText = '⏳ Поиск рецепта...';
        statusBox.style.color = 'inherit';
        resultBox.style.display = 'none';
        btnFetch.disabled = true;

        try {
            let recipeData = null;

            // Шаг 6: Проверка работы при отключенном интернете
            if (!navigator.onLine) {
                statusBox.innerText = '🔴 Нет сети. Ищем рецепт в кэше...';
                recipeData = StorageService.getData();
                
                if (!recipeData) {
                    throw new Error('Офлайн режим: в кэше нет сохраненных данных.');
                }
                setTimeout(() => {
                    statusBox.innerText = '🟢 Показан последний загруженный рецепт (Офлайн)';
                    statusBox.style.color = '#28a745';
                }, 1000);
            } else {
                // Онлайн запрос
                const rawData = await fetchRandomRecipe();
                recipeData = parseRecipeData(rawData);
                
                if (recipeData) {
                    StorageService.saveData(recipeData); // Кэшируем успешный ответ
                    statusBox.innerText = ''; // Очищаем статус
                } else {
                    throw new Error('API вернул пустой результат');
                }
            }

            renderRecipe(recipeData);

        } catch (error) {
            // Шаг 6: Убедитесь в правильной обработке ошибок API
            statusBox.innerText = `❌ Ошибка: ${error.message}`;
            statusBox.style.color = 'red';
        } finally {
            btnFetch.disabled = false;
        }
    });
};

// Запускаем инициализацию API фичи после загрузки DOM
document.addEventListener('DOMContentLoaded', initApiFeature);

