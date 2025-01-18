#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from config import db, app
# CartItem, Cookie, Favorite, Order, User

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    CartItem.query.delete()
    Cookie.query.delete()
    Favorite.query.delete()
    Order.query.delete()
    User.query.delete()

    fake = Faker()

    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(20):
        
        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Seeding Complete.")
