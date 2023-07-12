from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from datetime import datetime

class PortfolioTransaction(db.Model):
    __tablename__ = "portfoliotransactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    transaction = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.now().date())
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    symbol = db.Column(db.String(5), nullable=False)

    user = relationship("User", back_populates="portfoliotransactions")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'transaction': self.transaction,
            'date': self.date,
            'quantity': self.quantity,
            'price': self.price,
            'symbol': self.symbol
        }
