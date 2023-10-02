"""
It is in this module that we will create fake users and
fake blog posts. This will help us add more features to the
application
"""

from random import randint
from sqlalchemy.exc import IntegrityError
from faker import Faker
from . import db
from .models import User, Post

def users(count=100):
    """
    This will create the fake users
    """
    fake = Faker()
    i = 0
    while i < count:
        u = User(
            username=fake.user_name(),
            email=fake.email(),
            password='password',
            confirmed=True,
            name=fake.name(),
            location=fake.city(),
            about_me=fake.text(),
            member_since=fake.past_date()
        )
        db.session.add(u)
        try:
            db.session.commit()
            i += 1
        except IntegrityError:
            db.session.rollback()

def posts(count=100):
    """
    This is now the fake posts we will create
    related to the users
    """
    fake = Faker()
    user_count = User.query.count()
    for i in range(count):
        u = User.query.offset(randint(0, user_count - 1)).first()
        p = Post(
            body=fake.text(),
            timestamp=fake.past_date(),
            author=u
        )
        db.session.add(p)
        db.session.commit()
