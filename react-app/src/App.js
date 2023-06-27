import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import NewNotes from './components/NewNotes';
import EditNotes from './components/EditNotes';
import ListNotes from './components/ListNotes';
import Dashboard from './components/Dashboard';
import LoginFormPage from './components/LoginFormPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import { getAllNotes } from './store/notes';
import { getAllWatchlistsThunk } from './store/watchlist';
import { getAccountInfo } from './store/account';
import Account from './components/Account';
import { getAllTransactionsThunk } from './store/transactions';
import Transactions, { NewTransaction } from './components/Transactions';
import StockApi from './components/StockAPI';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAccountInfo());
    dispatch(getAllNotes());
    dispatch(getAllTransactionsThunk());
    dispatch(getAllWatchlistsThunk());
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/stockapi">
            <StockApi />
          </Route>
          <Route exact path="/transactions">
            <Transactions/>
          </Route>
          <Route path="/transactions/new">
            <NewTransaction />
          </Route>
          <Route path="/account">
            <Account/>
          </Route>
          <Route exact path="/notes">
            <ListNotes />
          </Route>
          <Route path="/notes/new">
            <NewNotes />
          </Route>
          <Route path="/notes/:id/edit">
            <EditNotes />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
