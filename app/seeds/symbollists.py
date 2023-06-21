from app.models import db, SymbolList, environment, SCHEMA
from sqlalchemy.sql import text

def seed_symbolists():
    symbol_list_1_1 = SymbolList(
        listId = 1, symbol = 'AAL'
    )
    symbol_list_1_2 = SymbolList(
        listId = 1, symbol = 'AAMC'
    )
    symbol_list_1_3 = SymbolList(
        listId = 1, symbol = 'AAL'
    )
    symbol_list_1_4 = SymbolList(
        listId = 1, symbol = 'AAME'
    )
    symbol_list_2_1 = SymbolList(
        listId = 1, symbol = 'AAME'
    )
    symbol_list_2_2 = SymbolList(
        listId = 1, symbol = 'ACQA'
    )
    symbol_list_2_3 = SymbolList(
        listId = 1, symbol = 'ACB'
    )
    symbol_list_2_4 = SymbolList(
        listId = 1, symbol = 'ACCD'
    )
    symbol_list_3_1 = SymbolList(
        listId = 1, symbol = 'ACCD'
    )
    symbol_list_3_2 = SymbolList(
        listId = 1, symbol = 'ACI'
    )
    symbol_list_3_3 = SymbolList(
        listId = 1, symbol = 'ACMR'
    )
    symbol_list_3_4 = SymbolList(
        listId = 1, symbol = 'ACN'
    )

    db.session.add(symbol_list_1_1)
    db.session.add(symbol_list_1_2)
    db.session.add(symbol_list_1_3)
    db.session.add(symbol_list_1_4)
    db.session.add(symbol_list_2_1)
    db.session.add(symbol_list_2_2)
    db.session.add(symbol_list_2_3)
    db.session.add(symbol_list_2_4)
    db.session.add(symbol_list_3_1)
    db.session.add(symbol_list_3_2)
    db.session.add(symbol_list_3_3)
    db.session.add(symbol_list_3_4)
    db.session.commit()



def undo_symbolists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM symbolists"))
        
    db.session.commit()




    
    