from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import NoteSymbol, Note

note_routes = Blueprint('notes', __name__)
