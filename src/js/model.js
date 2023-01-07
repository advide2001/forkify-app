import { API_URL } from './config.js';
import { getJSON } from './helper.js';
import recipeView from './view/recipeView.js';

export const state = {
  recipe: {},
  search: {
    queryTerm: '',
    results: [],
  },
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
    throw err;
  }
};

export const loadSearchRecipes = async function (queryTerm) {
  try {
    state.search.queryTerm = queryTerm;
    const data = await getJSON(`${API_URL}?search=${queryTerm}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
