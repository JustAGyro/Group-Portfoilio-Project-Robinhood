from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes
from .accounts import seed_accounts, undo_accounts
from .notesymbols import seed_notessymbols, undo_notesymbols
from .portfoliotransactions import seed_portfoliotransactions, undo_portfoliotransaction
from .symbollists import seed_symbolists, undo_symbollists
from .watchlists import seed_watchlists, undo_watchlists


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_notes()
    seed_accounts()
    seed_notessymbols()
    seed_portfoliotransactions()
    seed_watchlists()
    seed_symbolists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notes()
    undo_accounts()
    undo_notesymbols()
    undo_portfoliotransaction()
    undo_symbollists()
    undo_watchlists()
    # Add other undo functions here
