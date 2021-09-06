import React from 'react';
import CustomersList from 'features/customerSearch/CustomersList';
import { Container, Typography } from '@material-ui/core';

export default function CustomersView() {
  return (
    <Container>
      <Typography variant="h2">
        Customers
      </Typography>
      <CustomersList />
    </Container>
  )
}
