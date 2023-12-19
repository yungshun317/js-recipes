export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        // const newElements = newDOM.querySelectorAll('*');
        // console.log(newElements);
        // NodeList(79) [figure.recipe__fig, img.recipe__img, h1.recipe__title, span, div.recipe__details, div.recipe__info, svg.recipe__info-icon, use, span.recipe__info-data.recipe__info-data--minutes, span.recipe__info-text, div.recipe__info, svg.recipe__info-icon, use, span.recipe__info-data.recipe__info-data--people, span.recipe__info-text, div.recipe__info-buttons, button.btn--tiny.btn--update-servings, svg, use, button.btn--tiny.btn--update-servings, svg, use, div.recipe__user-generated, button.btn--round, svg, use, div.recipe__ingredients, h2.heading--2, ul.recipe__ingredient-list, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, div.recipe__directions, h2.heading--2, p.recipe__directions-text, span.recipe__publisher, a.btn--small.recipe__btn, span, svg.search__icon, use]
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        console.log(newElements);
        // (79) [figure.recipe__fig, img.recipe__img, h1.recipe__title, span, div.recipe__details, div.recipe__info, svg.recipe__info-icon, use, span.recipe__info-data.recipe__info-data--minutes, span.recipe__info-text, div.recipe__info, svg.recipe__info-icon, use, span.recipe__info-data.recipe__info-data--people, span.recipe__info-text, div.recipe__info-buttons, button.btn--tiny.btn--update-servings, svg, use, button.btn--tiny.btn--update-servings, svg, use, div.recipe__user-generated, button.btn--round, svg, use, div.recipe__ingredients, h2.heading--2, ul.recipe__ingredient-list, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, div.recipe__directions, h2.heading--2, p.recipe__directions-text, span.recipe__publisher, a.btn--small.recipe__btn, span, svg.search__icon, use]
        console.log(curElements);
        // (79) [figure.recipe__fig, img.recipe__img, h1.recipe__title, span, div.recipe__details, div.recipe__info, svg.recipe__info-icon, use, span.recipe__info-data.recipe__info-data--minutes, span.recipe__info-text, div.recipe__info, svg.recipe__info-icon, use, span.recipe__info-data.recipe__info-data--people, span.recipe__info-text, div.recipe__info-buttons, button.btn--tiny.btn--update-servings, svg, use, button.btn--tiny.btn--update-servings, svg, use, div.recipe__user-generated, button.btn--round, svg, use, div.recipe__ingredients, h2.heading--2, ul.recipe__ingredient-list, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, li.recipe__ingredient, svg.recipe__icon, use, div.recipe__quantity, div.recipe__description, span.recipe__unit, div.recipe__directions, h2.heading--2, p.recipe__directions-text, span.recipe__publisher, a.btn--small.recipe__btn, span, svg.search__icon, use]

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            console.log(curEl, newEl.isEqualNode(curEl));
            // <span class="recipe__info-data recipe__info-data--people">5</span> false

            // Update changed text
            if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== '') {
                console.log(newEl.firstChild.nodeValue.trim());
                // 5
                curEl.textContent = newEl.textContent;
            }

            // Update changed attributes
            if (!newEl.isEqualNode(curEl)) {
                console.log(Array.from(newEl.attributes));
                /*
                (2) [class, data-update-to]
                    0: class
                    1: data-update-to
                    length: 2
                    [[Prototype]]: Array(0)
                */
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
            }
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function () {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="src/img/icons.svg#icon-loader"></use>
                </svg>
            </div>
        `;
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        console.log("Spinner rendered.")
    }

    renderError(message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}