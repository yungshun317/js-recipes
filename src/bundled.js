/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"style.css\");\n\n//# sourceURL=webpack://js-recipes/./src/sass/main.scss?");

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/***/ (() => {

eval("const recipeContainer = document.querySelector(\".recipe\");\n\nconst timeout = function (s) {\n    return new Promise(function (_, reject) {\n        setTImeout(function () {\n            reject(new Error(`Request took too long! Timeout after ${s} second.`));\n        }, s * 1000);\n    });\n};\n\nconst renderSpinner = function(parentEl) {\n    const markup = `\n    <div class=\"spinner\">\n        <svg>\n            <use xlink:href=\"src/img/icons.svg#icon-loader\"></use>\n        </svg>\n    </div>\n    `\n    parentEl.innerHTML = \"\";\n    parentEl.insertAdjacentHTML('afterbegin', markup);\n    console.log(\"Spinner rendered.\")\n}\n\nconst showRecipe = async function () {\n    try {\n        // [1] Load Recipe\n        renderSpinner(recipeContainer);\n        const res = await fetch(\"https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886\");\n        const data = await res.json();\n\n        if (!res.ok) throw new Error(`${data.message} (${res.status})`);\n\n        console.log(res, data);\n        /*\n        Response {type: 'cors', url: 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886', redirected: false, status: 200, ok: true, ...}\n        {status: 'success', data: {...}}\n            data:\n                recipe:\n                    cooking_time: 45\n                    id: \"5ed6604591c37cdc054bc886\"\n                    image_url: \"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg\"\n                    ingredients: (7) [{...}, {...}, {...}, {...}, {...}, {...}, {...}]\n                    publisher: \"My Baking Addiction\"\n                    servings: 4\n                    source_url: \"http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/\"\n                    title: \"Spicy Chicken and Pepper Jack Pizza\"\n                    [[Prototype]]: Object\n                [[Prototype]]: Object\n                status: \"success\"\n            [[Prototype]]: Object\n        */\n        let {recipe} = data.data;\n        recipe = {\n            id: recipe.id,\n            title: recipe.title,\n            publisher: recipe.publisher,\n            sourceUrl: recipe.source_url,\n            image: recipe.image_url,\n            servings: recipe.servings,\n            cookingTime: recipe.cooking_time,\n            ingredients: recipe.ingredients\n        }\n        console.log(recipe);\n        // {id: '5ed6604591c37cdc054bc886', title: 'Spicy Chicken and Pepper Jack Pizza', publisher: 'My Baking Addiction', sourceUrl: 'http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/', image: 'http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg', ...}\n\n        // [2] Render recipe\n        const markup = `\n            <figure class=\"recipe__fig\">\n                <img src=\"${recipe.image}\" alt=\"${recipe.title}\" class=\"recipe__img\" />\n                <h1 class=\"recipe__title\">\n                    <span>${recipe.title}</span>\n                </h1>\n            </figure>\n    \n            <div class=\"recipe__details\">\n              <div class=\"recipe__info\">\n                <svg class=\"recipe__info-icon\">\n                  <use href=\"src/img/icons.svg#icon-clock\"></use>\n                </svg>\n                <span class=\"recipe__info-data recipe__info-data--minutes\">${recipe.cookingTime}</span>\n                <span class=\"recipe__info-text\">minutes</span>\n              </div>\n              <div class=\"recipe__info\">\n                <svg class=\"recipe__info-icon\">\n                  <use href=\"src/img/icons.svg#icon-users\"></use>\n                </svg>\n                <span class=\"recipe__info-data recipe__info-data--people\">${recipe.servings}</span>\n                <span class=\"recipe__info-text\">servings</span>\n    \n                <div class=\"recipe__info-buttons\">\n                  <button class=\"btn--tiny btn--increase-servings\">\n                    <svg>\n                      <use href=\"src/img/icons.svg#icon-minus-circle\"></use>\n                    </svg>\n                  </button>\n                  <button class=\"btn--tiny btn--increase-servings\">\n                    <svg>\n                      <use href=\"src/img/icons.svg#icon-plus-circle\"></use>\n                    </svg>\n                  </button>\n                </div>\n              </div>\n    \n              <div class=\"recipe__user-generated\">\n                <svg>\n                  <use href=\"src/img/icons.svg#icon-user\"></use>\n                </svg>\n              </div>\n              <button class=\"btn--round\">\n                <svg class=\"\">\n                  <use href=\"src/img/icons.svg#icon-bookmark-fill\"></use>\n                </svg>\n              </button>\n            </div>\n    \n            <div class=\"recipe__ingredients\">\n              <h2 class=\"heading--2\">Recipe ingredients</h2>\n              <ul class=\"recipe__ingredient-list\">\n                ${recipe.ingredients.map(ing => {\n                    return `\n                    <li class=\"recipe__ingredient\">\n                      <svg class=\"recipe__icon\">\n                        <use href=\"src/img/icons.svg#icon-check\"></use>\n                      </svg>\n                      <div class=\"recipe__quantity\">${ing.quantity}</div>\n                      <div class=\"recipe__description\">\n                        <span class=\"recipe__unit\">${ing.unit}</span>\n                        ${ing.description}\n                      </div>\n                    </li>\n                    `\n                }).join('')}\n    \n            <div class=\"recipe__directions\">\n              <h2 class=\"heading--2\">How to cook it</h2>\n              <p class=\"recipe__directions-text\">\n                This recipe was carefully designed and tested by\n                <span class=\"recipe__publisher\">${recipe.publisher}</span>. Please check out\n                directions at their website.\n              </p>\n              <a\n                class=\"btn--small recipe__btn\"\n                href=\"${recipe.sourceUrl}\"\n                target=\"_blank\"\n              >\n                <span>Directions</span>\n                <svg class=\"search__icon\">\n                  <use href=\"src/img/icons.svg#icon-arrow-right\"></use>\n                </svg>\n              </a>\n            </div>\n        `;\n        recipeContainer.innerHTML = '';\n        recipeContainer.insertAdjacentHTML('afterbegin', markup);\n    } catch (err) {\n        alert(err);\n    }\n};\n\nshowRecipe();\n\n//# sourceURL=webpack://js-recipes/./src/js/controller.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./src/js/controller.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sass/main.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;