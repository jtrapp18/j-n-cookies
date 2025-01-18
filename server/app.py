#!/usr/bin/env python3

from models import CartItem, Cookie, Favorite, Order, User, Review
from config import app, db, api

from flask import request, session
from flask_restful import Resource

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
        
        user_id = session['user_id']
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

api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
