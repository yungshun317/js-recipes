import View from './View.js';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this.#addHandlerShowWindow();
    }

    #toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    #addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.#toggleWindow.bind(this));
    }

    _generateMarkup() {

    }
}

export default new AddRecipeView();