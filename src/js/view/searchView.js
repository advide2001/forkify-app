class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault(); //Default form behaviour: Refresh on submit
      handler();
    });
  }

  clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
