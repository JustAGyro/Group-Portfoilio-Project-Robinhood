from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

stock_routes = Blueprint('stocks', __name__)
