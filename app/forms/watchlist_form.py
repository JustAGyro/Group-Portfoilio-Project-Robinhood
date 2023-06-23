from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired
from app.models import WatchList

class WatchListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
