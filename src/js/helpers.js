export const getJSON = async function (url) {
    try {
        const res = await fetch(url);
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
        return data;
    } catch (err) {
        throw err;
    }
}