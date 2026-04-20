import { API_CONFIG } from './config.js';

export const fetchRandomRecipe = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RANDOM_RECIPE}`;

  console.log(`[API] Начало запроса: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    console.log(`[API] Ответ получен. Статус: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      console.warn(`[API] Сервер вернул ошибку: ${response.status}`);
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log('[API] Данные успешно распарсены:', data);

    return data;
  } catch (error) {
    console.error('Ошибка в fetchRandomRecipe');
    console.error(`Сообщение: ${error.message}`);
    if (error.stack) {
      console.error(`Стек вызовов: ${error.stack}`);
    }

    throw error;
  }
};


