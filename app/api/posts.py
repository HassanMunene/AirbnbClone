"""
This module will contains all the api routes that will
be used to retrieve post and the related resources of the posts
"""
from flask import jsonify, request, g, url_for, current_app
from .. import db
from ..models import Post, Permission
from . import api
from .decorators import permission_required
from .errors import forbidden


@api.route('/posts/')
def get_posts():
    """
    retreive all the posts in the application basically the ones stored in the database
    """
    page = request.args.get('page', 1, type=int)
    pagination = Post.query.paginate(page=page, error_out=False)
    posts = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_posts', page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_posts', page=page+1)
    return jsonify({
        'post': [post.to_json() for post in posts],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })

@api.route('/posts/<int:id>')
def get_post(id):
    """
    Retrieve a specific post from the app based on its id
    """
    post = Post.query_or_404(id)
    return jsonify(post.to_json())

@api.route('/posts/', methods=['POST'])
@permission_required(Permission.WRITE)
def new_post():
    """
    insert a new post to the application
    """
    post = Post.from_json(request.json)
    post.author = g.current_user
    db.sesssion.add(post)
    db.session.commit()
    return jsonify(post.to_json()), 201, \
        {'location': url_for('api.get_post', id=post.id)}

@api.route('/posts/<int:id>', methods=['PUT'])
@permission_required(Permission.WRITE)
def edit_post(id):
    """
    modify a specific post using the put method
    """
    post = Post.query.get_or_404(404)
    if g.current_user != post.author and \
            not g.current_user.can(Permission.ADMIN):
        return forbidden('Insufficient permissions')
    post.body = request.json.get('body', post.body)
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_json())
