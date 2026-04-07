const CACHE_KEY = 'tastyblog_cached_recipe';
const FAVORITES_KEY = 'tastyblog_favorites'; // Отдельный ключ для избранного

export const StorageService = {
    // --- ВАШИ СУЩЕСТВУЮЩИЕ МЕТОДЫ (без изменений) ---
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
            const isExpired = (new Date().getTime() - parsed.timestamp) > 86400000;
            
            return isExpired ? null : parsed.payload;
        } catch (e) {
            console.error("Ошибка чтения из LocalStorage", e);
            return null;
        }
    },

    // --- НОВЫЕ МЕТОДЫ ДЛЯ ИЗБРАННОГО ---
    getFavorites: () => {
        try {
            const data = localStorage.getItem(FAVORITES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Ошибка чтения избранного", e);
            return [];
        }
    },

    saveFavorites: (favorites) => {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (e) {
            console.error("Ошибка сохранения избранного", e);
        }
    }
};