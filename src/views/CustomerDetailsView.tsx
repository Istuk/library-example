import { Container } from '@material-ui/core';
import CustomerDetails from 'features/customerDetails/CustomerDetails';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerDetailsView() {
  const params: any = useParams();

  return (
    <Container>
      <CustomerDetails id={parseInt(params.id)} />
    </Container>
  )
}
