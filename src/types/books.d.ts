interface Country {
    id: number
    name: string
}

interface Book {
    id?: number
    author: string
    countryId:  number
    pages: number
    title: string
    year: number
    quantity: number
}

type BookFormFields = 'title' | 'author' | 'countryId' | 'language' | 'pages' | 'year' | 'quantity';

interface BookDetails extends Book {
    borrows: Borrow[]
}
