import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StockDetail.css';
import DetailGraph from '../DetailsGraph';
import OpenModalButton from '../OpenModalButton';
import BuyModal from '../BuyModal';
import { useSelector } from 'react-redux';
import AddToListModal from '../ModalsWatchlist/AddToListModal';

export default function ShowStockDetail() {
  const { symbol } = useParams();
  const [addModal, setAddModal] = useState(false)
  const [stockQuote, setStockQuote] = useState({});
  const [stockInfo, setStockInfo] = useState({});
  const [stockNews, setStockNews] = useState([]);
  const [newData, setNewData] = useState([]);
  const [selectedGraphButton, setSelectedGraphButton] = useState('1Y');
  const [graphData, setGraphData] = useState([]);
  const [stockPrice, setStockPrice] = useState({});
  console.log(symbol, '----------------------symbol')
  let watchlists = useSelector(state => state?.watchlists)
  watchlists = Object.values(watchlists)
  console.log(watchlists)


  const fetchRealTimePrice = (symbol) => {
    if (symbol) {
      fetch(`/api/stocks/stock_price/${symbol}`)
        .then((response) => response.json())
        .then((data) => setStockPrice(data));
    }
  };

  const fetchOneMonth = (symbol) => {
    if (symbol && selectedGraphButton === '1M') {
      fetch(`/api/stocks/one_month/${symbol}`)
        .then((response) => response.json())
        .then((data) => {
          const formatData = data
            .map((record) => ({
              time: record.date,
              value: record.close,
            }))
            .reverse();
          setNewData(formatData);
        });
    }
  };

  const fetchThreeMonth = (symbol) => {
    if (symbol && selectedGraphButton === '3M') {
      fetch(`/api/stocks/three_month/${symbol}`)
        .then((response) => response.json())
        .then((data) => {
          const formatData = data
            .map((record) => ({
              time: record.date,
              value: record.close,
            }))
            .reverse();
          setNewData(formatData);
        });
    }
  };

  const fetchOneYear = (symbol) => {
    if (symbol && selectedGraphButton === '1Y') {
      fetch(`/api/stocks/one_year/${symbol}`)
        .then((response) => response.json())
        .then((data) => {
          const formatData = data
            .map((record) => ({
              time: record.date,
              value: record.close,
            }))
            .reverse();
          setNewData(formatData);
        });
    }
  };

  const fetchThreeYear = (symbol) => {
    if (symbol && selectedGraphButton === '3Y') {
      fetch(`/api/stocks/three_year/${symbol}`)
        .then((response) => response.json())
        .then((data) => {
          const formatData = data
            .map((record) => ({
              time: record.date,
              value: record.close,
            }))
            .reverse();
          setNewData(formatData);
        });
    }
  };

  const fetchFiveYear = (symbol) => {
    if (symbol && selectedGraphButton === '5Y') {
      fetch(`/api/stocks/five_year/${symbol}`)
        .then((response) => response.json())
        .then((data) => {
          const formatData = data
            .map((record) => ({
              time: record.date,
              value: record.close,
            }))
            .reverse();
          setNewData(formatData);
        });
    }
  };

  const fetchQuote = (symbol) => {
    if (symbol) {
      fetch(`/api/stocks/company_quote/${symbol}`)
        .then((response) => response.json())
        .then((data) => setStockQuote(data));
    } else {
      setStockQuote({});
    }
  };

  const fetchInfo = (symbol) => {
    if (symbol) {
      fetch(`/api/stocks/company_info/${symbol}`)
        .then((response) => response.json())
        .then((data) => setStockInfo(data));
    } else {
      setStockInfo({});
    }
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

  useEffect(() => {
    fetchRealTimePrice(symbol);
  }, [symbol]);

  useEffect(() => {
    fetchOneMonth(symbol);
    fetchThreeMonth(symbol);
    fetchOneYear(symbol);
    fetchThreeYear(symbol);
    fetchFiveYear(symbol);
  }, [symbol, selectedGraphButton]);

  useEffect(() => {
    setGraphData(newData);
  }, [newData, selectedGraphButton]);

  console.log(stockPrice);

  return (
    <>
      <div class="sd-container">
        <div class="l-gutter"></div>
        <div class="details">
          <div class="details-name-price">
            <h1>{stockQuote.name}</h1>
            <h3 className="sd-stock-price">$ {stockPrice.price}</h3>
          </div>
          <div class="details-graph">
            <DetailGraph data={graphData} />
          </div>
          <div class="sd-graph-buttons-div">
            <button
              type="button"
              className="sd-graph-button"
              onClick={(event) => {
                event.preventDefault();
                setSelectedGraphButton('1M');
              }}
            >
              1M
            </button>
            <button
              type="button"
              className="sd-graph-button"
              onClick={(event) => {
                event.preventDefault();
                setSelectedGraphButton('3M');
              }}
            >
              3M
            </button>
            <button
              type="button"
              className="sd-graph-button"
              onClick={(event) => {
                event.preventDefault();
                setSelectedGraphButton('1Y');
              }}
            >
              1Y
            </button>
            <button
              type="button"
              className="sd-graph-button"
              onClick={(event) => {
                event.preventDefault();
                setSelectedGraphButton('3Y');
              }}
            >
              3Y
            </button>
            <button
              type="button"
              className="sd-graph-button"
              onClick={(event) => {
                event.preventDefault();
                setSelectedGraphButton('5Y');
              }}
            >
              5Y
            </button>
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
              <div className="info-item-bottom">{stockInfo.ceo}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Employees</div>
              <div className="info-item-bottom">{stockInfo.employees}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Headquarters</div>
              <div className="info-item-bottom">{stockInfo.headquaters}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Founded</div>
              <div className="info-item-bottom">{stockInfo.foundedDate}</div>
            </div>
          </div>
          <div class="details-keystats-name">
            <h2>Key Statistics</h2>
          </div>
          <div class="details-keystats">
            <div className="info-card">
              <div className="info-item">Market Cap</div>
              <div className="info-item-bottom">{stockQuote.marketCap}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Price-Earnings Ratio</div>
              <div className="info-item-bottom">{stockQuote.peRatio}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Average Volume</div>
              <div className="info-item-bottom">{stockQuote.avgVolume}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Volume</div>
              <div className="info-item-bottom">{stockQuote.volume}</div>
            </div>
            <div className="info-card">
              <div className="info-item">High Today</div>
              <div className="info-item-bottom">{stockQuote.highToday}</div>
            </div>
            <div className="info-card">
              <div className="info-item">Low Today</div>
              <div className="info-item-bottom">{stockQuote.lowToday}</div>
            </div>
            <div className="info-card">
              <div className="info-item">52 Week High</div>
              <div className="info-item-bottom">{stockQuote.yearHigh}</div>
            </div>
            <div className="info-card">
              <div className="info-item">52 Week Low</div>
              <div className="info-item-bottom">{stockQuote.yearLow}</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-item">Open Price</div>
            <div className="info-item-bottom">{stockQuote.openPrice}</div>
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
            <div class="sd-action-buttons-container">
              <button className="sd-button">
                <OpenModalButton
                  buttonText={`Buy ${symbol}`}
                  modalComponent={
                    <BuyModal symbol={symbol} price={stockPrice.price} />
                  }
                />
              </button>
              <button className="sd-button">Sell {symbol}</button>
            </div>
            <div className="sd-buttons-words-below">
              Buy and Sell this stock today!
            </div>
          </div>
          <div className='stc-det-add-to-list-cont'>
            <button className='stc-det-add-to-list'onClick={() => setAddModal(true)}>Add To List</button>
            {addModal && <AddToListModal closeModal={setAddModal} symbol={symbol} />}

          </div>

          <div class="action-deadspace"></div>
        </div>
        <div class="r-gutter"></div>
      </div>
    </>
  );
}
