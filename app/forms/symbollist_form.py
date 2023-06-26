from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired
from app.models import SymbolList

class SymbolListForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired(), Length(max=5)])
