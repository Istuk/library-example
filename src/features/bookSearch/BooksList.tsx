import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { loadBooks, selectBooksIndex } from './booksIndexSlice';

export default function BooksList() {
  const {
    loading,
    books
  } = useAppSelector(selectBooksIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBooks())
  }, [dispatch])

  if (loading) return <span>Loading...</span>

  const bookList = books.map((book) => (
    <div>
      <h3>Name: {book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
    </div>
  ));

  return (
    <div>
      {bookList}
    </div>
  )
}
