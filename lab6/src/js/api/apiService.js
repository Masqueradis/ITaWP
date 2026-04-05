// Файл: js/api/apiService.js
import { API_CONFIG } from './config.js';

export const fetchRandomRecipe = async () => {
    try {
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RANDOM_RECIPE}`;
        
        // Шаг 5: Использование безопасного протокола (HTTPS по умолчанию в URL)
        const response = await fetch(url, {
            method: 'GET', // Шаг 5: Ограничение метода (только чтение публичных данных)
        });

        // Шаг 6: Проверка корректности ответа
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка сервиса API:", error);
        throw error; // Пробрасываем для обработки в UI
    }
};