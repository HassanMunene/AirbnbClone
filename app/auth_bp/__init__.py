"""
this is the constructor of the authentication blueprint
here we define the auth blueprint and import routes from views.py
"""
from flask import Blueprint

auth = Blueprint('auth', __name__)
from . import views
