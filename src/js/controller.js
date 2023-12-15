import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
        resultsView.renderSpinner();

        // [1] Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // [2] Load search results
        await model.loadSearchResults(query);

        // [3] Render results
        console.log(model.state.search.results);
        // Array(59)
        resultsView.render(model.getSearchResultsPage(1));
    } catch (err) {
        alert(err);
    }
}

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
}

init();