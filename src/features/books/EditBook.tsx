import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppModal from 'components/AppModal';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { loadBookDetails } from 'features/bookDetails/bookDetailsSlice';
import { loadCountries, selectCountries } from 'features/countries/countriesSlice';
import BooksService from 'services/BooksService';
import { noEmptyFields } from 'helpers/validation';

const useStyles = makeStyles(() => ({
  fieldGroup: {
    marginBottom: '16px'
  },
  inputField: {
    width: '180px'
  }
}));

async function editBook(book: Book): Promise<Book> {
  const service = new BooksService();

  if (!book.id) throw new Error('book must contain id to update');

  return await service.updateBook(book.id, {
    title: book.title,
    author: book.author,
    countryId: book.countryId,
    language: book.language,
    pages: book.pages,
    year: book.year,
    quantity: book.quantity
  });
}

export default function EditBook(props: {book: Book}) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(props.book);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const {
    countries,
    loaded: countriesLoaded
  } = useAppSelector(selectCountries);

  useEffect(() => {
    if (!countriesLoaded) dispatch(loadCountries());
  }, [dispatch, countriesLoaded]);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
    setSubmitted(false);
  }, [setIsOpen]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitted(true);

    if (!noEmptyFields(form)) return;

    editBook(form)
      .then(() => {
        dispatch(loadBookDetails(props.book.id as number));
      });
  }

  const handleChange = (field: BookFormFields) => (event: any) => {
    setForm({...form, [field]: event.target.value});
  }

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Edit</Button>
      <AppModal
        title={`Edit Book - ${props.book.title}`}
        open={isOpen}
        onClose={handleCloseModal}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.fieldGroup}>
            <TextField
              label="Title"
              onChange={handleChange('title')}
              value={form.title}
              error={submitted && form.title === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="Author"
              onChange={handleChange('author')}
              value={form.author}
              error={submitted && form.author === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <FormControl>
              <InputLabel id="select-country-label">Country</InputLabel>
              <Select
                labelId="select-country-label"
                value={form.countryId}
                onChange={handleChange('countryId')}
                className={classes.inputField}
                error={submitted && form.countryId === 0}
              >
                <MenuItem value={0}>-</MenuItem>
                {countries && countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              label="Language"
              onChange={handleChange('language')}
              value={form.language}
              error={submitted && form.language === ''}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              type="number"
              label="Pages"
              onChange={handleChange('pages')}
              value={form.pages}
              error={submitted && form.pages === 0}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              type="number"
              label="Year"
              onChange={handleChange('year')}
              value={form.year}
              error={submitted && form.year === 0}
            />
          </div>
          <div className={classes.fieldGroup}>
            <TextField
              type="number"
              label="Quantity"
              onChange={handleChange('quantity')}
              value={form.quantity}
              error={submitted && form.quantity === 0}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
