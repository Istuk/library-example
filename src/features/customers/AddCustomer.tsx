import { Button, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import AppModal from 'components/AppModal';

const initialFormValues = {
  firstname: '',
  lastname: '',
  birthdate: '',
  phone: ''
}

const useStyles = makeStyles(() => ({
  fieldGroup: {
    marginBottom: '16px'
  }
}));

async function createCustomer(newCustomer: Customer): Promise<Customer> {
  const response = await fetch('http://localhost:4300/customers', {
    method: 'POST',
    body: JSON.stringify(newCustomer),
    headers:  { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default function AddCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialFormValues);
  const history = useHistory();
  const classes = useStyles();

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    createCustomer(form)
      .then((customer) => {
        history.push(`/customer/${customer.id}`)
      })

    event.preventDefault();
  }

  const handleChange = (field: CustomerFormFields) => (event: any) => {
    setForm({...form, [field]: event.target.value});
  }

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Add Customer</Button>
      <AppModal
        title="Create Customer"
        open={isOpen}
        onClose={handleCloseModal}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.fieldGroup}>
            <TextField label="First Name" onChange={handleChange('firstname')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="last Name" onChange={handleChange('lastname')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Date of birth" type="date" onChange={handleChange('birthdate')} defaultValue="1990-01-01" />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Phone Number" onChange={handleChange('phone')} />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
