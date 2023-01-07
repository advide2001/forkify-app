import View from './view';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault(); //Default form behaviour: Refresh on submit
      handler();
    });
  }

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
