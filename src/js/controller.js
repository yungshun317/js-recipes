const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTImeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second.`));
        }, s * 1000);
    });
};

const showRecipe = async function () {
    try {
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
    } catch (err) {
        alert(err);
    }
};

showRecipe();