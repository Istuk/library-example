import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import AppModal from 'components/AppModal';
import { loadCountries, selectCountries } from 'features/countries/countriesSlice';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BooksService from 'services/BooksService';

const initialFormValues = {
  title: '',
  author: '',
  countryId: -1,
  language: '',
  pages: 0,
  year: 2020,
  quantity: 0
}

const useStyles = makeStyles(() => ({
  fieldGroup: {
    marginBottom: '16px'
  },
  inputField: {
    width: '180px'
  }
}));

async function createBook(newBook: Book): Promise<Book> {
  const service = new BooksService();
  
  return await service.createBook(newBook);
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

  const handleChange = (field: BookFormFields) => (event: any) => {
    setForm({...form, [field]: event.target.value});
  }

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Add Book</Button>
      <AppModal
        title="Create Book"
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
            <FormControl>
              <InputLabel id="select-country-label">Country</InputLabel>
              <Select
                labelId="select-country-label"
                value={form.countryId}
                onChange={handleChange('countryId')}
                className={classes.inputField}
              >
                <MenuItem value={-1}>-</MenuItem>
                {countries && countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
