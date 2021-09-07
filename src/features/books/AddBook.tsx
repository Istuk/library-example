import { Button, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import AppModal from 'components/AppModal';
import { loadCountries, selectCountries } from 'features/countries/countriesSlice';
import { loadCustomers } from 'features/customers/customersIndexSlice';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const initialFormValues = {
  title: '',
  author: '',
  countryId: -1,
  language: '',
  pages: 0,
  year: 2020,
  quantity: 0
}

type FormFields = 'title' | 'author' | 'countryId' | 'language' | 'pages' | 'year' | 'quantity';

const useStyles = makeStyles(() => ({
  fieldGroup: {
    marginBottom: '16px'
  },
  inputField: {
    width: '300px'
  }
}));

async function createBook(newBook: Book): Promise<Book> {
  const response = await fetch('http://localhost:4300/books', {
    method: 'POST',
    body: JSON.stringify(newBook),
    headers:  { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default function AddBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialFormValues);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    countries
  } = useAppSelector(selectCountries);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    createBook(form)
      .then((book) => {
        history.push(`/book/${book.id}`)
      })

    event.preventDefault();
  }

  const handleChange = (field: FormFields) => (event: any) => {
    setForm({...form, [field]: event.target.value});
  }

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Add Book</Button>
      <AppModal
        title="Create Customer"
        open={isOpen}
        onClose={handleCloseModal}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.fieldGroup}>
            <TextField label="Title" onChange={handleChange('title')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Author" onChange={handleChange('author')} />
          </div>
          <div className={classes.fieldGroup}>
          <Select
              labelId="select-customer-label"
              value={form.countryId}
              onChange={handleChange('countryId')}
              className={classes.inputField}
            >
              <MenuItem value={-1}>-</MenuItem>
              {countries && countries.map((country) => (
                <MenuItem value={country.id}>{country.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Language" onChange={handleChange('language')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField type="number" label="Pages" onChange={handleChange('pages')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField type="number" label="Year" onChange={handleChange('year')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField type="number" label="Quantity" onChange={handleChange('quantity')} />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
