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
