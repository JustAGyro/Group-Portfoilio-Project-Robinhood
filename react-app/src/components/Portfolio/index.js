import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionsThunk } from '../../store/transactions';
import { getStock } from '../../store/stocks';
import Graph from '../Graph';
import reactRouterDom from 'react-router-dom';
import DetailGraph from '../DetailsGraph';
export default function Portfolio() {
  const [portfolioValues, setPortfoliValues] = useState([]);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const stocks = useSelector((state) => state.stocks);
  const filteredTrans = Object.values(transactions).map((transaction) => {
    let newDate = new Date(transaction.date);
    return {
      type: transaction.transaction,
      date: newDate.toJSON().slice(0, newDate.toJSON().indexOf('T')),
      symbol: transaction.symbol,
      quantity: transaction.quantity,
    };
  });
  useEffect(() => {
    dispatch(getAllTransactionsThunk());
  }, []);
  useEffect(() => {
    let trans = Object.values(transactions);
    let dailyData = groupBy(trans, ['symbol']);
    Object.keys(dailyData).forEach((ele) => {
      dispatch(getStock(ele));
    });
  }, [transactions]);
  let fillDates = (data) => {
    let newData = {};
    let currentDate = new Date();
    let nextDate = new Date(currentDate.valueOf() + 86400000);
    Object.keys(data).forEach((e) => {
      newData[e] = {};
      let dataByDate = groupBy(data[e], ['time']);
      let sortedData = data[e]
        .sort(function (a, b) {
          return new Date(b.time) - new Date(a.time);
        })
        .reverse();
      let successVal = sortedData[0].value;
      for (
        let date = new Date(sortedData[0].time);
        date.valueOf() < nextDate.valueOf();
        date.setDate(date.getDate() + 1)
      ) {
        let target = date.toJSON().slice(0, date.toJSON().indexOf('T'));
        newData[e][target] = dataByDate[target] || [
          { time: target, value: successVal },
        ];
        successVal = newData[e][target][0].value;
      }
    });
    return newData;
  };
  const parseDates = (trans) => {
    const orgTrans = groupBy(trans, ['date', 'symbol']);
    const startDate = trans[0]?.date;
    const currentDate = new Date();
    const returnData = {};
    for (
      let date = new Date(startDate);
      date <= currentDate;
      date.setDate(date.getDate() + 1)
    ) {
      let target = date.toJSON().slice(0, date.toJSON().indexOf('T'));
      let prevTarget = new Date(date.valueOf() - 86400000)
        .toJSON()
        .slice(0, date.toJSON().indexOf('T'));
      let nextTarget = new Date(date.valueOf() + 86400000)
        .toJSON()
        .slice(0, date.toJSON().indexOf('T'));
      let dailySymbols = orgTrans[target]
        ? Object.keys(orgTrans[target])
        : null;
      if (!returnData[target]) {
        returnData[target] = {};
      }
      if (!dailySymbols) {
        returnData[target] = { ...returnData[prevTarget] };
        if (new Date(nextTarget) < currentDate) {
          returnData[nextTarget] = { ...returnData[target] };
        }
      } else {
        dailySymbols.forEach((e) => {
          orgTrans[target][e].forEach((ele) => {
            if (!returnData[target][e]) returnData[target][e] = 0;
            ele.type == 'buy'
              ? (returnData[target][e] = returnData[target][e] + ele.quantity)
              : (returnData[target][e] = returnData[target][e] - ele.quantity);
          });
        });
        if (new Date(nextTarget) < new Date(target))
          returnData[nextTarget] = { ...returnData[target] };
      }
      if (
        nextTarget == currentDate.toJSON().slice(0, date.toJSON().indexOf('T'))
      ) {
        let nextDailySymbols = orgTrans[nextTarget]
          ? Object.keys(orgTrans[nextTarget])
          : [];
        returnData[nextTarget] = { ...returnData[target] };
        nextDailySymbols.forEach((e) => {
          let it = orgTrans[target];
          orgTrans[nextTarget][e].forEach((ele) => {
            if (!returnData[nextTarget][e]) returnData[nextTarget][e] = 0;
            ele.type == 'buy'
              ? (returnData[nextTarget][e] =
                  returnData[nextTarget][e] + ele.quantity)
              : (returnData[nextTarget][e] =
                  returnData[nextTarget][e] - ele.quantity);
          });
        });
      }
    }
    return returnData;
  };
  const parseValues = (dates, stocks) => {
    const stockData = fillDates(stocks);
    let returnObject = {};
    let data = dates;
    let dataEntries = Object.entries(data);
    dataEntries.forEach((e) => {
      console.log('WHAT THE FUCK IS E: ', e);
      let dailyTotal = 0;
      let key = e[0];
      console.log('WHAT THE FUCK IS KEY: ', key);
      let value = e[1];
      console.log('WHAT THE FUCK IS VALUE: ', value);
      let symbols = Object.keys(value);
      console.log('WHAT THE FUCK IS SYMBOLS: ', symbols);
      symbols.forEach((sym) => {
        let total = 0;
        if (stockData[sym][key]) {
          total = value[sym] * stockData[sym][key][0].value;
        }
        dailyTotal += total;
        return total;
      });
      returnObject[key] = dailyTotal;
    });
    return returnObject;
  };
  const checkStore = (data) => {
    return Object.keys(data).reduce((acc, curr) => {
      Object.keys(stocks).includes(curr) && acc ? (acc = true) : (acc = false);
      return acc;
    }, true);
  };
  let graphData = () => {
    return Object.entries(parseValues(parseDates(filteredTrans), stocks)).map(
      (ele) => {
        const obj = { time: ele[0], value: ele[1] };
        return obj;
      }
    );
  };
  useEffect(() => {
    if (checkStore(groupBy(Object.values(transactions), ['symbol']))) {
      setPortfoliValues(graphData());
    }
  }, [stocks]);
  return (
    <div>
      <DetailGraph data={portfolioValues} />
    </div>
  );
}
export function groupBy(arr, groups) {
  let grouped = {};
  // a is the object getting grouped from the array (arr)
  arr.forEach((a) => {
    // o is the object used to hold objects in each group each loop,
    // g is group category by,
    // i is the index
    groups
      .reduce((o, g, i) => {
        // take existing object,
        o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
        return o[a[g]]; // at last, then an array
      }, grouped)
      .push(a);
  });
  return grouped;
}
