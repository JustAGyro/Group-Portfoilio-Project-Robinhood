from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class SymbolList(db.Model):
    __tablename__ = "symbollists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("watchlists.id")), nullable=False)
    symbol = db.Column(db.String(5))

    list = relationship("WatchList", back_populates="symbollists")

    def to_dict(self):
        return {
            'id':self.id,
            'listId':self.listId,
            'symbol':self.symbol
        }
