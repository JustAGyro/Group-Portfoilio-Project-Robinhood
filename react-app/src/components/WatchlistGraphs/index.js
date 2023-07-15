import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetHistoricalHour } from '../../store/stocks';
// import Graph from "./GraphWatchlist"
import GraphWatchlist from './GraphWatchlist';
import './watchlistgraph.css';

export default function WatchlistGraph(props) {
  const dispatch = useDispatch();
  const [stockHour, setStockHour] = useState([]);
  const [lastPrice, setLastPrice] = useState(''); // most recent price
  const [prevPrice, setPrevPrice] = useState(0);
  const [valueDown, setValueDown] = useState(false);
  // const [difference, setDifference] = useState('')

  function calculatePercentDifference(lastPrice, prevPrice) {
    let difference = lastPrice - prevPrice;

    let percentDifference = (difference / lastPrice) * 100;

    return percentDifference;
  }
  useEffect(() => {
    const parseHistorical = async () => {
      const historicalHour = await dispatch(GetHistoricalHour(props.symbol));

      setStockHour(historicalHour);
      setLastPrice(historicalHour[23].value);
      setPrevPrice(historicalHour[16].value);
      if (historicalHour[23].value < historicalHour[16].value) {
        setValueDown(true);
      }
      return historicalHour;
    };

    parseHistorical();
    calculatePercentDifference();
  }, []);

  const percentDifference = calculatePercentDifference(lastPrice, prevPrice);
  let color = 'green';
  if (percentDifference < 0) {
    color = 'red';
  }
  return (
    <>
      <div id="watc-lst-gra-container" style={{ display: 'flex' }}>
        <div>
          <GraphWatchlist {...props} data={stockHour} lineColor={color} />
        </div>
        <div className="watc-lst-gra-container-footer">
          <p id="watc-lst-gra-container-footer-top">
            ${Number(lastPrice).toFixed(2)}
          </p>
          {isNaN(percentDifference) ? null : (
            <p id="watc-lst-gra-container-footer-down" style={{ color: color }}>
              {percentDifference.toFixed(3)}%
            </p>
          )}
        </div>
      </div>
    </>
  );
}
