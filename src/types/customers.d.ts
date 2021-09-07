interface Borrow {
    id: nubmer
    customerId: number
    bookId: number
    untilDate: string
}

interface BorrowModel {
    id?: number
    customer?: Customer
    book?: Book
    untilDate?: Date
}

interface Customer {
    id?: number
    firstname: string
    lastname: string
    birthdate: string
    phone: string
}

type CustomerFormFields = 'firstname' | 'lastname' | 'birthdate' | 'phone';

interface CustomerDetails extends Customer {
    borrows: Borrow[]
}
