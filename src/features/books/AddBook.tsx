import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import AppModal from 'components/AppModal';
import { loadCountries, selectCountries } from 'features/countries/countriesSlice';
import { noEmptyFields } from 'helpers/validation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BooksService from 'services/BooksService';
import { loadBooks, selectBooksIndex } from './booksIndexSlice';

const initialFormValues = {
  title: '',
  author: '',
  countryId: 0,
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

function isTitleUnique(title: string, books: Book[]) {
  let unique = true;

  books.forEach((book) => {
    if (book.title === title) unique = false
  });

  return unique;
}

export default function AddBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialFormValues);
  const [submitted, setSubmitted] = useState(false);
  const [titleExists, setTitleExists] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    countries
  } = useAppSelector(selectCountries);
  const {
    books
  } = useAppSelector(selectBooksIndex);

  useEffect(() => {
    dispatch(loadCountries());
    dispatch(loadBooks());
  }, [dispatch]);

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

    if (!noEmptyFields(form)) return
    if (!isTitleUnique(form.title, books)) return

    createBook(form)
      .then((book) => {
        history.push(`/book/${book.id}`)
      });
  }

  const handleChange = (field: BookFormFields) => (event: any) => {
    if (field === 'title' && !isTitleUnique(event.target.value, books))  {
      setTitleExists(true);
    }
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
            <TextField
              label="Title"
              onChange={handleChange('title')}
              value={form.title}
              error={(submitted && form.title === '') || titleExists}
            />
            {titleExists && <Typography color="error">
              This title already exists
            </Typography>}
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
          <Button type="submit">Create</Button>
        </form>
      </AppModal>
    </Fragment>
  )
}
