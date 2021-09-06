import { Container } from '@material-ui/core';
import BookDetails from 'features/bookDetails/BookDetails';
import React from 'react';
import { useParams } from 'react-router';

export default function BookDetailsView() {
  const params: any = useParams();

  return (
    <Container>
      <BookDetails id={parseInt(params.id)} />
    </Container>
  )
}
