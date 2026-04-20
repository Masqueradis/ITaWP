export const parseRecipeData = apiData => {
  if (!apiData || !apiData.meals || !apiData.meals[0]) return null;

  const meal = apiData.meals[0];
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
  };
};
