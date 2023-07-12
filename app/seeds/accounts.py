from app.models import db, Account, environment, SCHEMA
from sqlalchemy.sql import text

def seed_accounts():
    demos_account = Account(
        userId=1
    )
    marnies_account = Account(
        userId=2, balance=890.00
    )
    bobbies_account = Account(
        userId=3, balance=1999.00
    )
    db.session.add(demos_account)
    db.session.add(marnies_account)
    db.session.add(bobbies_account)
    db.session.commit()

def undo_accounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.accounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM accounts"))

    db.session.commit()
