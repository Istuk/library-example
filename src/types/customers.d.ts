interface Customer {
    id?: number
    firstname: string
    lastname: string
    birthdate: Date
    phone: string
}

interface Borrow {
    customerId: number
    bookId: number
    untilDate: Date
}
