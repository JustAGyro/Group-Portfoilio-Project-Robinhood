//Fake seed data
function fakeTableInfo() {
  return [
    {
      id: 1,
      userid: 123,
      transaction: 'buy',
      date: '2023-06-20',
      quantity: 10,
      price: 50,
      symbol: 'AAPL',
    },
    {
      id: 2,
      userid: 123,
      transaction: 'buy',
      date: '2023-06-21',
      quantity: 5,
      price: 55,
      symbol: 'AAPL',
    },
    {
      id: 3,
      userid: 123,
      transaction: 'sell',
      date: '2023-06-22',
      quantity: 3,
      price: 60,
      symbol: 'AAPL',
    },
    {
      id: 4,
      userid: 123,
      transaction: 'buy',
      date: '2023-06-23',
      quantity: 8,
      price: 45,
      symbol: 'MSFT',
    },
    {
      id: 5,
      userid: 123,
      transaction: 'sell',
      date: '2023-06-24',
      quantity: 2,
      price: 50,
      symbol: 'MSFT',
    },
    {
      id: 6,
      userid: 123,
      transaction: 'buy',
      date: '2023-06-25',
      quantity: 15,
      price: 100,
      symbol: 'GOOG',
    },
    {
      id: 7,
      userid: 123,
      transaction: 'buy',
      date: '2023-06-26',
      quantity: 7,
      price: 150,
      symbol: 'GOOG',
    },
    {
      id: 8,
      userid: 123,
      transaction: 'sell',
      date: '2023-06-27',
      quantity: 5,
      price: 180,
      symbol: 'GOOG',
    },
    {
      id: 9,
      userid: 123,
      transaction: 'buy',
      date: '2023-06-28',
      quantity: 12,
      price: 80,
      symbol: 'AAPL',
    },
    {
      id: 10,
      userid: 123,
      transaction: 'sell',
      date: '2023-06-29',
      quantity: 5,
      price: 75,
      symbol: 'AAPL',
    },
  ];
}

//Fake historical data API call - this would be done using the API - i just put a bunch of seed data.
//One way we can do this is by using the creation date of the user (when they signed up) as the first day we need historical data.
//Then when they go into the dashboard it calls the historical data for each symbol they hold.
//We can then put the result of all this code (the historical portfolio values) into the state so we dont need to make calls every time.

async function getHistoricalPrice(symbol, date) {
  const historicalPriceData = {
    AAPL: {
      '2023-06-20': 130,
      '2023-06-21': 140,
      '2023-06-22': 135,
      '2023-06-23': 138,
      '2023-06-24': 145,
      '2023-06-25': 148,
      '2023-06-26': 150,
      '2023-06-27': 155,
      '2023-06-28': 160,
      '2023-06-29': 155,
      '2023-06-30': 160,
      '2023-07-01': 160,
    },
    MSFT: {
      '2023-06-20': 250,
      '2023-06-21': 260,
      '2023-06-22': 255,
      '2023-06-23': 258,
      '2023-06-24': 262,
      '2023-06-25': 265,
      '2023-06-26': 268,
      '2023-06-27': 270,
      '2023-06-28': 275,
      '2023-06-29': 280,
      '2023-06-30': 300,
      '2023-07-01': 300,
    },
    GOOG: {
      '2023-06-20': 2000,
      '2023-06-21': 2050,
      '2023-06-22': 1980,
      '2023-06-23': 2010,
      '2023-06-24': 1995,
      '2023-06-25': 1988,
      '2023-06-26': 2020,
      '2023-06-27': 2055,
      '2023-06-28': 2040,
      '2023-06-29': 2035,
      '2023-06-30': 2000,
      '2023-07-01': 2000,
    },
  };
  return historicalPriceData[symbol][date];
}

async function calculatePortfolioValueByDay() {
  const portfolioTransactions = await fakeTableInfo();
  const firstTransactionDate = new Date(portfolioTransactions[0].date);
  const currentDate = new Date(); // Current date

  const portfolioValues = [];

  // Does each day
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
      const historicalPrice = await getHistoricalPrice(
        symbol,
        date.toISOString().split('T')[0]
      );

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

calculatePortfolioValueByDay()
  .then((portfolioData) => {
    console.log(portfolioData);
  })
  .catch((error) => {
    console.error('Error calculating portfolio value:', error);
  });
