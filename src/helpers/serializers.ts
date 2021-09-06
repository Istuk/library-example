export function serializeBorrowsForBook(borrows: Borrow[], customers: Customer[]): BorrowModel[] {
  return borrows.map((borrow) => ({
    id: borrow.id,
    customer: customers ? customers.find((c) => c.id === borrow.customerId) : undefined,
    untilDate: new Date(borrow.untilDate)
  }))
}

export function serializeBorrowsForCustomers(borrows: Borrow[], books: Book[]): BorrowModel[] {
  return borrows.map((borrow) => ({
    id: borrow.id,
    book: books.find((b) => b.id === borrow.bookId),
    untilDate: new Date(borrow.untilDate)
  }))
}