from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Account(db.Model):
    __tablename__ = "accounts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False, unique=True)
    balance = db.Column(db.Float, nullable=False, default=1000.00)

    userId = relationship("User", back_populates="id")
