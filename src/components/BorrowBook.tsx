import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useAppDispatch } from 'app/hooks';
import AppModal from 'components/AppModal';
import { loadBookDetails } from 'features/bookDetails/bookDetailsSlice';
import React, { Fragment, useCallback, useState } from 'react';

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
    fetch('http://localhost:4300/borrows', {
      method: 'POST',
      body: JSON.stringify({
        bookId: book.id,
        customerId: selectedCustomer,
        untilDate
      }),
      headers:  { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      dispatch(loadBookDetails(book.id as number));
    })
    
    event.preventDefault();
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
