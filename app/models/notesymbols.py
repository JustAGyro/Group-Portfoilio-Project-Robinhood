from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class NoteSymbol(db.Model):
    __tablename__ = "notesymbols"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    noteId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("notes.id")), nullable=False)
    symbol = db.Column(db.String(5))

    note = relationship("Note", back_populates="symbols")
