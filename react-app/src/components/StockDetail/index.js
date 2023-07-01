import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StockDetail.css';

export default function ShowStockDetail() {
  const { symbol } = useParams();
  const [stockQuote, setStockQuote] = useState({});
  const [stockInfo, setStockInfo] = useState({});

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

  useEffect(() => {
    fetchQuote(symbol);
  }, [symbol]);

  useEffect(() => {
    fetchInfo(symbol);
  }, [symbol]);

  console.log(stockQuote);
  console.log(stockInfo);

  return (
    <>
      <div class="container">
        <div class="actions">
          <div class="action-buttons">
            <p>buttons</p>
          </div>
          <div class="action-deadspace">
            <p>deadspace</p>
          </div>
        </div>
        <div class="details">
          <div class="details-name-price">
            <p>stock name and price</p>
          </div>
          <div class="details-graph">
            <p>graph!</p>
          </div>
          <div class="details-about">
            <div class="about-title">
              <p>about title</p>
            </div>
            <div class="about-description">
              <p>description</p>
            </div>
          </div>
          <div class="details-info">
            <p>stock info</p>
          </div>
          <div class="details-keystats-name">
            <p>Key Stats - Name</p>
          </div>
          <div class="details-keystats">
            <p>key stats</p>
          </div>
          <div class="details-news">
            <p>news</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
            <p>article x</p>
          </div>
        </div>
        <div class="r-gutter">
          <p>right gutter</p>
        </div>
        <div class="l-gutter">
          <p>left gutter</p>
        </div>
      </div>
    </>
  );
}
