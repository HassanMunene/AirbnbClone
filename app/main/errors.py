"""
here our main purpose is to handle errors and in this case
we will use the decorator .app_errorhandler instead of .errorhandler
this is because we want the errors to be handled globally and not to
be tied to a specific blueprint. May in the future we could handle the errors
specifically for each blueprint
"""
from flask import render_template, request, jsonify
from . import main

@main.app_errorhandler(403)
def forbidden(e):
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        response = jsonify({'error': 'forbidden'})
        response.status_code = 403
        return response
    return render_template('403.html'), 403


@main.app_errorhandler(404)
def page_not_found(e):
    """
    this beautiful function will handle
    situaions where the resource being searched is not found
    """
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        response = jsonify({'error': 'not found'})
        response.status_code = 404
        return response
    return render_template('404.html'), 404

@main.app_errorhandler(500)
def internal_server_error(e):
    """
    this fun will tell us when we have an error
    in our app and therefore the server cannot handle it
    """
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        response = jsonify({'error': 'internal server error'})
        response.status_code = 500
        return response
    return render_template('500.html'), 500

def forbidden(message):
    """
    This will handle the forbidden method error situation
    """

    response = jsonify({'error': 'forbidden', 'message': message})
    response.status_code = 403
    return response

def unauthorized(message):
    """
    This error will handle a situation where the user
    has not yet been authorized
    """
    repsonse = jsonify({'error': 'unauthorized', 'message': message})
    response.status_code = 401
    return response
