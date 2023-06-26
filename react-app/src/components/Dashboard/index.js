import React from 'react';
import './Dashboard.css';

export default function ShowDashboard() {
  return (
    <>
      <div class="container">
        <div class="navbar"></div>
        <div class="content">
          <div class="stock-watchlist">
            <h1>this is the watchlist</h1>
          </div>
          <div class="right-gutter"></div>
          <div class="left-gutter"></div>
          <div class="dashboard">
            <h1>this is the dashboard. .</h1>
          </div>
        </div>
      </div>
    </>
  );
}
