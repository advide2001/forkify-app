import { API_URL } from './config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    // If something goes wrong with the request
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
