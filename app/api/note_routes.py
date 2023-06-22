from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import NoteSymbol, Note

note_routes = Blueprint('notes', __name__)

# Test route
@note_routes.route('/')
def notes():
    in_route = 'In Route :)'
    return jsonify(in_route)

# GET /api/notes
# Get all notes for the current user
@note_routes.route('/')
@login_required
def notes():
    """
    Query for all notes and returns them in a list of note dictionaries
    """
    user_id = current_user.id
    notes = (
        Note.query
        .join(NoteSymbol)
        .filter(Note.userId == user_id)
        .all()
    )

    note_list = [note.to_dict() for note in notes]

    return jsonify(note_list)

# GET /api/notes/current
@note_routes.route('/current')
@login_required
def current_notes():
    """
    Query for all notes associated with a specific stock symbol for the current user
    """
    user_id = current_user.id
    stock_symbol = request.args.get('symbol')  # Assuming the stock symbol is passed as a query parameter

    notes = (
        Note.query
        .join(NoteSymbol)
        .filter(Note.userId == user_id, NoteSymbol.symbol == stock_symbol)
        .all()
    )

    note_list = [note.to_dict() for note in notes]

    return jsonify(note_list)













# POST /api/notes/new











# DELETE /api/notes/:noteId/delete










# PUT /api/notes/:noteId
