"""
This module will contain custom decorators that will
be used in various parts of the applications to provide
more functionality to different methods
At the moment we will have two main decaorators
1 permission_required(permission) - This will control access to
a certain view function to users with a specific permission
2 admin_required() this will specifically restrict a view function to an Administrator
"""
from functools import wraps
from flask import abort
from .models import Permission
from flask_login import current_user

def permission_required(permission):
    """
    this decorator will ensure that the user satifies a certain
    permission to carry the activity in the app
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.can(permission):
                abort(403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator


def admin_required(f):
    """
    This decorater will ensure that the user carrying the
    activity is infact an Administrator
    """
    return permission_required(Permission.ADMIN)(f)
