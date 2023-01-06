import * as model from './model.js';
import recipeView from './view/recipeView';
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
    alert(err);
  }
};
controlRecipes();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// Merge n event listeners into one event listener
['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
