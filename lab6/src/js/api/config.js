// Файл: js/api/config.js
export const API_CONFIG = {
    // В реальном приложении базовый URL должен использовать HTTPS (Шаг 5)
    BASE_URL: 'https://www.themealdb.com/api/json/v1/1',
    // Тестовый ключ для TheMealDB. В продакшене хранится на бэкенде.
    API_KEY: '1', 
    ENDPOINTS: {
        RANDOM_RECIPE: '/random.php'
    }
};