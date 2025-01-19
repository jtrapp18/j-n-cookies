from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    address = db.Column(db.String)
    phone_number = db.Column(db.String)
    email = db.Column(db.String)

    favorites = db.relationship(
        'Favorite', back_populates='user', cascade='all, delete-orphan')
    
    orders = db.relationship(
        'Order', back_populates='user', cascade='all, delete-orphan')

    reviews = db.relationship(
        'Review', back_populates='user', cascade='all, delete-orphan')
    
    serialize_rules = ('-favorites.user', '-favorites.cookie', '-order.cart_items', 
                       '-order.user', '-cookie.cart_items', '-cookie.favorites', 
                       '-cookie.reviews', '-reviews.cookie', '-reviews.user')
    
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}, ID: {self.id}>'
