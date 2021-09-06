import React, { useCallback } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '320px',
    margin: '16px'
  }
})

export default function CustomerPreview(props: {customer: Customer}) {
  const {customer} = props;
  const history = useHistory();

  const classes = useStyles();

  const handleDetails = useCallback(() => {
    history.push(`/customer/${customer.id}`);
  }, [history, customer])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {customer.firstname} {customer.lastname}
        </Typography>
        <Typography variant="body2" component="p">
          phone: {customer.phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDetails}>Details</Button>
      </CardActions>
    </Card>
  )
}
