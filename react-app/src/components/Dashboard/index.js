import React from 'react';
import './Dashboard.css';
import Movers from '../Movers';
import { NewsBox } from '../News';
import Portfolio from '../Portfolio';
import WatchLists from '../WatchLists';
import Transactions, { NewTransaction } from '../Transactions';
import ListNotes from '../ListNotes';
import { getAccountInfo } from '../../store/account';
import { getAllNotes } from '../../store/notes';
import { getAllTransactionsThunk } from '../../store/transactions';
import { getAllWatchlistsThunk } from '../../store/watchlist';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function ShowDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountInfo());
    dispatch(getAllNotes());
    dispatch(getAllTransactionsThunk());
    dispatch(getAllWatchlistsThunk());
  }, [dispatch]);

  return (
    <div class="dash-container">
      <div class="left-gutter"></div>
      <div class="dashboard">
        <h1 classname="dashboard-h1">Dashboard</h1>
        <div class="dash-portfolio">
          <Portfolio />
        </div>
        <div class="dash-movers">
          <Movers />
        </div>
        <div className="dash-notes-div">
          <h3>My notes</h3>
          <div class="note-list">
            <ListNotes />
          </div>
        </div>
        <div class="dash-news">
          <h3>News</h3>
          <div className="dash-news">
            <div>
              <NewsBox />
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-bar">
        <div class="transaction-Form">
          <NewTransaction />
        </div>
        <div id="inventory">
          <Transactions />
        </div>
        <div class="stock-watchlist">
          <WatchLists />
        </div>
      </div>
      <div class="right-gutter"></div>
    </div>
  );
}
