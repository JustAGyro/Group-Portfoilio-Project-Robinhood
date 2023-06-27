from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import certifi
import json
from urllib.request import urlopen

stock_routes = Blueprint('stocks', __name__)

# Financial Ratios Route
@stock_routes.route('/financial_ratios/<symbol>')
@login_required
def financial_ratios(symbol):
    url =f"https://financialmodelingprep.com/api/v3/key-metrics-ttm/{symbol}?limit=1&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    print(data)
    return json.loads(data)
