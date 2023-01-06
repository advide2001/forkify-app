import { API_URL } from './config.js';
import { getJSON } from './helper.js';
import recipeView from './view/recipeView.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const data = await getJSON(`${API_URL}/${id}`);

  try {
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
