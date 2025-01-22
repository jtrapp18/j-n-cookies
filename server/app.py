#!/usr/bin/env python3

from models import CartItem, Cookie, Favorite, Order, User, Review
from config import app, db, api
# from flask_migrate import Migrate
from flask import request, jsonify, session, make_response
from flask_restful import  Resource
# import os

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') \
    and request.endpoint in ['orders', 'cart_items']:
        return {'error': 'Unauthorized'}, 401
    
class ClearSession(Resource):

    def delete(self):
    
        session['user_id'] = None

        return {}, 204

class Signup(Resource):

    def post(self):
        json = request.get_json()
        user = User(
            username=json['username']
        )
        user.password_hash = json['password']
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

class CheckSession(Resource):

    def get(self):
        
        user_id = session.get('user_id', 0)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 204

class Login(Resource):

    def post(self):
        json = request.get_json()

        username = json['username']
        user = User.query.filter_by(username=username).first()

        password = json['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):
    
    def delete(self):
        session['user_id'] = None
        return {}, 204

class Orders(Resource):

    def get(self):
        user_id = session['user_id']

        orders = [order.to_dict() for order in Order.query.filter_by(user_id=user_id)]
        return make_response(jsonify(orders), 200)
    
    def post(self):
        data = request.json()
        new_order = Order(
            purchase_complete=data['purchase_complete'],
            order_date=data['order_date'],
            delivery_date=data['delivery_date'],
            order_total=data['order_total'],
            user_id=data['user_id']
        )
        db.session.add(new_order)
        db.session.commit()
        return make_response(jsonify(new_order.to_dict()), 201)

class OrderById(Resource):
    def get(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return make_response(jsonify({'message': 'Order not found'}), 404)
        return make_response(jsonify(order.to_dict()), 200)
    
    def patch(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return make_response(jsonify({'message': 'Order not found'}), 404)
        data = request.get_json()

        order.purchase_complete = data.get('purchase_complete', order.purchase_complete)
        order.order_date = data.get('order_date', order.order_date)
        order.delivery_date = data.get('delivery_date', order.delivery_date)
        order.order_total = data.get('order_total', order.order_total)
        db.session.commit()
        return make_response(jsonify(order.to_dict()), 200)
    
    def delete(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return make_response(jsonify({'message': 'Order not found'}), 404)
        db.session.delete(order)
        db.session.commit()
        return make_response('', 204)

class Cookies(Resource):

    def get(self):
        cookies = [cookie.to_dict() for cookie in Cookie.query.all()]
        return make_response(jsonify(cookies), 200)
        
class CookieById(Resource):

    def get(self, cookie_id):
        cookie = Cookie.query.get(cookie_id)
        if not cookie:
            return make_response(jsonify({'message': 'Cookie not found'}), 404)
        return make_response(jsonify(cookie.to_dict()), 200)

class CartItems(Resource):

    def get(self):
        cart_items = [cart_item.to_dict() for cart_item in CartItem.query.all()]
        return make_response(jsonify(cart_items), 200)
    
    def post(self):
        data = request.get_json()
        new_cart_item = CartItem(
            num_cookies=data['num_cookies'],
            order_id=data['order_id'],
            cookie_id=data['cookie_id']
        )
        db.session.add(new_cart_item)
        db.session.commit()
        return make_response(jsonify(new_cart_item.to_dict()), 201)
    
class CartItemById(Resource):

    def patch(self, item_id):
        cart_item = CartItem.query.get(item_id)
        if not cart_item:
            return make_response(jsonify({'message': 'Cart item not found'}), 404)
        data = request.get_json()
        cart_item.num_cookies = data.get('num_cookies', cart_item.num_cookies)
        db.session.commit()
        return make_response(jsonify(cart_item.to_dict()), 200)
    
    def delete(self, item_id):
        cart_item = CartItem.query.get(item_id)
        if not cart_item:
            return make_response(jsonify({'message': 'Cart item not found'}), 404)
        cart_item_dict = cart_item.to_dict()
        db.session.delete(cart_item)
        db.session.commit()
        return make_response({}, 204)


class Favorites(Resource):

    def post(self):
        data = request.get_json()
        new_favorite = Favorite(
            user_id=data['user_id'],
            cookie_id=data['cookie_id']
        )
        db.session.add(new_favorite)
        db.session.commit()
        return make_response(jsonify(new_favorite.to_dict()), 201)

class FavoriteById(Resource):

    def delete(self, favorite_id):
        favorite = Favorite.query.get(favorite_id)
        if not favorite:
            return make_response(jsonify({'message': 'Favorite not found'}), 404)
        db.session.delete(favorite)
        db.session.commit()
        return make_response('', 204)
             

class Reviews(Resource):

    def post(self):
        data = request.get_json()
        new_review = Review(
            rating=data['rating'],
            review_text=data['review_text'],
            user_id=data['user_id'],
            cookie_id=data['cookie_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(jsonify(new_review.to_dict()), 201)

class ReviewsByCookie(Resource):

    def get(self, cookie_id):
        reviews = [review.to_dict() for review in Review.query.filter_by(cookie_id=cookie_id).all()]
        return make_response(jsonify(reviews), 200)

class ReviewById(Resource):

    def patch(self, item_id):
        review = Review.query.get(item_id)
        if not review:
            return make_response(jsonify({'message': 'Review not found'}), 404)
        
        data = request.get_json()

        for attr in data:
            setattr(review, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(review.to_dict()), 200)

    def delete(self, item_id):
        review = Review.query.get(item_id)
        if not review:
            return make_response(jsonify({'message': 'Review not found'}), 404)
        db.session.delete(review)
        db.session.commit()
        return make_response('', 204)

class UserById(Resource):

    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({'message': 'User not found'}), 404)
        return make_response(jsonify(user.to_dict()), 200)
    
    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({'message': 'User not found'}), 404)
        
        data = request.get_json()

        for attr in data:
            setattr(user, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)

api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Orders, '/orders', endpoint='orders')
api.add_resource(OrderById, '/orders/<int:order_id>')
api.add_resource(Cookies, '/cookies')
api.add_resource(CookieById, '/cookies/<int:cookie_id>')
api.add_resource(CartItems, '/cart_items', endpoint='cart_items')
api.add_resource(CartItemById, '/cart_items/<int:item_id>')
api.add_resource(Favorites, '/favorites')
api.add_resource(FavoriteById, '/favorites/<int:favorite_id>')
api.add_resource(Reviews, '/reviews')  
api.add_resource(ReviewsByCookie, '/reviews/cookie/<int:cookie_id>')  
api.add_resource(UserById, '/users/<int:user_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
