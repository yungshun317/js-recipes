import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        console.log(id);

        if (!id) return;
        recipeView.renderSpinner();

        // [0] Upate results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // [1] Update bookmarks view
        bookmarksView.update(model.state.bookmarks);

        // [2] Load Recipe
        await model.loadRecipe(id);
        // const { recipe } = model.state;

        // [3] Render recipe
        recipeView.render(model.state.recipe);
        // const recipeView = new RecipeView(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
        console.error(err);
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
        resultsView.render(model.getSearchResultsPage());

        // [4] Render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
}

const controlPagination = function (goToPage) {
    console.log(goToPage);

    // [1] Render new results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // [2] Render new pagination buttons
    paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
    // [1] Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // console.log(model.state.recipe);
    // bookmarked: true

    // [2] Update recipe view
    recipeView.update(model.state.recipe);

    // [3] Render bookmarks
    bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
}

const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
}

init();