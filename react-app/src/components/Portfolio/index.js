import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionsThunk } from '../../store/transactions';
import { getStock } from '../../store/stocks';
import Graph from '../Graph';
import reactRouterDom from 'react-router-dom';
import DetailGraph from '../DetailsGraph';

export default function Portfolio() {
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
    // console.log("FLAGGYWAGGY",dailyData)
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
    // console.log(transactionHistory)
    let orderedHistory = groupBy(transactionHistory, [
      'date',
      'symbol',
      'transaction',
    ]);
    let sortedTransactionHistory = transactionHistory
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .reverse();
    const firstTransactionDate = new Date(sortedTransactionHistory[0].date);
    const currentDate = new Date(); // Current date
    // let it = {}
    let data = {};
    let returnData = {};
    // console.log("winkaaaa",returnData, data)
    transactionHistory.forEach((ele) => {
      let newDate = new Date(ele.date);
      data[newDate.toDateString()] = orderedHistory[ele.date];
    });

    for (
      let date = new Date(firstTransactionDate);
      date < currentDate;
      date.setDate(date.getDate() + 1)
    ) {
      // console.log(date, returnData[date.toDateString()], returnData)
      if (date.toDateString() == firstTransactionDate.toDateString()) {
        returnData[date.toDateString()] = {};
        // console.log(returnData)
      }
      if (data[date.toDateString()]) {
        // data[date.toDateString()] = {}
        let keys = Object.keys(data[date.toDateString()]);
        keys.forEach((d) => {
          // console.log("before", returnData[date.toDateString()])
          data[date.toDateString()][d].buy?.forEach((q) => {
            // console.log(q.transaction, q.quantity)
            returnData[date.toDateString()][d]
              ? (returnData[date.toDateString()][d] += q.quantity)
              : (returnData[date.toDateString()][d] = q.quantity);
          });
          data[date.toDateString()][d].sell?.forEach((q) => {
            // console.log(q.transaction, q.quantity)
            returnData[date.toDateString()][d]
              ? (returnData[date.toDateString()][d] -= q.quantity)
              : (returnData[date.toDateString()][d] = q.quantity);
          });
          // console.log("after",d, returnData[date.toDateString()][d])
        });
      }
      // console.log(returnData[date.toDateString()])
      // it[date.toDateString()] = {...returnData[date.toDateString()]}
      let newDate = new Date(date);
      newDate.setDate(date.getDate() + 1);
      returnData[newDate.toDateString()] = {
        ...returnData[date.toDateString()],
      };
    }
    // console.log("FLAG",returnData)
    let dataEntries = Object.entries(returnData);
    let sortedDataEntries = dataEntries
      .sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b[0]) - new Date(a[0]);
      })
      .reverse();
    // console.log("entry flag", dataEntries)

    // dataEntries.forEach(ele => {
    //     // console.log(ele[0], ele[1])
    //     Object.keys(ele[1]).forEach(symbol => {
    //       // console.log(symbol)
    //       let stockObj = groupBy(stocks[symbol], ['time'])
    //       Object.entries(stockObj).forEach(val => {
    //         let one = new Date(val[0])
    //         let two = new Date(ele[0])
    //         // console.log(one.toDateString() == two.toDateString())
    //       })

    //     })
    // })
    // console.log(it, returnData)
    console.log(sortedDataEntries);
    console.log(returnData);
    return returnData;
  };

  let manageInfo = (history) => {
    let graphData = [];

    let input = Object.keys(history); //all the dates
    console.log('dates', input);
    let tank = Object.entries(stocks);
    // console.log(tank)
    let tankData = {};
    tank.forEach((ele) => {
      let actual = {};
      let filler = groupBy(ele[1], ['time']);
      let fillerKeys = Object.keys(filler);
      fillerKeys.forEach((e) => {
        let date = new Date(e);
        // console.log('key', e)
        // console.log('obj',filler[e])
        actual[date.toDateString()] = filler[e];
      });
      tankData[ele[0]] = actual;
    });
    // console.log(tankData)
    let sortedData = input
      .sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b) - new Date(a);
      })
      .reverse();
    let savedDate;
    sortedData.forEach((ele) => {
      let value = 0;
      let data = history[ele];
      let symbols = Object.keys(data);
      // value = tankData[]
      symbols.forEach((val) => {
        if (tankData[val][ele]) {
          // console.log("tankdata",val,ele,tankData[val][ele])
          value += tankData[val][ele][0].value * data[val];
          savedDate = ele;
        } else value += tankData[val][savedDate][0].value * data[val];
      });
      graphData.push({ time: ele, value });
    });
    return graphData;
  };
  useEffect(() => {
    let trans = Object.values(transactions);
    let dailyData = groupBy(trans, ['symbol', 'date', 'transaction']);
    console.log('check', Object.keys(dailyData));
    console.log('check', Object.keys(stocks));
    if (checkStore(dailyData)) {
      // console.log("YES")
      let info = groupBy(trans, ['symbol']);
      let symbols = Object.keys(info);
      symbols.forEach((symbol) => {
        let data = groupBy(stocks[symbol], ['time']);
        // console.log("Dataflag", data)
        let hist = createHistory(trans);
        // console.log("this",hist)
        let theStuff = manageInfo(hist);
        setDataGraph(theStuff);
        console.log('>>>', dataGraph);
      });
    } else {
      console.log('no');
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
      console.log('Dateflag', data);
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

// export default function Portfolio() {
//     const dispatch = useDispatch()
//     let transactions = useSelector(state => state?.transactions)
//     let stocks = useSelector(state => state.stocks)
//     const [byDate, setByDate] = useState({})
//     const [dailyValue, setDailyValue] = useState([])
//     const [place, setPlace] = useState({})
//     useEffect(async () => {
//         dispatch(getAllTransactionsThunk())
//     },[])
//     useEffect(async () => {
//         let trans = Object.values(transactions)
//         let dailyData = {...groupBy(trans, ['date','transaction'])}
//         let sortedDailyData = Object.keys(dailyData).sort(function(a,b){
//             // Turn your strings into dates, and then subtract them
//             // to get a value that is either negative, positive, or zero.
//             return new Date(b.date) - new Date(a.date);
//         })
//         console.log("flag0",trans)
//         let groupedDates = groupBy(trans, ['date', 'symbol','transaction'])
//         console.log("flag1",groupedDates)
//         let symbolList = groupBy(trans,['symbol', 'transaction'])
//         console.log("flag3", Object.keys(symbolList), symbolList)

//         Object.keys(symbolList).forEach(async symbol => {
//             dispatch(getStock(symbol))
//         });

//         console.log("stonks", stocks)
//         if(stocks && trans){
//         let it = await calculatePortfolioValueByDay(trans, stocks )
//         .then((portfolioData) => {
//             console.log(portfolioData);
//         })
//         .catch((error) => {
//             console.error('Error calculating portfolio value:', error);
//         });}
//     }, [transactions])
//     return (
//         <div>
//             cahrt go here
//         </div>
//     )
// }
