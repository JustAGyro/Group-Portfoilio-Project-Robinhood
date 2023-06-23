from app.models import db, WatchList, environment, SCHEMA
from sqlalchemy.sql import text
def seed_watchlists():
    watchlist_usr1 = WatchList(name = 'watch_usr_1', userId = 1)
    watchlist_usr2 = WatchList(name = 'watch_usr_2', userId = 2)

    watchlist_usr3 = WatchList(name = 'watch_usr_3', userId = 3)

    db.session.add(watchlist_usr1)
    db.session.add(watchlist_usr2)
    db.session.add(watchlist_usr3)
    db.session.commit()


def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
