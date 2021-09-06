import { Button, Modal, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const initialFormValues = {
  firstname: '',
  lastname: '',
  birthdate: '',
  phone: ''
}

type FormFields = 'firstname' | 'lastname' | 'birthdate' | 'phone';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fieldGroup: {
    marginBottom: '16px'
  }
}));

async function createCustomer(newCustomer: Customer): Promise<Customer> {
  const response = await fetch('http://localhost:4300/customers', {
    method: 'POST',
    body: JSON.stringify(newCustomer)
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

  const handleSubmit = useCallback((event) => {
    createCustomer(form)
      .then((customer) => {
        history.push(`/customer/${customer.id}`)
      })

    event.preventDefault();
  }, []);

  const handleChange = useCallback((field: FormFields) => (event: any) => {
    console.log('test > ', field, event)
    setForm({...form, [field]: event.target.value});
  }, [setForm])

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Add Customer</Button>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
      >
        <div className={classes.paper}>
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
        </div>
      </Modal>
    </Fragment>
  )
}
