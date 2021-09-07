import { Button, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppModal from 'components/AppModal';
import { useAppDispatch } from 'app/hooks';
import { loadCustomerDetails } from 'features/customerDetails/customerDetailsSlice';
import CustomersService from 'services/CustomersService';
import { noEmptyFields } from 'helpers/validation';

const useStyles = makeStyles(() => ({
  fieldGroup: {
    marginBottom: '16px'
  }
}));

async function editCustomer(customer: Customer): Promise<Customer> {
  const service = new CustomersService();

  if (!customer.id) throw new Error('customer must contain id to update');

  return await service.updateCustomer(customer.id, customer);
}

export default function EditCustomer(props: {customer: Customer}) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(props.customer);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
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

    editCustomer(form)
      .then(() => {
        dispatch(loadCustomerDetails(props.customer.id as number));
      })
  }

  const handleChange = (field: CustomerFormFields) => (event: any) => {
    setForm({...form, [field]: event.target.value});
  }

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Edit</Button>
      <AppModal
        title={`Edit Customer - ${props.customer.firstname} ${props.customer.lastname}`}
        open={isOpen}
        onClose={handleCloseModal}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.fieldGroup}>
            <TextField
              label="First Name"
              onChange={handleChange('firstname')}
              value={form.firstname}
              error={submitted && form.firstname === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="last Name"
              onChange={handleChange('lastname')}
              value={form.lastname}
              error={submitted && form.lastname === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="Date of birth"
              type="date"
              onChange={handleChange('birthdate')}
              defaultValue="1990-01-01"
              value={form.birthdate}
              error={submitted && form.birthdate === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="Phone Number"
              onChange={handleChange('phone')}
              value={form.phone}
              error={submitted && form.phone === ''}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
