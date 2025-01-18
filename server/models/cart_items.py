from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db

class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    num_cookies = db.Column(db.Integer, default=1)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'))

    order = db.relationship('Order', back_populates='cart_items')
    cookie = db.relationship('Cookie', back_populates='cart_items')

    serialize_rules = ('-order.cart_items',)

    def __repr__(self):
        return f'<Cart Item {self.id}, {self.num_cookies}>' + \
        f'<Cookie id: {self.cookie_id}, Order id: {self.order_id}>'