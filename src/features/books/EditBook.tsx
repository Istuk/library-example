import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppModal from 'components/AppModal';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { loadBookDetails } from 'features/bookDetails/bookDetailsSlice';
import { loadCountries, selectCountries } from 'features/countries/countriesSlice';
import BooksService from 'services/BooksService';

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
  }, [setIsOpen]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = (event: any) => {
    editBook(form)
      .then(() => {
        dispatch(loadBookDetails(props.book.id as number));
      })

    event.preventDefault();
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
            <TextField label="Title" value={form.title} onChange={handleChange('title')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Author" value={form.author} onChange={handleChange('author')} />
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
                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.fieldGroup}>
            <TextField label="Language" value={form.language} onChange={handleChange('language')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField type="number" label="Pages" value={form.pages} onChange={handleChange('pages')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField type="number" label="Year" value={form.year} onChange={handleChange('year')} />
          </div>
          <div className={classes.fieldGroup}>
            <TextField type="number" label="Quantity" value={form.quantity} onChange={handleChange('quantity')} />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
