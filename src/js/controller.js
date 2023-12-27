import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

const controlAddRecipe = async function (newRecipe) {
    try {
        console.log(newRecipe);
        /*
        // Before `Object.fromEntries()`
        (12) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
            0: (2) ['title', 'TEST']
            1: (2) ['sourceUrl', 'TEST']
            2: (2) ['image', 'TEST']
            3: (2) ['publisher', 'TEST']
            4: (2) ['cookingTime', '23']
            5: (2) ['servings', '23']
            6: (2) ['ingredient-1', '0.5,kg,Rice']
            7: (2) ['ingredient-2', '1,,Avocado']
            8: (2) ['ingredient-3', ',,salt']
            9: (2) ['ingredient-4', '']
            10: (2) ['ingredient-5', '']
            11: (2) ['ingredient-6', '']
            length: 12
            [[Prototype]]: Array(0)
        // After `Object.fromEntries()`
        {title: 'TEST', sourceUrl: 'TEST', image: 'TEST', publisher: 'TEST', cookingTime: '23', ...}
            cookingTime: "23"
            image: "TEST"
            ingredient-1: "0.5,kg,Rice"
            ingredient-2: "1,,Avocado"
            ingredient-3: ",,salt"
            ingredient-4: ""
            ingredient-5: ""
            ingredient-6: ""
            publisher: "TEST"
            servings: "23"
            sourceUrl: "TEST"
            title: "TEST"
            [[Prototype]]: Object
        */

        // Upload the new recipe data
        await model.uploadRecipe(newRecipe);
    } catch (err) {
        console.error(err);
        addRecipeView.renderError(err.message);
    }
};

const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();