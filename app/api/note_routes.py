from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import NoteSymbol, Note, db


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
@note_routes('/new', methods=['POST'])
@login_required
def add_note():
    # data is destructured
    subject = 'Note Subject'
    userId = current_user.id
    entry = 'this is the form entry'
    new_note = Note ( 
        userId = userId,
        subject = subject,
        entry = entry
    )
    db.session.add(new_note)
    db.session.commit()
    return 'Successfully Added'















# DELETE /api/notes/:noteId/delete

@note_routes('/<int:noteId>/delete', methods=['Delete'])
@login_required
def delete_note(noteId):
    note = Note.query.get(noteId)
    if not note: 
        return ('note not found')
    if current_user.id == note.userId:
        db.session.delete(note)
        db.session.commit()
        return 'Successfully deleted note'









# PUT /api/notes/:noteId
