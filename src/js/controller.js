import * as model from './model.js';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultsView from './view/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    // Get the hash of the recipe
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. load recipe
    await model.loadRecipe(id);

    // 2. rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchRecipes = async function () {
  try {
    resultsView.renderSpinner();
    // Get the search query
    const searchTerm = searchView.getQuery();
    // Guard class, no query return immediately
    if (!searchTerm) return;
    // laod data results
    await model.loadSearchRecipes(searchTerm);
    // Render results
    resultsView.render(model.getSearchResultsPerPage());
    // Clear the input field
    searchView.clearInput();
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchRecipes);
};
init();
