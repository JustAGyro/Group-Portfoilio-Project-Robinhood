import React from 'react';
import './Dashboard.css';
import Movers from '../Movers'
import { NewsBox } from '../News';
import Portfolio from '../Portfolio';
import WatchLists from '../WatchLists';
import { NewTransaction } from '../Transactions';
import ListNotes from '../ListNotes';
export default function ShowDashboard() {
  return (
      <div class="dash-container">
        <div class="navbar"></div>
        <div class="content">
          <div class='fixed-bar'>
            <div class="transaction-Form">
              <NewTransaction />
            </div>
            <div class="stock-watchlist">
              <WatchLists />
            </div>
            <div class="note-list">
              <ListNotes />
            </div>
          </div>

          <div class="right-gutter"></div>
          <div class="left-gutter"></div>
          <div class="dashboard">
            <h1>Dashboard</h1>
            <div class="dash-portfolio">
              <Portfolio />
            </div>


            <div class="dash-movers">
                <Movers/>
            </div>
            <div class="dash-news">
              <div className="dash-news">
                This is the news
                <div >
                  <NewsBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
