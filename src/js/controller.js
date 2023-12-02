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

const showRecipe = async function () {
    try {
        // [1] Load Recipe
        renderSpinner(recipeContainer);
        const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        console.log(res, data);
        /*
        Response {type: 'cors', url: 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886', redirected: false, status: 200, ok: true, ...}
        {status: 'success', data: {...}}
            data:
                recipe:
                    cooking_time: 45
                    id: "5ed6604591c37cdc054bc886"
                    image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg"
                    ingredients: (7) [{...}, {...}, {...}, {...}, {...}, {...}, {...}]
                    publisher: "My Baking Addiction"
                    servings: 4
                    source_url: "http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/"
                    title: "Spicy Chicken and Pepper Jack Pizza"
                    [[Prototype]]: Object
                [[Prototype]]: Object
                status: "success"
            [[Prototype]]: Object
        */
        let {recipe} = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log(recipe);
        // {id: '5ed6604591c37cdc054bc886', title: 'Spicy Chicken and Pepper Jack Pizza', publisher: 'My Baking Addiction', sourceUrl: 'http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/', image: 'http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg', ...}

        // [2] Render recipe
        const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
    
            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="src/img/icons.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="src/img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text">servings</span>
    
                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="src/img/icons.svg#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="src/img/icons.svg#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>
    
              <div class="recipe__user-generated">
                <svg>
                  <use href="src/img/icons.svg#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round">
                <svg class="">
                  <use href="src/img/icons.svg#icon-bookmark-fill"></use>
                </svg>
              </button>
            </div>
    
            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(ing => {
                    return `
                    <li class="recipe__ingredient">
                      <svg class="recipe__icon">
                        <use href="src/img/icons.svg#icon-check"></use>
                      </svg>
                      <div class="recipe__quantity">${ing.quantity}</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                      </div>
                    </li>
                    `
                }).join('')}
    
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
        `;
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (err) {
        alert(err);
    }
};

showRecipe();