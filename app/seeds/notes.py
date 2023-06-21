from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    demos_note1 = Note(
        userId=1, subject="this is a bagel", entry="OR IS IT??? DUN DUN DAAAAAAAAAAAAAAAAAA"
    )
    demos_note2 = Note(
        userId=1, subject="empty symbol note", entry="yeet yeet yeet, yote, doink bonk"
    )
    marnies_note1 = Note(
        userId=2, subject="bill gates", entry="owns all the gates"
    )
    db.session.add(demos_note1)
    db.session.add(demos_note2)
    db.session.add(marnies_note1)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
