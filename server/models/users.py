from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from config import db, bcrypt
import re

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False, unique=True)

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
        if not self.is_valid_password(password):
            raise ValueError('Password must be at least 8 characters, include a number, and a special character.')
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}, ID: {self.id}>'

    @staticmethod
    def is_valid_password(password):
        """Validate password: at least 8 characters, one digit, and one special character."""
        return (
            len(password) >= 8 and 
            any(char.isdigit() for char in password) and 
            re.search(r'[!@#$%^&*(),.?":{}|<>]', password)
        )

    @staticmethod
    def validate_user_data(data):
        """Performs validation on user input data."""
        errors = {}

        # Validate username
        if 'username' not in data or not isinstance(data['username'], str) or len(data['username']) < 3:
            errors['username'] = 'Username is required and must be at least 3 characters long.'

        # Validate email
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if 'email' not in data or not re.match(email_regex, data['email']):
            errors['email'] = 'A valid email address is required.'

        # Validate first name and last name
        if 'first_name' not in data or not isinstance(data['first_name'], str) or len(data['first_name']) < 1:
            errors['first_name'] = 'First name is required.'
        if 'last_name' not in data or not isinstance(data['last_name'], str) or len(data['last_name']) < 1:
            errors['last_name'] = 'Last name is required.'

        # Validate phone number (optional but must be valid if provided)
        phone_regex = r'^\+?1?\d{9,15}$'
        if 'phone_number' in data and data['phone_number'] and not re.match(phone_regex, data['phone_number']):
            errors['phone_number'] = 'Phone number must be a valid format.'

        if errors:
            raise ValueError(errors)
