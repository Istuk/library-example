import { makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import CustomerPreview from 'components/CustomerPreview';
import React, { useEffect } from 'react';
import { loadCustomers, selectCustomersIndex } from './customersIndexSlice';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

export default function BooksList() {
  const {
    loading,
    customers
  } = useAppSelector(selectCustomersIndex);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(loadCustomers())
  }, [dispatch])

  if (loading) return <span>Loading...</span>

  const bookList = customers.map((customer) => (
    <CustomerPreview customer={customer} />
  ));

  return (
    <div className={classes.root}>
      {bookList}
    </div>
  )
}
