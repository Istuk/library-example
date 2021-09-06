import React from 'react';
import BooksList from 'features/books/BooksList';
import { Container, makeStyles, Typography } from '@material-ui/core';
import AddBook from 'features/books/AddBook';

const useStyles = makeStyles({
  actionsRoot: {
    display: 'flex'
  },
  actionsSpacer: {
    flexGrow: 1
  }
})

export default function BooksView() {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.actionsRoot}>
        <Typography variant="h4">
          Books
        </Typography>
        <div className={classes.actionsSpacer} />
        <AddBook />
      </div>
      <BooksList />
    </Container>
  )
}
