from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db

class Cookie(db.Model, SerializerMixin):
    __tablename__ = 'cookies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    price = db.Column(db.Float)
    is_vegan = db.Column(db.Boolean)
    is_gluten_free = db.Column(db.Boolean)
    has_nuts = db.Column(db.Boolean)
    frosting = db.Column(db.String)

    favorites = db.relationship(
        'Favorite', back_populates='cookie', cascade='all, delete-orphan')
    
    cart_items = db.relationship(
        'CartItem', back_populates='cookie', cascade='all, delete-orphan')
    
    reviews = db.relationship(
        'Review', back_populates='cookie', cascade='all, delete-orphan')
    
    serialize_rules = ('-favorites.cookie', '-cart_items.cookie', '-reviews.cookie')

    def __repr__(self):
        return f'<Cookie {self.id}, {self.name}, {self.price}>'