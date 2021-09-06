import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { loadCustomers, selectCustomersIndex } from './customersIndexSlice';

export default function BooksList() {
  const {
    loading,
    customers
  } = useAppSelector(selectCustomersIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCustomers())
  }, [dispatch])

  if (loading) return <span>Loading...</span>

  const bookList = customers.map((customer) => (
    <div>
      <h3>First Name: {customer.firstname}</h3>
      <p>Last Name: {customer.lastname}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  ));

  return (
    <div>
      {bookList}
    </div>
  )
}
