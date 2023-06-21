from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class PortfolioTransaction(db.Model):
    __tablename__ = "portfoliotransactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    transaction = db.Column(db.Enum("buy", "sell"), nullable=False)
    date = db.Column(db.DateTime, nullable=False) #todo: add default value set to current time stamp
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    symbol = db.Column(db.String(5), nullable=False)

    userId = relationship("User", back_populates="id")
