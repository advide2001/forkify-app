import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numOfPages);
    // at page 1, and there are no pages
    if (this._data.page === 1 && numOfPages > 1) {
      return 'page 1, other pages';
    }
    // at page 1, and there no more pages
    if (this._data.page === 1 && numOfPages === 1) {
      return 'only page 1';
    }
    // Last page
    if (this._data.page === numOfPages && numOfPages !== 1) {
      return 'last page';
    }
    // Other page
    if (this._data.page < numOfPages) {
      return 'other page';
    }
  }
}

export default new PaginationView();
