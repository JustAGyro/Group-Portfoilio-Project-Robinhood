from app.models import db, NoteSymbol, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notessymbols():

    noteA = NoteSymbol(
        noteId=1, symbol="ABC"
    )
    noteB = NoteSymbol(
        noteId=2, symbol="XYZW"
    )

    db.session.add(noteA)
    db.session.add(noteB)

    db.session.commit()
