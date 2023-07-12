from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import PortfolioTransaction, db
from app.forms.transaction_form import TransactionForm

transaction_routes = Blueprint('portfoliotransactions', __name__)

# GET /api/transactions/current
# GET all transactions for the current user
@transaction_routes.route('/current')
@login_required
def transactions_current():
    user_id = current_user.id
    transactions = PortfolioTransaction.query.filter(PortfolioTransaction.userId == user_id).all()
    transaction_list = [transaction.to_dict() for transaction in transactions]

    return jsonify(transaction_list)

# GET /api/transactions/symbol/<symbol>
# GET all transactions for a certain symbol
@transaction_routes.route('/symbol/<symbol>')
@login_required
def transactions_symbol(symbol):
    user_id = current_user.id
    transactions = PortfolioTransaction.query.filter(PortfolioTransaction.userId == user_id and PortfolioTransaction.symbol == symbol).all()
    transaction_list = [transactions.to_dict() for transaction in transactions]
    return jsonify(transaction_list)

# GET /api/transactions/<id>
# GET one transaction based on the id
@transaction_routes.route('/<p_id>')
@login_required
def transactions_one(p_id):
    user_id = current_user.id
    transaction = PortfolioTransaction.query.filter(PortfolioTransaction.id == p_id)
    return jsonify(transaction.to_dict())

# POST /api/transactions/new
# POST a new transaction (buy/sell).
@transaction_routes.route('/new', methods=["POST"])
@login_required
def transactions_new():
    user_id = current_user.id

    data = request.get_json()
    transaction = data.get('transaction')
    quantity = data.get('quantity')
    price = data.get('price')
    symbol = data.get('symbol')

    new_transaction = PortfolioTransaction(
        userId=user_id,
        transaction=transaction,
        quantity=quantity,
        price=price,
        symbol=symbol,
    )

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify(new_transaction.to_dict())
