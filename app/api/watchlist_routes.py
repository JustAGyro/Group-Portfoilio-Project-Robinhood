from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import WatchList, SymbolList, db
from app.forms.watchlist_form import WatchListForm

watchlist_routes = Blueprint('watchlists', __name__)

#Test Route
@watchlist_routes.route('/test')
def watchlist_test():
    in_route = "In Route :)"
    return jsonify(in_route)

#GET all watchlists for the current user
@watchlist_routes.route('/current')
@login_required
def watchlist_current():
    """
    Query for all watchlists associated with the current user
    """
    user_id = current_user.id
    watchlists = WatchList.query.join(SymbolList).filter(WatchList.userId == user_id).all()
    list = [watchlist.to_dict() for watchlist in watchlists]

    return jsonify(list)

#GET watchlist by watchlist_id
@watchlist_routes.route('/<id>')
@login_required
def watchlist_one(id):
    watchlist = WatchList.query.get(1)
    return jsonify(watchlist.to_dict())

#POST watchlist /api/watchlists/new
@watchlist_routes.route('/new', methods=['POST'])
@login_required
def add_watchlist():
    #data is destructured
    form = WatchListForm()

    new_watchlist = WatchList(
        userId = current_user.id,
        name=form.name.data
    )
    db.session.add(new_watchlist)
    db.session.commit()

    return jsonify(new_watchlist.to_dict())

#DELETE watchlist /api/watchlists/<id>/delete

@watchlist_routes.route('/<id>/delete', methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist = WatchList.query.get(id)
    if not watchlist:
        return ('Watchlist not found')
    if current_user.id == watchlist.userId:
        db.session.delete(watchlist)
        db.session.commit()
        return 'Successfully Deleted Watchlist'

#PUT watchlist /api/watchlists/<id>/edit
@watchlist_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def edit_watchlist(id):
    watchlist = WatchList.query.get(id)
    if watchlist:
        form = WatchListForm()
        form.name.data=watchlist.name

        new_watchlist = WatchList(
            id=watchlist.id,
            userId=current_user.id,
            name=form.name.data
        )
        db.session.add(new_watchlist)
        db.session.commit()

        return jsonify(new_watchlist.to_dict())
    else:
        return "No Watchlist Found"
