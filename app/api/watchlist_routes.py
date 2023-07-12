from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import WatchList, SymbolList, db
from app.forms.watchlist_form import WatchListForm
from app.forms.symbollist_form import SymbolListForm

watchlist_routes = Blueprint('watchlists', __name__)

# Test Route
@watchlist_routes.route('/test')
def watchlist_test():
    in_route = "In Route :)"
    return jsonify(in_route)

# GET /api/watchlists/current
# GET all watchlists for the current user
@watchlist_routes.route('/current')
@login_required
def watchlist_current():

    user_id = current_user.id
    print(user_id)
    
    # watchlists = WatchList.query.join(SymbolList).filter(WatchList.userId == user_id).all()
    watchlists = WatchList.query.filter(WatchList.userId == user_id)
    print(watchlists)
    list = [watchlist.to_dict() for watchlist in watchlists]

    return jsonify(list)

# GET /api/watchlists/<id>
# GET watchlist by watchlist_id
@watchlist_routes.route('/<id>')
@login_required
def watchlist_one(id):
    watchlist = WatchList.query.get(1)
    return jsonify(watchlist.to_dict())

# POST /api/watchlists/new
# POST a new watchlist
@watchlist_routes.route('/new', methods=['POST'])
@login_required
def add_watchlist():
    form = WatchListForm()

    # new_watchlist = WatchList(
    #     userId = current_user.id,
    #     name=form.name.data
    # )
    data = request.get_json()
    name = data.get('name')
    new_watchlist = WatchList(
        userId = current_user.id,
        name = name
    )
    db.session.add(new_watchlist)
    db.session.commit()

    return jsonify(new_watchlist.to_dict())

# DELETE /api/watchlists/<id>/delete
# DELETE a watchlist
@watchlist_routes.route('/<id>/delete', methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist = WatchList.query.get(id)
    symbollist = SymbolList.query.filter(SymbolList.listId == (id))
    if not watchlist:
        return ('Watchlist not found')
    if current_user.id == watchlist.userId:
        for symbol in symbollist:
            db.session.delete(symbol)
        db.session.delete(watchlist)
        db.session.commit()
        return {
            "message":'Successfully Deleted Watchlist'
            }

# PUT /api/watchlists/<id>/edit
# PUT edit a watchlist
@watchlist_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def edit_watchlist(id):
    watchlist = WatchList.query.get(id)
    if not watchlist:
        return 'Watchlist not found'
    data = request.get_json()
    name = data.get('name')
    # id = data.get('id')
    userId = current_user.id

    if watchlist:
        # form = WatchListForm()
        # form.name.data=watchlist.name

        # new_watchlist = WatchList(
        #     id=watchlist.id,
        #     userId=userId,
        #     name=name
        # )
        watchlist.name = name
        # db.session.add(new_watchlist)
        db.session.commit()

        return jsonify(watchlist.to_dict())
    else:
        return "No Watchlist Found"

# POST /api/watchlists/<id>/symbollist/new
# POST a new symbollist to a watchlist
@watchlist_routes.route('/<id>/symbollist/new', methods=['POST'])
@login_required
def add_symbollist(id):
    watchlist = WatchList.query.get(id)
    if not watchlist:
        return jsonify(error='Watchlist not found'), 404

    form = SymbolListForm()
    new_symbollist = SymbolList(
        listId = id,
        symbol = form.symbol.data
    )

    db.session.add(new_symbollist)
    db.session.commit()

    return jsonify(new_symbollist.to_dict())

# DELETE /api/watchlists/<watchlist_id>/symbollist/<symbollist_id>/delete
# DELETE a symbollist from a watchlist
@watchlist_routes.route('/<watchlist_id>/symbollist/<symbollist_id>/delete', methods=['DELETE'])
@login_required
def delete_symbollist(watchlist_id, symbollist_id):
    watchlist = WatchList.query.get(watchlist_id)
    if not watchlist:
        return jsonify(error='Watchlist not found'), 404

    symbollist = SymbolList.query.get(symbollist_id)
    if not symbollist:
        return jsonify(error='Symbol not found'), 404

    if symbollist.listId != watchlist.id:
        return jsonify(error='Symbol does not belong to the specified Watchlist'), 400

    db.session.delete(symbollist)
    db.session.commit()

    return jsonify(message='Symbol deleted successfully')
