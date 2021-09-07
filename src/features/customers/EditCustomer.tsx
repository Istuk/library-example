import { Button, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppModal from 'components/AppModal';
import { useAppDispatch } from 'app/hooks';
import { loadCustomerDetails } from 'features/customerDetails/customerDetailsSlice';
import CustomersService from 'services/CustomersService';

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
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    editCustomer(form)
      .then(() => {
        dispatch(loadCustomerDetails(props.customer.id as number));
      })

    event.preventDefault();
  }

  const handleChange = (field: CustomerFormFields) => (event: any) => {
    setForm({...form, [field]: event.target.value});
  }

  console.log(form)

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
            <TextField label="First Name" value={form.firstname} onChange={handleChange('firstname')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="last Name" value={form.lastname} onChange={handleChange('lastname')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Date of birth" type="date" value={form.birthdate} onChange={handleChange('birthdate')} defaultValue={form.birthdate} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Phone Number" value={form.phone} onChange={handleChange('phone')} />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
