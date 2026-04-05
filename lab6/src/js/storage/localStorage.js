// Файл: js/storage/localStorage.js
const CACHE_KEY = 'tastyblog_cached_recipe';

export const StorageService = {
    saveData: (data) => {
        try {
            const cacheObject = {
                payload: data,
                timestamp: new Date().getTime()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
        } catch (e) {
            console.error("Ошибка сохранения в LocalStorage", e);
        }
    },
    
    getData: () => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const parsed = JSON.parse(cached);
            // Проверяем "свежесть" кэша (например, храним не больше 24 часов)
            const isExpired = (new Date().getTime() - parsed.timestamp) > 86400000;
            
            return isExpired ? null : parsed.payload;
        } catch (e) {
            console.error("Ошибка чтения из LocalStorage", e);
            return null;
        }
    }
};