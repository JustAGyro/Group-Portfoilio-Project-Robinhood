from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import WatchList, SymbolList, db
from app.forms.symbollist_form import SymbolListForm

symbollist_routes = Blueprint('symbollists', __name__)

# Test Route
@symbollist_routes.route('/test')
def watchlist_test():
    in_route = "In Route :)"
    return jsonify(in_route)

# POST /api/symbollists/<id>/new
# POST a new symbollist
@symbollist_routes.route('/<id>/new', methods=['POST'])
@login_required
def add_symbollist(id):
    form = SymbolListForm()

    new_symbollist = SymbolList(
        listId = id,
        symbol = form.symbol.data
    )

    db.session.add(new_symbollist)
    db.session.commit()

    return jsonify(new_symbollist.to_dict())

# DELETE /api/symbollists/<id>/delete
# DELETE a symbollist
@symbollist_routes.route('/<id>/delete', methods=['DELETE'])
@login_required
def delete_symbollist(id):
    symbollist = SymbolList.query.get(id)
    if not symbollist:
        return ('Symbol Not Found')
    else:
        db.session.delete(symbollist)
        db.session.commit()
        return ('Successfully Deleted Symbol')
