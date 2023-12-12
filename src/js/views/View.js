export default class View {
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
}