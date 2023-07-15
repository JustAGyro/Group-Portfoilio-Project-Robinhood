from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class WatchList(db.Model):
    __tablename__ = "watchlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = relationship("User", back_populates="watchlists")
    symbollists = relationship("SymbolList", back_populates="list", cascade="all, delete-orphan")

    def to_dict(self):
        symbollists1 = [
            {
                'id': symbollist.id,
                'listId': symbollist.listId,
                'symbol': symbollist.symbol
            }
            for symbollist in self.symbollists
        ]

        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'symbols': symbollists1
        }
