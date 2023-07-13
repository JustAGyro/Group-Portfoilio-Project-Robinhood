import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGainers } from '../../store/stocks';
import './Movers.css';

export default function Movers() {
  const dispatch = useDispatch();
  const [movers, setMovers] = useState([]);

  useEffect(() => {
    const parseMovers = async () => {
      const movers = await dispatch(getGainers());
      setMovers(movers);
    };
    parseMovers();
  }, []);

  return (
    <div>
      <h3>Daily Movers</h3>
      <div className="movers-div-for-cards">
        {movers.slice(0, 5).map((ele) => (
          <div class="movers-card">
            <div class="movers-info">{ele.symbol}</div>
            <div class="movers-info-change">$ {ele.change}</div>
            <div class="movers-info-change">
              % {ele.changesPercentage.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
