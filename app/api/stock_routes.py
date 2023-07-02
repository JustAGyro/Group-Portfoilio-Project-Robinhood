from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import certifi
import json
from urllib.request import urlopen

stock_routes = Blueprint('stocks', __name__)




#FOR STOCK DETAIL PAGE

# stock price real time
@stock_routes.route('/stock_price/<symbol>')
@login_required
def stock_price(symbol):
    url =  f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode('utf-8')
    parsed_data = json.loads(data)[0]
    stock_price = {
        'price': parsed_data['price']
    }
    return stock_price

# Historical Daily Price for a specific stock
@stock_routes.route('/historical_daily/<symbol>')
@login_required
def historical_daily(symbol):
    url =f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=365&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = data
    print(parsed_data)
    return json.loads(data)

# Company Quote for the stock
@stock_routes.route('/company_quote/<symbol>')
@login_required
def company_quote(symbol):
    url =  f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode('utf-8')
    parsed_data = json.loads(data)[0]

    # !!! this is missing dividend yield need to add another api and add it to the company quote
    company_quote = {
        'marketCap': parsed_data['marketCap'],
        'peRatio': parsed_data['pe'],
        'avgVolume': parsed_data['avgVolume'],
        'highToday': parsed_data['dayHigh'],
        'lowToday': parsed_data['dayLow'],
        'volume': parsed_data['volume'],
        'openPrice': parsed_data['open'],
        'yearHigh': parsed_data['yearHigh'],
        'yearLow': parsed_data['yearLow']
    }
    return company_quote

#  company info related to stock
@stock_routes.route('/company_info/<symbol>')
@login_required
def company_info(symbol):
    url = f"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)[0]
    # !!! founded date is the date when company went public
    company_info = {
        'ceo': parsed_data['ceo'],
        'employees': parsed_data['fullTimeEmployees'],
        'headquaters': parsed_data['city']+','+ parsed_data['state'],
        'foundedDate': parsed_data['ipoDate'],
        'description': parsed_data['description']
    }
    return company_info

# returns five article realted to specific stock
@stock_routes.route('/stock_news/<symbol>')
@login_required
def single_stock_news(symbol):
    url = f"https://financialmodelingprep.com/api/v3/stock_news?tickers={symbol}&limit=5&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)



# stock search

# search stock by symbol
@stock_routes.route('/stock_search/<symbol>')
# @login_required
def stock_search_symbol(symbol):
    symbol = symbol.upper()
    url=f"https://financialmodelingprep.com/api/v3/search?query={symbol}&limit=10&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)
    result = [obj for obj in parsed_data if obj['symbol']==symbol]
    return result


# Dashboard/Portfolio

# news articles related to faang stocks
@stock_routes.route('/faang_news')
@login_required
def fanng_articles():
    url = f"https://financialmodelingprep.com/api/v3/stock_news?tickers=AAPL,FB,GOOG,AMZN,NFLX&limit=10&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)



# general news articles
@stock_routes.route('/general_news')
# @login_required
def gerneral_news():
    url = f"https://financialmodelingprep.com/api/v4/general_news?limit=10&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)

# crypto news articles
@stock_routes.route('/crypto_news')
@login_required
def crypto_news():
    url = f"https://financialmodelingprep.com/api/v4/crypto_news?limit=10&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)
# forex news articles
@stock_routes.route('/forex_news')
@login_required
def forex_news():
    url = f"https://financialmodelingprep.com/api/v4/forex_news?limit=10&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)

# Search Bar
@stock_routes.route('/search/<value>')
@login_required
def stock_search(value):
    url = f"https://financialmodelingprep.com/api/v3/search?query={value}&limit=10&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)

    filtered_results = []

    for result in parsed_data:
        exchange_short_name = result.get('exchangeShortName')
        if exchange_short_name in ['NASDAQ', 'NYSE']:
            filtered_results.append({
                'name': result.get('name'),
                'symbol': result.get('symbol')
            })

    if filtered_results:
        return filtered_results

# Most Gainer Stock

@stock_routes.route('/top_gainers')
@login_required
def top_gainers():
    url="https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)
