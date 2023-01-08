import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPageChange(handlerFunction) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      // Guard class
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handlerFunction(goToPage);
    });
  }

  _generatePrevButton(pageNumber) {
    return `
    <button data-goto = "${
      pageNumber - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>page ${pageNumber - 1}</span>
    </button>
    `;
  }
  _generateNextButton(pageNumber) {
    return `
    <button data-goto = "${
      pageNumber + 1
    }" class="btn--inline pagination__btn--next">
      <span>page ${pageNumber + 1}</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // at page 1, and there are no pages
    if (currentPage === 1 && numOfPages > 1) {
      return this._generateNextButton(currentPage);
    }
    // at page 1, and there no more pages
    if (currentPage === 1 && numOfPages === 1) {
      return ``;
    }
    // Last page
    if (currentPage === numOfPages && numOfPages !== 1) {
      return this._generatePrevButton(currentPage);
    }
    // Other page
    if (currentPage < numOfPages && currentPage > 1) {
      let markup = this._generateNextButton(currentPage);
      markup += this._generatePrevButton(currentPage);
      return markup;
    }
  }
}

export default new PaginationView();
