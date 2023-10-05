from flask import Blueprint, jsonify, request
import datetime
from flask_login import login_required, current_user
import certifi
import json
from urllib.request import urlopen
from datetime import datetime
import os

api_key = os.environ.get('api_key')

stock_routes = Blueprint('stocks', __name__)




#FOR STOCK DETAIL PAGE

# stock price real time
@stock_routes.route('/stock_price/<symbol>')
@login_required
def stock_price(symbol):
    url =  f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode('utf-8')
    parsed_data = json.loads(data)[0]
    stock_price = {
        'price': parsed_data['price']
    }
    return stock_price

# Historical Daily Price for a specific stock - 1 Month
@stock_routes.route('/one_month/<symbol>')
@login_required
def one_month(symbol):
    url =f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=30&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)
    return jsonify(parsed_data['historical'])

# Historical Daily Price for a specific stock - 3 Month
@stock_routes.route('/three_month/<symbol>')
@login_required
def three_month(symbol):
    url =f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=90&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)
    return jsonify(parsed_data['historical'])

# Historical Daily Price for a specific stock - 1 Year
@stock_routes.route('/one_year/<symbol>')
@login_required
def one_year(symbol):
    url = f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=365&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)
    return jsonify(parsed_data['historical'])

# Historical Daily Price for a specific stock - 3 Year
@stock_routes.route('/three_year/<symbol>')
@login_required
def three_year(symbol):
    url =f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=1095&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)
    return jsonify(parsed_data['historical'])

# Historical Daily Price for a specific stock - 5 Year
@stock_routes.route('/five_year/<symbol>')
@login_required
def five_year(symbol):
    url =f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=1825&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)
    return jsonify(parsed_data['historical'])


# Company Quote for the stock
@stock_routes.route('/company_quote/<symbol>')
@login_required
def company_quote(symbol):
    url =  f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode('utf-8')
    parsed_data = json.loads(data)[0]

    market_cap = "{:,}".format(parsed_data['marketCap'])
    avg_volume = "{:,}".format(parsed_data['avgVolume'])
    volume = "{:,}".format(parsed_data['volume'])

    company_quote = {
        'name': parsed_data['name'],
        'marketCap': market_cap,
        'peRatio': parsed_data['pe'],
        'avgVolume': avg_volume,
        'highToday': f"$ {parsed_data['dayHigh']}",
        'lowToday': f"$ {parsed_data['dayLow']}",
        'volume': volume,
        'openPrice': f"$ {parsed_data['open']}",
        'yearHigh': f"$ {parsed_data['yearHigh']}",
        'yearLow': f"$ {parsed_data['yearLow']}"
    }
    return company_quote

#  company info related to stock
@stock_routes.route('/company_info/<symbol>')
@login_required
def company_info(symbol):
    url = f"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)[0]


    employees = "{:,}".format(int(parsed_data['fullTimeEmployees']))
    founded_date = datetime.strptime(parsed_data['ipoDate'], '%Y-%m-%d').year

    company_info = {
        'ceo': parsed_data['ceo'],
        'employees': employees,
        'headquaters': parsed_data['city'] + ', ' + parsed_data['state'],
        'foundedDate': founded_date,
        'description': parsed_data['description']
    }

    return company_info

# returns five article realted to specific stock
@stock_routes.route('/stock_news/<symbol>')
@login_required
def single_stock_news(symbol):
    url = f"https://financialmodelingprep.com/api/v3/stock_news?tickers={symbol}&limit=5&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)



# stock search

# search stock by symbol
@stock_routes.route('/stock_search/<symbol>')
# @login_required
def stock_search_symbol(symbol):
    symbol = symbol.upper()
    url=f"https://financialmodelingprep.com/api/v3/search?query={symbol}&limit=10&apikey={api_key}"
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
    url = f"https://financialmodelingprep.com/api/v3/stock_news?tickers=AAPL,FB,GOOG,AMZN,NFLX&limit=10&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)



# general news articles
@stock_routes.route('/general_news')
# @login_required
def gerneral_news():
    url = f"https://financialmodelingprep.com/api/v4/general_news?limit=10&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)

# crypto news articles
@stock_routes.route('/crypto_news')
@login_required
def crypto_news():
    url = f"https://financialmodelingprep.com/api/v4/crypto_news?limit=10&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)
# forex news articles
@stock_routes.route('/forex_news')
@login_required
def forex_news():
    url = f"https://financialmodelingprep.com/api/v4/forex_news?limit=10&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)

# Search Bar
@stock_routes.route('/search/<value>')
@login_required
def stock_search(value):
    url = f"https://financialmodelingprep.com/api/v3/search?query={value}&limit=10&apikey={api_key}"
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
# @login_required
def top_gainers():
    url=f"https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)

# Historical for 24 hours
@stock_routes.route('/todays/<symbol>')
# @login_required
def historical_today(symbol):
    
    url =f"https://financialmodelingprep.com/api/v3/historical-chart/1hour/{symbol}?serietype=line&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    parsed_data = json.loads(data)[:24]
    # print (parsed_data,'------------this is prsed data')
    # modified_data = []
    # for items in parsed_data:
    #     date_str = items['date']
    #     # price =
    #     date_obj = datetime.datetime.strptime(date_str,"%Y-%m-%d %H:%M:%S")
    #     unix_time = int(date_obj.timestamp())
    #     modified_item = {"date": unix_time}
    #     modified_data.append(modified_item)


    price_and_time_only = [{'time': obj['date'], 'value': obj['close']} for obj in parsed_data]
    # print(price_and_time_only, '---------------before reverse')
    price_and_time_only.reverse()
    # print (price_and_time_only, '-----------this is price and time')
    import datetime
    modified_data = []
    for items in price_and_time_only:
        date_str = items['time']
        val = items['value']
        date_obj = datetime.datetime.strptime(date_str,"%Y-%m-%d %H:%M:%S")
        unix_time = int(date_obj.timestamp())
        modified_item = {"time": unix_time, "value": val}
        modified_data.append(modified_item)
    return modified_data
    # return price_and_time_only
