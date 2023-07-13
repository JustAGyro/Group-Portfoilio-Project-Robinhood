from app.models import db, SymbolList, environment, SCHEMA
from sqlalchemy.sql import text

def seed_symbolists():
    symbol_list_1_1 = SymbolList(
        listId = 1, symbol = 'AMZN'
    )
    symbol_list_1_2 = SymbolList(
        listId = 1, symbol = 'GOOG'
    )
    symbol_list_1_3 = SymbolList(
        listId = 1, symbol = 'NKE'
    )
    symbol_list_1_4 = SymbolList(
        listId = 1, symbol = 'AAPL'
    )
    symbol_list_2_1 = SymbolList(
        listId = 2, symbol = 'META'
    )
    symbol_list_2_2 = SymbolList(
        listId = 2, symbol = 'TSLA'
    )
    symbol_list_2_3 = SymbolList(
        listId = 2, symbol = 'NFLX'
    )
    symbol_list_2_4 = SymbolList(
        listId = 2, symbol = 'AMZN'
    )

    db.session.add(symbol_list_1_1)
    db.session.add(symbol_list_1_2)
    db.session.add(symbol_list_1_3)
    db.session.add(symbol_list_1_4)
    db.session.add(symbol_list_2_1)
    db.session.add(symbol_list_2_2)
    db.session.add(symbol_list_2_3)
    db.session.add(symbol_list_2_4)
    db.session.commit()



def undo_symbollists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM symbollists"))

    db.session.commit()
