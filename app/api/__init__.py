"""
declaring the api blueprint
This is the package that will be used to handle the apis
for this application . it is treated as a normal blueprint
"""
from flask import Blueprint

api = Blueprint('api', __name__)

from . import  authentication, posts, users, comments, errors
