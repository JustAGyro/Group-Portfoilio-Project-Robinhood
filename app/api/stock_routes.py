from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import certifi
import json
from urllib.request import urlopen

stock_routes = Blueprint('stocks', __name__)

# Historical Daily Price for a specific stock
@stock_routes.route('/historical_daily/<symbol>')
@login_required
def historical_daily(symbol):
    url =f"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?serietype=line&timeseries=365&apikey=c4af6834a77de852f5ef970e0b5dd457"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    # Todo !!
    # Parse the data and only take what we need for this specific route
    # Change return to only return the new parsed data.
    return json.loads(data)
