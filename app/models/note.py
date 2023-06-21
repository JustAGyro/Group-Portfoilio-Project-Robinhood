from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    entry = db.Column(db.String(2000), nullable=False)

    user = relationship("User", back_populates="notes")
    symbols = relationship("NoteSymbol", back_populates="note")
