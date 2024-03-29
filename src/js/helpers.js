import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second.`));
        }, s * 1000);
    });
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uploadData)
            })
            : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}

export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        console.log(res, data);
        /*
        // Recipe
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
        // Search
        Response {type: 'cors', url: 'https://forkify-api.herokuapp.com/api/v2/recipes/?search=pizza', redirected: false, status: 200, ok: true, ...}
        {status: 'success', results: 59, data: {…}}
            data: {recipes: Array(59)}
            results: 59
            status: "success"
            [[Prototype]]: Object
        */

        return data;
    } catch (err) {
        throw err;
    }
}

export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        })

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}