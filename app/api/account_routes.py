from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import Account, User, db

account_routes = Blueprint('accounts', __name__)



# Route for getting user account/balance
@account_routes.route('/info')
@login_required
def get_account():
    user_id = current_user.id
    account = Account.query.filter(Account.userId==user_id).first()
    print (account)
    return account.to_dict()


# Route for updating user balance
@account_routes.route('/<id>/update', methods=['PUT'])
@login_required
def update_balance(id):
    data = request.get_json()
    balance = data.get('balance')
    user_account = Account.query.get(id)
    user_account.balance = balance
    db.session.commit()
    return user_account.to_dict()


