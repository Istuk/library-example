import * as React from 'react';
import AppNavigation from 'components/AppNavigation';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardView from 'views/DashboardView';
import BooksView from 'views/BooksView';
import BookDetailsView from 'views/BookDetailsView';
import CustomersView from 'views/CustomersView';
import CustomerDetailsView from 'views/CustomerDetailsView';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  marginTop: {
    marginTop: '80px'
  }
})

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <BrowserRouter>
        <div className={classes.marginTop}>
          <AppNavigation />
        </div>
        <Switch>
          <Route path="/" exact ><DashboardView /></Route>
          <Route path="/books" exact ><BooksView /></Route>
          <Route path="/book/:id" exact ><BookDetailsView /></Route>
          <Route path="/customers" exact ><CustomersView /></Route>
          <Route path="/customer/:id" exact ><CustomerDetailsView /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
