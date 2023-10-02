from flask import session, render_template, make_response, url_for, redirect, current_app, flash, abort, request
from . import main
from ..models import User, Role, Permission, Post, Comment
from .forms import EditProfileForm, EditProfileAdminForm, PostForm, CommentForm
from flask_login import current_user, login_required
from .. import db
from ..decorators import admin_required, permission_required

@main.route('/', methods=['GET', 'POST'])
def index():
    """
    This view function will handle the root route
    for the app.
    """
    form = PostForm()
    if current_user.can(Permission.WRITE) and form.validate_on_submit():
        post = Post()
        post.body = form.body.data
        post.author = current_user._get_current_object()
        db.session.add(post)
        db.session.commit()
        return redirect(url_for('main.index'))

    items_per_page = 15
    page = request.args.get('page', 1, type=int)
    show_followed = False
    if current_user.is_authenticated:
        show_followed = bool(request.cookies.get('show_followed', ''))
    if show_followed:
        query = current_user.followed_posts
    else:
        query = Post.query

    pagination = query.order_by(Post.timestamp.desc()).paginate(page=page, per_page=items_per_page, error_out=False)
    posts = pagination.items
    return render_template('index.html', form=form, posts=posts, show_followed=show_followed, pagination=pagination)

@main.route('/user/<username>', methods=['GET'])
def user(username):
    """
    this view func will handle the route to see a specific
    user page eg http://<host>/user/john
    it will show the profile page
    it will also show the posts made by the user.
    """
    user = User.query.filter_by(username=username).first()
    if user is None:
        abort(404)

    posts = user.posts.order_by(Post.timestamp.desc()).all()
    return render_template('user.html', user=user, posts=posts)

@main.route('/edit-profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    """
    handle the process of users editing their profiles
    """
    form = EditProfileForm()
    if form.validate_on_submit():
        current_user.name = form.name.data
        current_user.location = form.location.data
        current_user.about_me = form.about_me.data
        db.session.add(current_user)
        db.session.commit()
        flash('Your profile has been updated')
        return redirect(url_for('main.user', username=current_user.username))
    form.name.data = current_user.name
    form.location.data = current_user.location
    form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', form=form)

@main.route('/edit-profile/<int:id>', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_profile_admin(id):
    """
    the view function that will handle the process of admins
    editing the profiles of users
    """
    user = User.query.get_or_404(id)
    form = EditProfileAdminForm(user=user)
    if form.validate_on_submit():
        user.email = form.email.data
        user.username = form.username.data
        user.confirmed = form.confirmed.data
        user.role = Role.query.get(form.role.data)
        user.name = form.name.data
        user.location = form.location.data
        user.about_me = form.about_me.data
        db.session.add(user)
        db.session.commit()
        flash('The profile has been updated.')
        return redirect(url_for('main.user', username=user.username))
    form.email.data = user.email
    form.username.data = user.username
    form.confirmed.data = user.confirmed
    form.role.data = user.role_id
    form.name.data = user.name
    form.location.data = user.location
    form.about_me.data = user.about_me
    return render_template('edit_profile.html', form=form, user=user)

@main.route('/post/<int:id>', methods=['GET', 'POST'])
def post(id):
    """
    This route will handle a specific url of a post.
    Basically in our app each post will have a specific
    unique url based on its id
    """
    post = Post.query.get_or_404(id)
    form = CommentForm()
    if form.validate_on_submit():
        comment = Comment(body=form.body.data,
                          post=post,
                          author=current_user)
        db.session.add(comment)
        db.session.commit()
        flash('Your comment has been published.')
        return redirect(url_for('main.post', id=post.id, page=-1))
    page = request.args.get('page', '1', type=int)
    page = int(page)
    if page == -1:
        page = int((post.comments.count() - 1) // 20 + 1)
    pagination = post.comments.order_by(Comment.timestamp.asc()).paginate(page=page, error_out=False)
    comments = pagination.items
    return render_template('post.html', posts=[post], form=form, comments=comments, pagination=pagination)

@main.route('/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit(id):
    """
    This route will enable both the user and the administrator to
    edit a post
    """
    post = Post.query.get_or_404(id)
    if current_user != post.author and\
            not current_user.can(Permission.ADMIN):
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.body = form.body.data
        db.session.add(post)
        db.session.commit()
        flash('The post has been updated.')
        return redirect(url_for('main.post', id=post.id))
    form.body.data = post.body
    return render_template('edit_post.html', form=form)

@main.route('/follow/<username>')
@login_required
@permission_required(Permission.FOLLOW)
def follow(username):
    """
    This route will enable the currently logged in user to follow another user
    by viewing the other users profile
    it loads the requested user, verifies that it is valid and that it isn't
    already followed by the logged in user, then calls the follow() helper func
    to establish the link
    """
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('main.index'))
    if current_user.is_following(user):
        flash('You are already following the user.')
        return redirect(url_for('main.user', username=username))
    current_user.follow(user)
    db.session.commit()
    flash('You are now following {}'.format(username))
    return redirect(url_for('main.user', username=username))

@main.route('/unfollow/<username>')
@login_required
@permission_required(Permission.FOLLOW)
def unfollow(username):
    """
    This route will handle the opposite of following
    """
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect('main.index')
    if not current_user.is_following(user):
        flash('Your are not following this user.')
        return redirect(url_for('main.user', username=username))
    current_user.unfollow(user)
    db.session.commit()
    flash('You are now not following {} anymore.'.format(username))
    return redirect(url_for('main.user', username=username))

@main.route('/followers/<username>')
def followers(username):
    """
    This route will be invoked when a user clicks another users follower count on
    the profile page
    """
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('main.index'))
    page = request.args.get('page', 1, type=int)
    pagination = user.followers.paginate(page=page, error_out=False)
    follows = [{'user': item.follower, 'timestamp': item.timestamp}
               for item in pagination.items]
    return render_template('followers.html', user=user, title="Followers of ", endpoint='main.followers', pagination=pagination, follows=follows)

@main.route('/followed_by/<username>')
def followed_by(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('main.index'))
    page = request.args.get('page', 1, type=int)
    pagination = user.followed.paginate(page=page, error_out=False)
    follows = [{'user': item.followed, 'timestamp': item.timestamp}
               for item in pagination.items]
    return render_template('followers.html', user=user, title="Followed by", endpoint='main.followed_by', pagination=pagination, follows=follows)

@main.route('/all')
@login_required
def show_all():
    """
    This route will return a response object that that sets an empty string
    to the cookie show_followed, this way the app will show all the posts
    """
    resp = make_response(redirect(url_for('main.index')))
    resp.set_cookie('show_followed', '', max_age=30*24*60*60)
    return resp

@main.route('/followed')
@login_required
def show_followed():
    """
    This route will make a response that redirect the client to the main.index
    and tha response too sets the cookie, show_followed to true
    """
    resp = make_response(redirect(url_for('main.index')))
    resp.set_cookie('show_followed', '1', max_age=30*24*60*60)
    return resp
