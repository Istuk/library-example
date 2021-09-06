import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { loadBooks, selectBooksIndex } from './booksIndexSlice';
import BookPreview from 'components/BookPreview';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})

export default function BooksList() {
  const {
    loading,
    books
  } = useAppSelector(selectBooksIndex);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(loadBooks())
  }, [dispatch])

  if (loading) return <span>Loading...</span>

  const bookList = books.map((book) => (
    <BookPreview book={book} />
  ));

  return (
    <div className={classes.root}>
      {bookList}
    </div>
  )
}
