import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        console.log(id);

        if (!id) return;
        recipeView.renderSpinner();

        // [1] Load Recipe
        await model.loadRecipe(id);
        // const { recipe } = model.state;

        // [2] Render recipe
        recipeView.render(model.state.recipe);
        // const recipeView = new RecipeView(model.state.recipe);
    } catch (err) {
        alert(err);
    }
};

const controlSearchResults = async function () {
    try {
        await model.loadSearchResults('pizza');
        console.log(model.state.search.results);
        // Array(59)
    } catch (err) {
        alert(err);
    }
}

controlSearchResults();

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
}

init();