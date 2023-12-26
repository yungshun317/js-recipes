import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: 10
    },
    bookmarks: []
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }

        if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

        console.log(state.recipe);
        // {id: '5ed6604591c37cdc054bc886', title: 'Spicy Chicken and Pepper Jack Pizza', publisher: 'My Baking Addiction', sourceUrl: 'http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/', image: 'http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg', ...}
    } catch (err) {
        console.error(`${err}`);
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
           return {
               id: rec.id,
               title: rec.title,
               publisher: rec.publisher,
               image: rec.image_url
           }
        });
        // Whenever do a new search, the page will reset to 1
        state.search.page = 1;
    } catch (err) {
        console.error(`${err}`);
        throw err;
    }
};

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 9

    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings
        // 2 * 8 / 4 = 4
    });

    state.recipe.servings = newServings;
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
}

export const deleteBookmark = function (id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as not bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}

init();
console.log(state.bookmarks);

const clearBookmarks = function () {
    localStorage.clear('bookmarks');
}

// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
    const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        // console.log(ingredients);
        /*
        (3) [Array(2), Array(2), Array(2)]
            0: (2) ['ingredient-1', '0.5,kg,Rice']
            1: (2) ['ingredient-2', '1,,Avocado']
            2: (2) ['ingredient-3', ',,salt']
            length: 3
            [[Prototype]]: Array(0)
        */
        .map(ing => {
            const [quantity, unit, description] = ing[1].replaceAll(' ', '').split(',');
            return { quantity, unit, description };
    });
    console.log(ingredients);
    /*
    (3) [{...}, {...}, {...}]
        0: {quantity: '0.5', unit: 'kg', description: 'Rice'}
        1: {quantity: '1', unit: '', description: 'Avocado'}
        2: {quantity: '', unit: '', description: 'salt'}
        length: 3
        [[Prototype]]: Array(0)
    */
}