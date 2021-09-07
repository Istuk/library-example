import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useAppDispatch } from 'app/hooks';
import AppModal from 'components/AppModal';
import { loadBookDetails } from 'features/bookDetails/bookDetailsSlice';
import React, { Fragment, useCallback, useState } from 'react';
import BorrowsService from 'services/BorrowsService';

const useStyles = makeStyles({
  inputField: {
    width: '300px'
  },
  fieldGroup: {
    display: 'block',
    marginBottom: '16px'
  }
});

function initialDate() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0];
}

export function BorrowBook({book, customers}: {book: BookDetails, customers: Customer[]}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerNotValid, setCustomerNotValid] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<number | undefined>(undefined);
  const [untilDate, setUntilDate] = useState(initialDate);
  const dispatch = useAppDispatch();

  const classes = useStyles();
  
  const availableCopies = book.borrows.length - book.quantity;

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const service = new BorrowsService();

    if (!book.id) throw new Error('book id is required to borrow a book');

    if (!selectedCustomer) {
      setCustomerNotValid(true);
      return;
    }
    
    service.createBorrow({
      bookId: book.id,
      customerId: selectedCustomer,
      untilDate
    })
      .then(() => {
        dispatch(loadBookDetails(book.id as number));
      })
  }

  const handleSelect = (event: any) => {
    setSelectedCustomer(event.target.value)
  }

  const handleDateChange = (event: any) => {
    setUntilDate(event.value);
  }

  return (
    <Fragment>
      <Button disabled={availableCopies === 0} onClick={handleOpen}>Borrow</Button>
      <AppModal
        title={`Borrow ${book.title}`}
        open={isOpen}
        onClose={handleClose}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <FormControl className={classes.fieldGroup} >
            <InputLabel id="select-customer-label">Customer</InputLabel>
            <Select
              labelId="select-customer-label"
              value={selectedCustomer}
              onChange={handleSelect}
              className={classes.inputField}
              error={customerNotValid}
            >
              <MenuItem value={undefined}>-</MenuItem>
              {customers.map((customer) => (
                <MenuItem value={customer.id}>{customer.firstname} {customer.lastname}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.fieldGroup} >
            <TextField type="date" label="Until Date" value={untilDate} onChange={handleDateChange} />
          </FormControl>
          <Button type="submit">Borrow</Button>
        </form>
      </AppModal>

    </Fragment>
  )
}
