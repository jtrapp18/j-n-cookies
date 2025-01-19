from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    review_title = db.Column(db.String)
    review_body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'))

    user = db.relationship('User', back_populates='reviews')
    cookie = db.relationship('Cookie', back_populates='reviews')

    serialize_rules = ('-user.orders', '-user.favorites', '-user.reviews', 
                       '-cookie.cart_items', '-cookie.favorites', '-cookie.reviews')

    def __repr__(self):
        return f'<Review {self.id}, {self.rating}>' + \
            f'<Cookie id: {self.cookie_id}, User id: {self.user_id}>'