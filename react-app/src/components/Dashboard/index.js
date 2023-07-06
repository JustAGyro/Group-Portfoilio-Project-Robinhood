import React from 'react';
import './Dashboard.css';
import Movers from '../Movers'
import { NewsBox } from '../News';
import Portfolio from '../Portfolio';
export default function ShowDashboard() {
  return (
    <>
      <div class="dash-container">
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
          <div class="dash-portfolio">
            <div> This is the portfolio
              <Portfolio />
            </div>
          </div>
          <div class="dash-movers">
            <div>
              these are the movers
            <div>
              <Movers/>
            </div>
            </div>
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
    </>
  );
}
