import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTImeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second.`));
        }, s * 1000);
    });
};

const renderSpinner = function(parentEl) {
    const markup = `
    <div class="spinner">
        <svg>
            <use xlink:href="src/img/icons.svg#icon-loader"></use>
        </svg>
    </div>
    `
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML('afterbegin', markup);
    console.log("Spinner rendered.")
}

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        console.log(id);

        if (!id) return;
        renderSpinner(recipeContainer);

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

// showRecipe();
/*
window.addEventListener('hashChange', controlRecipe);
window.addEventListener('load', controlRecipe);
*/
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));