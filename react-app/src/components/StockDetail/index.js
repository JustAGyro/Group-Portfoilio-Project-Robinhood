import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StockDetail.css';

export default function ShowStockDetail() {
  const { symbol } = useParams();
  const [stockQuote, setStockQuote] = useState({});
  const [stockInfo, setStockInfo] = useState({});
  const [stockNews, setStockNews] = useState([]);

  const fetchQuote = (symbol) => {
    if (symbol) {
      fetch(`/api/stocks/company_quote/${symbol}`)
        .then((response) => response.json())
        .then((data) => setStockQuote(data));
    } else {
      setStockQuote({});
    }
    console.log(stockQuote);
  };

  const fetchInfo = (symbol) => {
    if (symbol) {
      fetch(`/api/stocks/company_info/${symbol}`)
        .then((response) => response.json())
        .then((data) => setStockInfo(data));
    } else {
      setStockInfo({});
    }
    console.log(stockInfo);
  };

  const fetchNews = (symbol) => {
    if (symbol) {
      fetch(`/api/stocks/stock_news/${symbol}`)
        .then((response) => response.json())
        .then((data) => setStockNews(data));
    }
  };

  useEffect(() => {
    fetchQuote(symbol);
  }, [symbol]);

  useEffect(() => {
    fetchInfo(symbol);
  }, [symbol]);

  useEffect(() => {
    fetchNews(symbol);
  }, [symbol]);

  console.log(stockQuote);
  console.log(stockInfo);
  console.log(stockNews);

  return (
    <>
      <div class="container">
        <div class="l-gutter">
          <p>left gutter</p>
        </div>
        <div class="details">
          <div class="details-name-price">
            <h1>{symbol}</h1>
          </div>
          <div class="details-graph">
            <p>graph!</p>
          </div>
          <div class="details-about">
            <div class="about-title">
              <h2>About</h2>
            </div>
            <div class="about-description">
              <p>{stockInfo.description}</p>
            </div>
          </div>
          <div class="details-info">
            <div className="info-card">
              <div className="info-item">CEO</div>
              <div className="info-item">{stockInfo.ceo}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Employees</div>
              <div className="info-item">{stockInfo.employees}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Headquarters</div>
              <div className="info-item">{stockInfo.headquaters}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Founded</div>
              <div className="info-item">{stockInfo.foundedDate}</div>
            </div>
          </div>
          <div class="details-keystats-name">
            <h2>Key Statistics</h2>
          </div>
          <div class="details-keystats">
            <div className="info-card">
              <div className="info-item">Market Cap</div>
              <div className="info-item">{stockQuote.marketCap}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Price-Earnings Ratio</div>
              <div className="info-item">{stockQuote.peRatio}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Average Volume</div>
              <div className="info-item">{stockQuote.avgVolume}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Volume</div>
              <div className="info-item">{stockQuote.volume}</div>
            </div>
            <div className="info-card">
              <div className="info-item">High Today</div>
              <div className="info-item">{stockQuote.highToday}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Low Today</div>
              <div className="info-item">{stockQuote.lowToday}</div>
            </div>
            <div className="info-card">
              <div className="info-item">52 Week High</div>
              <div className="info-item">{stockQuote.yearHigh}</div>
            </div>
            <div className="info-card">
              <div className="info-item">52 Week Low</div>
              <div className="info-item">{stockQuote.yearLow}</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-item">Open Price</div>
            <div className="info-item">{stockQuote.openPrice}</div>
          </div>
          <div class="details-news">
            <h2>News</h2>
          </div>
        </div>
        <div class="actions">
          <div class="action-buttons">
            <p>buttons</p>
          </div>
          <div class="action-deadspace">
            <p>deadspace</p>
          </div>
        </div>
        <div class="r-gutter">
          <p>right gutter</p>
        </div>
      </div>
    </>
  );
}
