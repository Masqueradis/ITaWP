const CACHE_KEY = 'tastyblog_cached_recipe';
const FAVORITES_KEY = 'tastyblog_favorites';

export const StorageService = {
  saveData: data => {
    console.log('Попытка сохранения данных в LocalStorage...');
    try {
      const cacheObject = {
        payload: data,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
      console.log(`Данные успешно сохранены по ключу: ${CACHE_KEY}`);
    } catch (e) {
      console.error('Ошибка сохранения в LocalStorage', e);
    }
  },

  getData: () => {
    console.log('Запрос данных из LocalStorage...');
    try {
      const cached = localStorage.getItem(CACHE_KEY);

      if (!cached) {
        console.log('Запись в LocalStorage не найдена.');
        return null;
      }

      const parsed = JSON.parse(cached);
      const isExpired = new Date().getTime() - parsed.timestamp > 86400000;

      if (isExpired) {
        console.log('Срок жизни кэша истек (более 24 часов).');
        return null;
      }

      console.log('Актуальные данные успешно извлечены из кэша.');
      return parsed.payload;
    } catch (e) {
      console.error('Ошибка чтения из LocalStorage', e);
      return null;
    }
  },

  getFavorites: () => {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Ошибка чтения избранного', e);
      return [];
    }
  },

  saveFavorites: favorites => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Ошибка сохранения избранного', e);
    }
  },
};
