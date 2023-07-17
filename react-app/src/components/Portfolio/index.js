import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionsThunk } from '../../store/transactions';
import { getStock } from '../../store/stocks';
import Graph from '../Graph';
import reactRouterDom from 'react-router-dom';
import DetailGraph from '../DetailsGraph';

export default function Portfolio() {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);
  const stocks = useSelector((state) => state.stocks);
  const filteredTrans = Object.values(transactions).map(transaction => {
    let newDate = new Date(transaction.date)

    return {
      type:transaction.transaction,
      date: newDate.toJSON().slice(0, newDate.toJSON().indexOf('T')),
      symbol:transaction.symbol,
      quantity:transaction.quantity
    }
  })
  useEffect(() => {
    dispatch(getAllTransactionsThunk());

  }, [])
  useEffect(() => {
    let trans = Object.values(transactions);
    let dailyData = groupBy(trans, ['symbol']);
    Object.keys(dailyData).forEach((ele) => {
      dispatch(getStock(ele));
    });
  }, [transactions])

  let fillDates = (data) => {
    let newData = {}
    let currentDate = new Date()
    Object.keys(data).forEach(e => {
      newData[e] = {}
      let dataByDate = groupBy(data[e],['time'])
      let sortedData = data[e].sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
      })
      .reverse();
      let successVal = sortedData[0].value;
      for(
        let date = new Date(sortedData[0].time);
        date.valueOf() < currentDate.valueOf();
        date.setDate(date.getDate() + 1)
      ){
        let target = date.toJSON().slice(0, date.toJSON().indexOf('T'))
        newData[e][target] = dataByDate[target] || [{time:target, value:successVal}]
        successVal = newData[e][target][0].value;
      }
    })
    return newData
  }


  const parseDates = (trans) => {
    const orgTrans = groupBy(trans, ['date','symbol'])
    const startDate = trans[0]?.date;
    const currentDate = new Date();
    const returnData = {};
    // console.log(returnData)

    for(
      let date = new Date(startDate);
      date <= currentDate;
      date.setDate(date.getDate() + 1)
    ){
      let target = date.toJSON().slice(0, date.toJSON().indexOf('T'));
      let prevTarget = new Date(date.valueOf() - 86400000).toJSON().slice(0, date.toJSON().indexOf('T'))
      let nextTarget = new Date(date.valueOf() + 86400000).toJSON().slice(0, date.toJSON().indexOf('T'))

      let dailySymbols = orgTrans[target] ? Object.keys(orgTrans[target]) : null

      if(!returnData[target]){
        returnData[target] = {}
      }
      if(!dailySymbols){
        returnData[target] = {...returnData[prevTarget]}
        // returnData[nextTarget] = {...returnData[target]}
      }
      else{
        dailySymbols.forEach(e => {
          orgTrans[target][e].forEach(ele => {
            if(!returnData[target][e])returnData[target][e] = 0;
            ele.type == 'buy' ?
             returnData[target][e] = returnData[target][e] + ele.quantity :
             returnData[target][e] = returnData[target][e] - ele.quantity
          })
        })
      }
    }
    // console.log(returnData);
    return returnData
  }
  const parseValues = (dates, stocks) => {
    const stockData = fillDates(stocks);
    let returnObject = {};
    let data = {...dates};
    let dataEntries = Object.entries(data)
    dataEntries.forEach(e => {
      let dailyTotal = 0;
      let key = e[0];
      let value = e[1];
      let symbols = Object.keys(value)
      let total = symbols.map(sym => {
        let total = 0;
        console.log(stockData[sym] , sym , key)
        if(stockData[sym]){
          total = value[sym] * stockData[sym][key];
        }
        dailyTotal += total
        return total
      })
      returnObject[key] = dailyTotal;
    })
    console.log(returnObject)
  }
  parseValues(parseDates(filteredTrans),stocks)
  return (
    <div>
      {/* <DetailGraph data={dataGraph} /> */}
    </div>
  );
}



























export function OldPortfolio() {
  const dispatch = useDispatch();
  let transactions = useSelector((state) => state?.transactions);
  let stocks = useSelector((state) => state.stocks);
  const [dataGraph, setDataGraph] = useState([]);

  useEffect(async () => {
    dispatch(getAllTransactionsThunk());
  }, []);

  useEffect(() => {
    let trans = Object.values(transactions);
    let dailyData = { ...groupBy(trans, ['symbol', 'date', 'transaction']) };

    Object.keys(dailyData).forEach((ele) => {
      dispatch(getStock(ele));
    });
  }, [transactions]);

  //checks to make sure all stock info is in store
  // data should be an object containing key value pairs where the keys are stock symbols
  const checkStore = (data) => {
    return Object.keys(data).reduce((acc, curr) => {
      Object.keys(stocks).includes(curr) && acc ? (acc = true) : (acc = false);
      return acc;
    }, true);
  };


  const createHistory = (transactionHistory) => {
    console.log(transactionHistory)
    let orderedHistory = groupBy(transactionHistory, [
      'date',
      'symbol',
      'transaction',
    ]);

    let sortedTransactionHistory = transactionHistory.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .reverse();

    const firstTransactionDate = new Date(sortedTransactionHistory[0].date);
    const currentDate = new Date(); // Current date

    let data = {};
    let returnData = {};
    let finalReturnData = {};

    sortedTransactionHistory.forEach((ele) => {
      let newDate = new Date(ele.date);
      data[newDate.toJSON().slice(0, newDate.toJSON().indexOf('T'))] = orderedHistory[ele.date];
    });
    console.log(data)

    for (
      let date = new Date(firstTransactionDate);
      date <= currentDate;
      date.setDate(date.getDate() + 1)
    ) {
      let target = date.toJSON().slice(0, date.toJSON().indexOf('T'))
      if (target == firstTransactionDate.toJSON().slice(0, date.toJSON().indexOf('T'))) {
        returnData[target] = {};
      }
      if (data[target]) {
        // data[date.toDateString()] = {}
        let keys = Object.keys(data[date.toJSON().slice(0, date.toJSON().indexOf('T'))]);
        keys.forEach((d) => {
          data[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d].buy?.forEach((q) => {
            console.log(returnData, date.toJSON().slice(0, date.toJSON().indexOf('T')), d)
            returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d]
              ? (returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d] += q.quantity)
              : (returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d] = q.quantity);
          });
          data[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d].sell?.forEach((q) => {
            returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d]
              ? (returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d] -= q.quantity)
              : (returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))][d] = q.quantity);
          });
        });
      }

      // it[date.toDateString()] = {...returnData[date.toDateString()]}
      let newDate = new Date(date);
      newDate.setDate(date.getDate() + 1);
      finalReturnData[newDate.toJSON().slice(0, date.toJSON().indexOf('T'))] = {
        ...returnData[date.toJSON().slice(0, date.toJSON().indexOf('T'))],
      };
    }
    return finalReturnData;
  };

  let fillDates = (data) => {
    let newData = {}
    let currentDate = new Date()
    Object.keys(data).forEach(e => {
      newData[e] = {}
      let dataByDate = groupBy(data[e],['time'])
      let sortedData = data[e].sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
      })
      .reverse();
      let successVal = sortedData[0].value;
      for(
        let date = new Date(sortedData[0].time);
        date.valueOf() < currentDate.valueOf();
        date.setDate(date.getDate() + 1)
      ){
        let target = date.toJSON().slice(0, date.toJSON().indexOf('T'))
        newData[e][target] = dataByDate[target] || [{time:target, value:successVal}]
        successVal = newData[e][target][0].value;
      }
    })
    return newData
  }

  let manageInfo = (history) => {
    let graphData = [];

    let input = Object.keys(history); //all the dates
    let tank = Object.entries(stocks);
    let tankData = fillDates(stocks);

    let sortedData = input.sort(function (a, b) {
        return new Date(b) - new Date(a);
      })
      .reverse();
    let savedValue = sortedData[0]
    sortedData.forEach((ele) => {
      let value = 0;
      let data = history[ele];
      let symbols = Object.keys(data);
      // value = tankData[]
      symbols.forEach((val) => {
        if(tankData[val][ele]){
          value += tankData[val][ele][0].value * data[val];
          savedValue = tankData[val][ele][0].value;
        }
        else{
          console.log(tankData, ele, val, savedValue)
          value += savedValue * data[val] ;
        }
      });
      graphData.push({ time: ele, value });
    });
    return graphData;
  };

  useEffect(() => {
    let trans = Object.values(transactions);
    let dailyData = groupBy(trans, ['symbol', 'date', 'transaction']);

    if (checkStore(dailyData)) {
      let info = groupBy(trans, ['symbol']);
      let symbols = Object.keys(info);//CANCHANGE: info can be dailyData
      symbols.forEach((symbol) => {
        let data = groupBy(stocks[symbol], ['time']);

        let hist = createHistory(trans);
        console.log(hist)
        let theStuff = manageInfo(hist);
        console.log(theStuff)
        setDataGraph(theStuff);

      });
    } else {

    }
  }, [stocks]);
  return (
    <div>
      <DetailGraph data={dataGraph} />
    </div>
  );
}
// groupby function to group an array(arr) of objects by category(groups is an array of keys)
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

function calculatePortfolioValueByDay(transactionList, stocks) {
  const portfolioTransactions = transactionList;
  const firstTransactionDate = new Date(portfolioTransactions[0].date);
  const currentDate = new Date(); // Current date
  const portfolioValues = [];
  for (
    let date = firstTransactionDate;
    date <= currentDate;
    date.setDate(date.getDate() + 1)
  ) {
    const holdings = {};

    for (const transaction of portfolioTransactions) {
      const {
        transaction: transType,
        date: transactionDate,
        quantity,
        price,
        symbol,
      } = transaction;
      const transactionDateObj = new Date(transactionDate);

      // Skip transactions that occurred after the current date
      if (transactionDateObj > date) {
        continue;
      }

      if (transType === 'buy') {
        if (!holdings[symbol]) {
          holdings[symbol] = {
            quantity: 0,
            value: 0,
          };
        }
        holdings[symbol].quantity += quantity;
        holdings[symbol].value += quantity * price;
      } else if (transType === 'sell') {
        if (holdings[symbol]) {
          holdings[symbol].quantity -= quantity;
          holdings[symbol].value -= quantity * price;
        }
      }
    }

    const updatedHoldings = [];
    const symbols = Object.keys(holdings);

    for (const symbol of symbols) {
      let data = groupBy(stocks[symbol], ['time']);

      const historicalPrice = data[date].value;

      if (historicalPrice) {
        const updatedValue = holdings[symbol].quantity * historicalPrice;
        updatedHoldings.push({
          symbol,
          value: updatedValue,
        });
      }
    }

    const totalPortfolioValue = updatedHoldings.reduce(
      (total, holding) => total + holding.value,
      0
    );

    portfolioValues.push({
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, // Format the date as 'dd-mm-yyyy'
      totalPortfolioValue,
    });
  }

  return portfolioValues;
}
