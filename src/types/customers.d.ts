interface Customer {
    id?: number
    firstname: string
    lastname: string
    birthdate: string
    phone: string
}

interface Borrow {
    customerId: number
    bookId: number
    untilDate: string
}
