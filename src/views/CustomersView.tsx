import React from 'react';
import CustomersList from 'features/customers/CustomersList';
import { Container, makeStyles, Typography } from '@material-ui/core';
import AddCustomer from 'features/customers/AddCustomer';

const useStyles = makeStyles({
  actionsRoot: {
    display: 'flex'
  },
  actionsSpacer: {
    flexGrow: 1
  }
})

export default function CustoemrView() {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.actionsRoot}>
        <Typography variant="h4">
          Customers
        </Typography>
        <div className={classes.actionsSpacer} />
        <AddCustomer />
      </div>
      <CustomersList />
    </Container>
  )
}
