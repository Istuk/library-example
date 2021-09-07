import { Button, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import AppModal from 'components/AppModal';
import CustomersService from 'services/CustomersService';
import { noEmptyFields } from 'helpers/validation';

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
  const service = new CustomersService();

  return await service.createCustomer(newCustomer);
}

export default function AddCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialFormValues);
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory();
  const classes = useStyles();

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
    setSubmitted(false);
  }, [setIsOpen]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitted(true)

    if (!noEmptyFields(form)) return;

    createCustomer(form)
      .then((customer) => {
        history.push(`/customer/${customer.id}`)
      });
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
            <TextField
              label="First Name"
              onChange={handleChange('firstname')}
              error={submitted && form.firstname === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="last Name"
              onChange={handleChange('lastname')}
              error={submitted && form.lastname === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="Date of birth"
              type="date"
              onChange={handleChange('birthdate')}
              defaultValue="1990-01-01"
              error={submitted && form.birthdate === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="Phone Number"
              onChange={handleChange('phone')}
              error={submitted && form.phone === ''}
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
