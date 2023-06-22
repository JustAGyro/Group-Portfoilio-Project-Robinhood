from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import NoteSymbol, Note


note_routes = Blueprint('notes', __name__)


# GET /api/notes
















# GET /api/notes/:noteId












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
