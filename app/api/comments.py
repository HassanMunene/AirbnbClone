from flask import jsonify, url_for, g, request, current_app
from .. import db
from ..models import Post, Comment, Permission
from . import api
from .decorators import permission_required

@api.route('/comments/')
def get_comments():
    """
    Retrieve all the comments in the application
    """
    page = request.args.get('page', 1, type=int)
    pagination = Comment.query.order_by(Comment.timestamp.desc()).paginate(page, error_out=False)
    comments = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_comments', page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_comment', page=page+1)
    return jsonify({
        'comments': [comment.to_json() for comment in comments],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })

@api.route('/comments/<int:id>')
def get_comment(id):
    """
    retrieve a specified comment this will be filtered by the specified comment id
    """
    comment = Comment.query.get_or_404(id)
    return jsonify(comment.to_json())


@api.route('/posts/<int:id>/comments')
def get_post_comments(id):
    """
    retrive comments of a certain post in the application
    """
    post = Post.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    pagination = post.comments.order_by(Comment.timestamp.asc()).paginate(page=page, error_out=False)
    comments = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_post_comments', id=id, page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_post_comments', id=id, page=page+1)
    return jsonify({
        'comments': [comment.to_json() for comment in comments],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })

@api.route('/posts/<int:id>/comments/', methods=['POST'])
@permission_required(Permission.WRITE)
def new_post_comment(id):
    """
    added a new comment for a paricular post using app api
    """
    post = Post.query.get_or_404(404)
    comment = Comment.from_json(request.json)
    comment.author = g.current_user
    comment.post = post
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment_to_json()), 201, \
        {'location': url_for('api.get_comment', id=comment.id)}
