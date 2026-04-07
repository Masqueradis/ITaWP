// --- 1. НАСТРОЙКИ И ПЕРЕМЕННЫЕ ---
import { StorageService } from './storage/localStorage.js';
const homeView = document.getElementById('home-view');
const favView = document.getElementById('fav-view');
const btnOpenFav = document.getElementById('open-fav');
const btnOpenHome = document.getElementById('open-home');

// --- 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (РАБОТА С ДАННЫМИ) ---

// Получить список из LocalStorage

// Собрать данные из карточки
const getRecipeData = card => {
  const titleElement = card.querySelector('.recipe-card__title');
  const imgElement = card.querySelector('.recipe-card__image');
  const descElement = card.querySelector('.recipe-card__description');

  return {
    // .trim() очень важен!
    title: titleElement ? titleElement.innerText.trim() : 'Без названия',
    image: imgElement ? imgElement.src : '',
    description: descElement ? descElement.innerText.trim() : '',
  };
};

// --- 3. ЛОГИКА ИЗБРАННОГО (КЛИКИ ПО СЕРДЦУ) ---

const handleFavoriteClick = btn => {
  const card = btn.closest('.recipe-card');
  if (!card) return;

  const recipeData = getRecipeData(card);
  let favorites = StorageService.getFavorites();

  // Ищем индекс рецепта в массиве избранного
  // Сравниваем заголовки, обрезая пробелы для верности
  const index = favorites.findIndex(fav => fav.title.trim() === recipeData.title.trim());

  if (index !== -1) {
    // РЕЦЕПТ УЖЕ ЕСТЬ -> УДАЛЯЕМ
    favorites.splice(index, 1);
    btn.classList.remove('active');
    console.log('Удалено из избранного:', recipeData.title);
  } else {
    // РЕЦЕПТА НЕТ -> ДОБАВЛЯЕМ
    favorites.push(recipeData);
    btn.classList.add('active');
    console.log('Добавлено в избранное:', recipeData.title);
  }

  // Сохраняем результат
  StorageService.saveFavorites(favorites);

  // Обновляем страницу избранного, если мы на ней находимся
  if (favView && favView.style.display === 'block') {
    renderFavorites();
  }
};

const syncHomeHearts = () => {
  const favorites = StorageService.getFavorites(); // Берем актуальный список
  const homeCards = homeView.querySelectorAll('.recipe-card');

  homeCards.forEach(card => {
    const btn = card.querySelector('.recipe-card__favorite');
    const recipeData = getRecipeData(card);

    // Проверяем: есть ли этот рецепт в памяти прямо сейчас?
    const isFav = favorites.some(fav => fav.title.trim() === recipeData.title.trim());

    // Если есть — красим, если нет — убираем цвет
    if (isFav) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
};

// --- 4. ОТРИСОВКА СТРАНИЦЫ ИЗБРАННОГО ---

const renderFavorites = () => {
  const favGrid = document.querySelector('.favorites-grid');
  const favorites = StorageService.getFavorites();

  if (favorites.length === 0) {
    favGrid.innerHTML = '<p id="empty-fav-msg">У вас пока нет избранных рецептов.</p>';
    return;
  }

  favGrid.innerHTML = favorites
    .map(
      recipe => `
    <article class="recipe-card">
      <button class="recipe-card__favorite active">
        <span class="heart-icon">❤</span>
      </button>
      <figure class="recipe-card__figure">
        <img src="${recipe.image}" class="recipe-card__image" />
      </figure>
      <div class="recipe-card__content">
        <h2 class="recipe-card__title">${recipe.title}</h2>
        <p class="recipe-card__description">${recipe.description}</p>
      </div>
    </article>
  `
    )
    .join('');

  // Вешаем клики на НОВЫЕ созданные сердечки
  favGrid.querySelectorAll('.recipe-card__favorite').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      handleFavoriteClick(btn);
    });
  });
};

// --- 5. НАВИГАЦИЯ ---

btnOpenFav.addEventListener('click', e => {
  e.preventDefault();
  homeView.style.display = 'none';
  favView.style.display = 'block';
  window.location.hash = 'favorites';
  renderFavorites();
});

btnOpenHome.addEventListener('click', e => {
  e.preventDefault();
  favView.style.display = 'none';
  homeView.style.display = 'block';
  window.location.hash = 'home';

  syncHomeHearts(); // <--- МАГИЯ ЗДЕСЬ! Обновляем сердечки при возврате
});

// --- 6. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---

document.addEventListener('DOMContentLoaded', () => {
  const favoriteButtons = document.querySelectorAll('.recipe-card__favorite');
  const favorites = StorageService.getFavorites();

  favoriteButtons.forEach(btn => {
    const card = btn.closest('.recipe-card');
    const recipeData = getRecipeData(card);

    // Подсвечиваем сердечки, которые уже в базе
    if (favorites.some(fav => fav.title === recipeData.title)) {
      btn.classList.add('active');
    }

    // Вешаем событие клика
    btn.addEventListener('click', e => {
      e.stopPropagation();
      handleFavoriteClick(btn);
    });
  });
});
