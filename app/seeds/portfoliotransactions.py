from app.models import db, PortfolioTransaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_portfoliotransactions():
    #User 1 - Demo
    t1 = PortfolioTransaction(
        userId=1, transaction='buy', quantity=10, price=95.44,date=date.fromisoformat("2022-11-29"), symbol='GOOG'
    )
    t2 = PortfolioTransaction(
    userId=1, transaction='buy', quantity=10, price=121.82,date=date.fromisoformat("2022-12-29"), symbol='TSLA'
    )
    t3 = PortfolioTransaction(
    userId=1, transaction='buy', quantity=10, price=90.30,date=date.fromisoformat("2023-02-26"), symbol='GOOG'
    )
    t4 = PortfolioTransaction(
    userId=1, transaction='sell', quantity=5, price=183.25, date=date.fromisoformat("2023-03-20"), symbol='TSLA'
    )
    t5 = PortfolioTransaction(
    userId=1, transaction='sell', quantity=5, price=101.90, date=date.fromisoformat("2023-03-29"),symbol='GOOG'
    )

    #User 2 - Marnie
    t6 = PortfolioTransaction(
    userId=2, transaction='buy', quantity=10, price=100, symbol='ABC'
    )
    t7 = PortfolioTransaction(
    userId=2, transaction='buy', quantity=10, price=100, symbol='DEF'
    )
    t8 = PortfolioTransaction(
    userId=2, transaction='buy', quantity=10, price=100, symbol='XYZ'
    )
    t9 = PortfolioTransaction(
    userId=2, transaction='sell', quantity=5, price=120, symbol='ABC'
    )
    t10 = PortfolioTransaction(
    userId=2, transaction='sell', quantity=5, price=150, symbol='DEF'
    )

    #User 3 - Bobbie
    t11 = PortfolioTransaction(
    userId=3, transaction='buy', quantity=10, price=100, symbol='ABC'
    )
    t12 = PortfolioTransaction(
    userId=3, transaction='buy', quantity=10, price=100, symbol='DEF'
    )
    t13 = PortfolioTransaction(
    userId=3, transaction='buy', quantity=10, price=100, symbol='XYZ'
    )
    t14 = PortfolioTransaction(
    userId=3, transaction='sell', quantity=5, price=120, symbol='ABC'
    )
    t15 = PortfolioTransaction(
    userId=3, transaction='sell', quantity=5, price=150, symbol='DEF'
    )

    #Seed database
    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.add(t10)
    db.session.add(t11)
    db.session.add(t12)
    db.session.add(t13)
    db.session.add(t14)
    db.session.add(t15)
    db.session.commit()

def undo_portfoliotransaction():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfoliotransactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfoliotransactions"))
    db.session.commit()
