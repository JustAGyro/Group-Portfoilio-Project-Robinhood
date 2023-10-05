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
import SearchBar from './components/SearchBar';
import StockDetail from './components/StockDetail';
import WatchLists from './components/WatchLists';
import WatchlistGraph from './components/WatchlistGraphs';
import Homepage from './components/Homepage';
import Aboutpage from './components/AboutPage';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

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
      <div id="full-page">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              {sessionUser ? <Dashboard /> : <Homepage />}
            </Route>
            <Route exact path="/stocks/:symbol">
              <StockDetail />
            </Route>
            <Route exact path="/stockapi">
              <StockApi />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route path="/transactions/new">
              <NewTransaction />
            </Route>
            <Route path="/account">
              <Account />
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
            <Route path="/search">
              <SearchBar />
            </Route>
            <Route path="/watchlists">
              <WatchLists />
            </Route>
            <Route exact path="/justatest">
              <WatchlistGraph />
            </Route>
            <Route exact path="/about">
              <Aboutpage />
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;
