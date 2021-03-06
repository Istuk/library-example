import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { loadCustomerDetails, selectCustomerDetails } from './customerDetailsSlice';
import { makeStyles } from '@material-ui/styles';
import { serializeBorrowsForCustomers } from 'helpers/serializers';
import { loadBooks, selectBooksIndex } from 'features/books/booksIndexSlice';
import EditCustomer from 'features/customers/EditCustomer';
import CustomersService from 'services/CustomersService';
import DeleteButton from 'components/DeleteButton';
import { useHistory } from 'react-router';
import BorrowsService from 'services/BorrowsService';

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

export default function BookDetails({id}: {id: number}) {
  const {
    details,
    loading
  } = useAppSelector(selectCustomerDetails);
  const {
    books,
    loading: booksLoading
  } = useAppSelector(selectBooksIndex);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [bookId] = useState(id);

  const classes = useStyles();

  const [service] = useState(new CustomersService());

  useEffect(() => {
    dispatch(loadCustomerDetails(bookId));
    dispatch(loadBooks());
  }, [dispatch, bookId]);

  const handleDeleteSuccess = useCallback(() => {
    history.push('/customers');
  }, [history]);

  if (loading || booksLoading || !details || !details.id) return <span>Loading...</span>

  const handleReturn = (id: number) => () => {
    const service = new BorrowsService();

    service.deleteEntity(id)
      .then(() => dispatch(loadCustomerDetails(details.id as number)));
  }
  
  return (
    <Card className={classes.root}>
      <Typography variant="h3">
        {details.firstname} {details.lastname}
      </Typography>
      <div className={classes.widgets}>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Phone Number
          </Typography>
          <Typography>
            {details.phone}
          </Typography>
        </Card>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Date of Birth
          </Typography>
          <Typography>
            {new Date(details.birthdate).toDateString()}
          </Typography>
        </Card>
        <Card className={classes.widget}>
          <Typography variant="h6">
            Actions
          </Typography>
          <EditCustomer customer={details} />
          <DeleteButton
            service={service}
            id={bookId}
            onSuccess={handleDeleteSuccess}
          />
        </Card>
      </div>
      <Typography variant="h4">
        Borrowed Books
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Until Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serializeBorrowsForCustomers(details.borrows, books).map((info) => (
              <TableRow key={`borrow-${info.id}`}>
                <TableCell component="th" scope="row">
                  {info.book?.title}
                </TableCell>
                <TableCell align="right">{info.book?.author}</TableCell>
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
