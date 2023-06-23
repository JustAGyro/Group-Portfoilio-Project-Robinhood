from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import NoteSymbol, Note, db
from app.forms.note_form import NoteForm


note_routes = Blueprint('notes', __name__)

# Test route

# @note_routes.route('/')
# def note_test():
#     in_route = 'In Route :)'
#     return jsonify(in_route)

# GET /api/notes
# Get all notes for the current user
@note_routes.route('/mine')
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

# GET /api/notes/<id>
@note_routes.route('/<id>')
# @login_required
def note(id):
    note = Note.query.get(1)
    return jsonify(note)

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
@note_routes.route('/new', methods=['POST'])
@login_required
def add_note():
    # data is destructured
    form = NoteForm()
    # if form.validate_on_submit():
    new_note = Note(
        userId=1,
        subject=form.subject.data,
        entry=form.entry.data
    )
        # subject = 'Note Subject'
        # userId = current_user.id
        # entry = 'this is the form entry'
        # new_note = Note (
        #     userId = userId,
        #     subject = subject,
        #     entry = entry
        # )
    db.session.add(new_note)
    db.session.commit()
        # return 'Successfully Added'
    print(new_note.to_dict())
    return jsonify(new_note.to_dict())
# DELETE /api/notes/:noteId/delete

@note_routes.route('/<int:noteId>/delete', methods=['Delete'])
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
        return 'No such note.'
