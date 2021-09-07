import React, { useEffect } from 'react';
import { Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { loadBookDetails, selectBookDetails } from './bookDetailsSlice';
import { loadCustomers, selectCustomersIndex } from 'features/customers/customersIndexSlice';
import { makeStyles } from '@material-ui/styles';
import { loadCountries, selectCountries } from 'features/countries/countriesSlice';
import { serializeBorrowsForBook } from 'helpers/serializers';
import { BorrowBook } from '../../components/BorrowBook';
import EditBook from 'features/books/EditBook';

const useStyles = makeStyles({
  root: {
    padding: '24px',
    backgroundColor: '#e4e4e4'
  },
  widgets: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  widget: {
    padding: '24px',
    margin: '24px',
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
});

function normalizeYear(year: number): string {
  if (year < 0) return `BC ${Math.abs(year)}`;

  return `${year}`
}

export default function BookDetails({id}: {id: number}) {
  const {
    details,
    loading
  } = useAppSelector(selectBookDetails);
  const {
    customers,
    loading: customersLoading
  } = useAppSelector(selectCustomersIndex);
  const {
    countries,
    loaded: countriesLoaded,
    loading: countriesLoading
  } = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(loadBookDetails(id));
    dispatch(loadCustomers());
    if (!countriesLoaded) dispatch(loadCountries());
  }, [dispatch, id, countriesLoaded]);

  if (loading || customersLoading || countriesLoading || !details || !countries) return <span>Loading...</span>

  const handleReturn = (id: number) => () => {
    fetch(`http://localhost:4300/borrows/${id}`, {
      method: 'DELETE'
    })
      .then(() => dispatch(loadBookDetails(details.id as number)));
  }

  const availableCopies = details.quantity - details.borrows.length;
  
  return (
    <Card className={classes.root}>
      <Typography variant="h3">
        {details.title}
      </Typography>
      <Typography variant="h5">
        by {details.author} ({normalizeYear(details.year)})
      </Typography>
      <div className={classes.widgets}>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Country of origin
          </Typography>
          <Typography>
            {countries.find((c) => c.id === details.countryId)?.name}
          </Typography>
        </Card>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Number of pages
          </Typography>
          <Typography>
            {details.pages}
          </Typography>
        </Card>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Availability
          </Typography>
          <Typography>
            <strong>{availableCopies}</strong> out of <strong>{details.quantity}</strong> are available
          </Typography>
        </Card>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Actions
          </Typography>
          <BorrowBook book={details} customers={customers} />
          <EditBook book={details} />
        </Card>
      </div>
      <Typography variant="h4">
        Borrowed Copies
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Until Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serializeBorrowsForBook(details.borrows, customers).map((info) => (
              <TableRow key={`borrow-${info.id}`}>
                <TableCell component="th" scope="row">
                  {info.customer?.firstname}
                </TableCell>
                <TableCell align="right">{info.customer?.lastname}</TableCell>
                <TableCell align="right">{info.customer?.phone}</TableCell>
                <TableCell align="right">{info.untilDate?.toDateString()}</TableCell>
                <TableCell align="right">
                  <Button onClick={handleReturn(info.id as number)}>Return</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
