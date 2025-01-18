from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from ..config import db

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    purchase_complete = db.Column(db.Integer, default=False)
    order_date = db.Column(db.Date)
    delivery_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Order {self.id}, {self.order_date}>' + \
            f'<For User {self.user_id}>'