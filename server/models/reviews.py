from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review_title = db.Column(db.String(255), nullable=False)
    review_body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'), nullable=False)

    user = db.relationship('User', back_populates='reviews')
    cookie = db.relationship('Cookie', back_populates='reviews')

    serialize_rules = ('-user.orders', '-user.favorites', '-user.reviews', 
                       '-cookie.cart_items', '-cookie.favorites')

    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
    )

    def __repr__(self):
        return f'<Review {self.id}, {self.rating}>' + \
               f'<Cookie id: {self.cookie_id}, User id: {self.user_id}>'

    @hybrid_property
    def short_review(self):
        """Returns a short version of the review body (first 50 characters)."""
        return self.review_body[:50] + '...' if len(self.review_body) > 50 else self.review_body

    @staticmethod
    def validate_review_data(data):
        """Performs manual validation on review data before insertion."""
        errors = {}
        if 'rating' not in data or not (1 <= data['rating'] <= 5):
            errors['rating'] = 'Rating must be between 1 and 5.'
        if 'review_title' not in data or not data['review_title'].strip():
            errors['review_title'] = 'Review title is required.'
        if 'review_body' not in data or len(data['review_body'].strip()) < 1:
            errors['review_body'] = 'Review body must be at least 1 character long.'
        if errors:
            raise ValueError(errors)