from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    purchase_complete = db.Column(db.Boolean, default=False)
    order_date = db.Column(db.Date)
    delivery_date = db.Column(db.Date)
    order_total = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='orders')

    cart_items = db.relationship(
        'CartItem', back_populates='order', cascade='all, delete-orphan')

    serialize_rules = ('-user', '-cart_items.order', '-cart_items')

    def __repr__(self):
        return f'<Order {self.id}, {self.order_date}>' + \
            f'<For User {self.user_id}>'