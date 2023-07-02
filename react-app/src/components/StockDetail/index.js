import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StockDetail.css';
import DetailGraph from '../DetailsGraph';

export default function ShowStockDetail() {
  const { symbol } = useParams();
  const [stockQuote, setStockQuote] = useState({});
  const [stockInfo, setStockInfo] = useState({});
  const [stockNews, setStockNews] = useState([]);

  const [initialData, setInitialData] = useState([
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
    { time: '2019-01-01', value: 22.0 },
    { time: '2019-01-02', value: 23.0 },
    { time: '2019-01-03', value: 24.0 },
    { time: '2019-01-04', value: 26.0 },
    { time: '2019-01-05', value: 23.0 },
    { time: '2019-01-06', value: 21.0 },
    { time: '2019-01-07', value: 29.0 },
    { time: '2019-01-08', value: 28.0 },
    { time: '2019-01-09', value: 24.0 },
    { time: '2019-01-10', value: 25.0 },
  ]);

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
            <p>price $</p>
          </div>
          <div class="details-graph">
            <DetailGraph data={initialData} />
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
          {stockNews.map((article, index) => (
            <a className="sd-link" href={article.url}>
              <div className="news-card" key={index}>
                <div className="article-text">
                  <h4>
                    {article.site} - {article.publishedDate}
                  </h4>
                  <h2>{article.title}</h2>
                  <p>{article.text}</p>
                </div>
                <div className="article-img">
                  <img
                    className="article-img-thumbnail"
                    src={article.image}
                  ></img>
                </div>
              </div>
            </a>
          ))}
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
