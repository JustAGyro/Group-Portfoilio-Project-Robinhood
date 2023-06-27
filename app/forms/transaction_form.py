from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired

class TransactionForm(FlaskForm):
    transaction = SelectField('transaction', choices=['Buy','Sell'], validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
