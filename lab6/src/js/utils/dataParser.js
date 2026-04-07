// Файл: js/utils/dataParser.js
export const parseRecipeData = apiData => {
  if (!apiData || !apiData.meals || !apiData.meals[0]) return null;

  const meal = apiData.meals[0];
  // Формируем чистый объект только с нужными нам полями
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
  };
};
