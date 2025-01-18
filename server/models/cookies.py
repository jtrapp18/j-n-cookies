from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from ..config import db

class Cookie(db.Model, SerializerMixin):
    __tablename__ = 'cookies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    is_vegan = db.Column(db.Boolean)
    is_gluten_free = db.Column(db.Boolean)
    has_nuts = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Cookie {self.id}, {self.name}, {self.price}>'