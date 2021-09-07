import JsonServerBase from "./JsonServerBase";

export default class BorrowsService extends JsonServerBase {
  public getResourceName() {
    return 'borrows';
  }

  public async getBorrows() {
    return await this.get('/borrows');
  }

  public async getBorrow(id: number) {
    return await this.get(`/borrow/${id}`);
  }

  public async createBorrow(borrow: Borrow) {
    return await this.post('/borrows', borrow);
  }

  public async updateBook(id: number, borrow: Borrow) {
    return await this.put(`/books/${id}`, borrow);
  }
}