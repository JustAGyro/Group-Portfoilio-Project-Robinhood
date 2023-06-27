from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, FloatField
from wtforms.validators import DataRequired

class TransactionForm(FlaskForm):
    transaction = SelectField('transaction', choices=['Buy','Sell'], validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    symbol = StringField('symbol', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
