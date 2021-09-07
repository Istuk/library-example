import JsonServerBase from "./JsonServerBase";

export default class BooksService extends JsonServerBase {
  public getResourceName() {
    return 'books';
  }

  public async getBooks() {
    return await this.get('/books');
  }

  public async getBook(id: number) {
    return await this.get(`/books/${id}?_embed=borrows`);
  }

  public async createBook(book: Book) {
    return await this.post('/books', book);
  }

  public async updateBook(id: number, book: Book) {
    return await this.put(`/books/${id}`, book);
  }
}