from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    symbol = db.Column(db.String(5))
    subject = db.Column(db.String(100), nullable=False)
    entry = db.Column(db.String(2000), nullable=False)

    userId = relationship("User", back_populates="id")
