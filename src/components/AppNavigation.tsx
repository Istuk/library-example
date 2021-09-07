import React, {useCallback} from 'react';
import { AppBar, Button, InputBase, Toolbar, Typography } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export default function AppNavigation() {
  const classes = useStyles();
  const history = useHistory();

  const handleDashboardClick = useCallback(() => history.push('/'), [history])
  const handleBooksClick = useCallback(() => history.push('/books'), [history])
  const handleCustomersClick = useCallback(() => history.push('/customers'), [history])

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Typography variant="h6">
          Library Admin
        </Typography>
        <div className={classes.grow} />
        <Button color="inherit" onClick={handleBooksClick}>Books</Button>
        <Button color="inherit" onClick={handleCustomersClick}>Customers</Button>
      </Toolbar>
    </AppBar>
  )
}
