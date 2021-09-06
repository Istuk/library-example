import React from 'react';
import BooksList from 'features/bookSearch/BooksList';
import { Container, Typography } from '@material-ui/core';

export default function BooksView() {
  return (
    <Container>
      <Typography variant="h2">
        Books
      </Typography>
      <BooksList />
    </Container>
  )
}
