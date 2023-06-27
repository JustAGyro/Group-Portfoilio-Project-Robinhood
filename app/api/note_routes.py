from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import NoteSymbol, Note, db
from app.forms.note_form import NoteForm

note_routes = Blueprint('notes', __name__)

# Test route
@note_routes.route('/test')
def note_test():
    in_route = 'In Route :)'
    return jsonify(in_route)

# GET /api/notes/current
# Get all notes for the current user
@note_routes.route('/current')
@login_required
def notes():
    user_id = current_user.id
    notes = Note.query.join(NoteSymbol).filter(Note.userId == user_id).all()
    note_list = [note.to_dict() for note in notes]

    return jsonify(note_list)

# GET /api/notes/<id>
# GET note by note_id
@note_routes.route('/<id>')
# @login_required
def note(id):
    note = Note.query.get(1)
    return jsonify(note)

# GET /api/notes/current
# GET all notes for the current user
@note_routes.route('/current')
@login_required
def current_notes():
    user_id = current_user.id
    stock_symbol = request.args.get('symbol')

    notes = (
        Note.query
        .join(NoteSymbol)
        .filter(Note.userId == user_id, NoteSymbol.symbol == stock_symbol)
        .all()
    )

    note_list = [note.to_dict() for note in notes]

    return jsonify(note_list)

# POST /api/notes/new
# POST a new note
@note_routes.route('/new', methods=['POST'])
@login_required
def add_note():
    form = NoteForm()

    new_note = Note(
        userId=1,
        subject=form.subject.data,
        entry=form.entry.data
    )
    db.session.add(new_note)
    db.session.commit()

    return jsonify(new_note.to_dict())

# DELETE /api/notes/<id>/delete
# DELETE a note
@note_routes.route('/<id>/delete', methods=['Delete'])
@login_required
def delete_note(id):
    note = Note.query.get(id)
    if not note:
        return ('note not found')
    if current_user.id == note.userId:
        db.session.delete(note)
        db.session.commit()
        return 'Successfully Deleted Note'

# PUT /api/notes/<id>/edit
# PUT edit a note
@note_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def edit_note(id):
    note = Note.query.filter(Note.id == id)

    if note:
        form = NoteForm()
        form.subject.data=note.subject
        form.entry.data=note.entry

        newNote = Note(
            id=note.id,
            userId=current_user.id,
            subject=form.subject.data,
            # form.data['subject']
            entry=form.entry.data
        )
        db.session.add(newNote)
        db.session.commit()

        return jsonify(newNote.to_dict())
    else:
        return 'No Note Found'
    

# /api/notes/<id>/notesymbol/new
# post a new note symbol to a note
@note_routes.route('/<id>/notesymbol/new', methods=['POST'])
@login_required
def add_note_symbols(id):
    note = Note.query.get(id)
    if not note:
        return jsonify(error = 'Watchlist not found'), 404
    form = NoteForm()
    new_note_symbol = NoteSymbol(
        symbol = form.symbol.data,
        noteId = id
    )
    db.session.add(new_note_symbol)
    db.session.commit()

    return jsonify(new_note_symbol.to_dict())

# DELETE /api/notes/<note_id>/notesymbol/<notesymbol_id>/delete
# delete a notesymbol from a notesymbols
@note_routes.route('/<note_id>/notesymbol/<notesymbol_id>/delete', methods=['DELETE'])
@login_required
def delete_note_symbol(note_id, notesymbol_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify(error = 'Note not found'), 404
    note_symbol= NoteSymbol.query.get(notesymbol_id)
    if not note_symbol:
        return jsonify(error = 'Symbol not found'), 404
    if note_symbol.noteId != note.id:
        return jsonify(error='Symbol does not belong to the specified note'), 400
    
    db.session.delete(note_symbol)
    db.session.commit()

    return jsonify(message = 'Symbol deleted successfullt')

# PUT /api/notes/<note_id>/notesymbol/<notesymbol_id>/edit
# edit a notesymbol from a notesymbols
@note_routes.route('/<note_id>/notesymol/<notesymbol_id>/edit', methods=['PUT'])
@login_required
def edit_note_symbol(note_id, notesymbol_id):
    note = Note.query.get()
    if not note:
        return jsonify(error = 'Note not found'), 404
    note_symbol = NoteSymbol.query.get(notesymbol_id)
    if not note_symbol:
        return jsonify(error = 'Symbol not found'), 404
    if note_symbol.noteId != note.id:
        return jsonify(error='Symbol does not belong to the specified note'), 400
    form = NoteForm()
    form.symbol.data = note.symbol
    new_symbol = NoteSymbol(
        id = note_symbol.id,
        noteId = note_id,
        symbol = form.symbol.data
    )
    db.session.add(new_symbol)
    db.session.commit()

    return jsonify(new_symbol)
    
# GET /api/notes/<note_id>/notesymbol
# get all the note symbol for a specific note
@note_routes.route('/<note_id>/notesymbols')
@login_required
def get_note_symbols(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify(error = 'Note not found'), 404
    note_symbols = (NoteSymbol.query.filter(NoteSymbol.noteId == note_id))
    note_symbols_list = [note_symbol.to_dict() for note_symbol in note_symbols]
    return jsonify(note_symbols_list)

    




