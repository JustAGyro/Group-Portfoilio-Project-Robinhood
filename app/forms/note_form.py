from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import Length, DataRequired
from app.models import Note

class NoteForm(FlaskForm):
    subject = StringField('subject', validators=[DataRequired(), Length(max=100)])
    entry = TextAreaField('entry', validators=[DataRequired(), Length(max=2000)])

