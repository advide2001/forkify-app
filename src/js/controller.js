import * as model from './model.js';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
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
    // Render initial results
    resultsView.render(model.getSearchResultsPerPage(1));
    // Render initial pagination button
    paginationView.render(model.state.search);
    // Clear the input field
    searchView.clearInput();
  } catch (error) {
    console.log(error);
  }
};

const controlPageChangeRecipes = function (goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPerPage(goToPage));
  // Render NEW pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the serving is model.state
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerPageChange(controlPageChangeRecipes);
};
init();
