from flask import current_app, request, url_for, jsonify
from . import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, AnonymousUserMixin
from . import login_manager
from itsdangerous.serializer import Serializer
from datetime import datetime
import hashlib
from markdown import markdown
import bleach
from app.exceptions import ValidationError
import jwt
import os

class Permission:
    FOLLOW = 1
    COMMENT = 2
    WRITE = 4
    MODERATE = 8
    ADMIN = 16

class Follow(db.Model):
    """ This is an association table that is used to represent the many to
    many relationships between the users in terms of the followed and
    the user followers.
    """
    __tablename__ = 'follows'
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    #Role-----------------------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------------------------
class Role(db.Model):
    """
    Role model will be mapped onto the
    roles table by the ORM in the specified database
    """
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __init__(self, **kwargs):
        super(Role, self).__init__(**kwargs)
        if self.permissions is None:
            self.permissions = 0

    def has_permission(self, perm):
        """
        This func will perform the bitwise & operator
        to check if a certain permission is contained
        in the permissions attribute od Role
        will either return True or False
        """
        return self.permissions & perm == perm

    def add_permission(self, perm):
        """
        It will first check if the permissions attr has the specified
        perm if not then it will add the permission
        """
        if not self.has_permission(perm):
            self.permissions += perm

    def remove_permission(self, perm):
        """
        This will remove the specified permission if the perm
        is found in the permissions attr
        """
        if self.has_permission(perm):
            self.permissions -= perm
    def reset_permission(self):
        """
        reset the permissions back to 0
        """
        self.permissions = 0

    @staticmethod
    def insert_roles():
        roles = {
            'User': [Permission.FOLLOW, Permission.COMMENT, Permission.WRITE],
            'Moderator': [Permission.FOLLOW, Permission.COMMENT, Permission.WRITE, Permission.MODERATE],
            'Administrator': [Permission.FOLLOW, Permission.COMMENT, Permission.WRITE, Permission.MODERATE, Permission.ADMIN]
        }
        default_role = 'User'
        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.reset_permission()
            for perm in roles[r]:
                role.add_permission(perm)
            role.default = (role.name == default_role)
            db.session.add(role)
        db.session.commit()

#--------------------------------------------------------------------------------------------------------------------------------------------
#User--------------------------------------------------------------------------------------------------------------------------------------------
class User(UserMixin, db.Model):
    """
    User model will be mapped onto the
    users table by the orm in the database specified
    by 'FLASKY_CONFIG'
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64), unique=True, index=True)
    name = db.Column(db.String(64))
    location = db.Column(db.String(64))
    about_me = db.Column(db.Text())
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    password_hash = db.Column(db.String(128))
    confirmed = db.Column(db.Boolean, default=False)
    avatar_hash = db.Column(db.String(64))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    followed = db.relationship('Follow', foreign_keys=[Follow.follower_id], backref=db.backref('follower', lazy='joined'), lazy='dynamic', cascade='all, delete-orphan')
    followers = db.relationship('Follow', foreign_keys=[Follow.followed_id], backref=db.backref('followed', lazy='joined'), lazy='dynamic', cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.email is not None and self.avatar_hash is None:
            self.avatar_hash = self.gravatar_hash()

        if self.role is None:
            if self.email == current_app.config['FLASKY_ADMIN']:
                self.role = Role.query.filter_by(name='Administrator').first()
            if self.role is None:
                self.role = Role.query.filter_by(default=True).first()

    @property
    def password(self):
        """
        this is the getter method for the class
        attribute password, whenever you want to access
        the property this method is always called
        """
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        """
        This is the method that is usually called when you want
        to set a value to the attribute password
        """
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        """
        This will verify the password entered by a user aginst
        the stored password_hash using the a specified method from
        werkzeug.security module
        """
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self):
        """
        This method will generate an authentication token
        that will be used to verify the user in each request
        it uses JSON Web Tokens
        """
        token = jwt.encode(
            {'confirm': self.id},
            current_app.config['SECRET_KEY'],
            algorithm = "HS256"
        )
        #token = token.token
        return token

    @staticmethod
    def add_self_follows():
        for user in User.query.all():
            if not user.is_following(user):
                user.follow(user)
                db.session.add(user)
                db.session.commit()

    @staticmethod
    def verify_auth_token(token):
        """
        verify the token is genuine and not expired
        """
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return None
        return User.query.get(data['id'])

    def generate_email_confirm_token(self):
        """
        This class method will be used sign the the user_id which in our
        case is and return the signed token as a string
        """
        s = Serializer(current_app.config['SECRET_KEY'])
        return s.dumps({'confirm': self.id})

    def confirm_email(self, token):
        """
        This will take the signed token from the external source and then
        check if actually it is legit and can be loaded back to the content
        """
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('confirm') != self.id:
            return False
        self.confirmed = True
        db.session.add(self)
        return True

    def can(self, perm):
        """
        This will check whether a use has a certain permission
        """
        return self.role is not None and self.role.has_permission(perm)

    def is_administrator(self):
        """
        check whether a certain user is an admin by checking
        if they have the admin permission
        """
        return self.can(Permission.ADMIN)

    def ping(self):
        """
        This method will update the last seen time everytime a user
        accesses the application. so it keeps refreshing last_seen
        and to keep this method updating all the time we will use the
        before hook to call it from there
        """
        self.last_seen = datetime.utcnow()
        db.session.add(self)
        db.session.commit()

    def gravatar_hash(self):
        return hashlib.md5(self.email.lower().encode('utf-8')).hexdigest()

    def gravatar(self, size=100, default='identicon', rating='g'):
        """
        will generate some avator images for user profile using md5 hash
        """
        url = 'https://secure.gravatar.com/avatar'
        hash = self.avatar_hash or self.gravatar_hash()
        return f'{url}/{hash}?s={size}&d={default}&r={rating}'

    def is_following(self, user):
        """
        This helper method will return true if the current user is following the
        user that has been specified otherwise it will return False
        """
        if user.id is None:
            return False
        return self.followed.filter_by(followed_id=user.id).first() is not None

    def is_followed_by(self, user):
        """
        This helper method will return true if the current user is being followed
        the user specified in the func. it will return true otherwise false
        """
        if user.id is None:
            return False
        return self.followers.filter_by(follower_id=user.id).first() is not None

    def follow(self, user):
        """
        This is a helper method that will enable the current user to follow the
        user specified in the method if not already following
        """
        if not self.is_following(user):
            f = Follow(follower=self, followed=user)
            db.session.add(f)

    def unfollow(self, user):
        """
        This is a helper method that will enable the current user to unfollow the
        user specified
        """
        f = self.followed.filter_by(followed_id=user.id).first()
        if f:
            db.session.delete(f)

    @property
    def followed_posts(self):
        """
        This has been defined as a property to retrive all the post made by the
        followed users. So that the current user has an option to view post only by
        the users they are following
        it uses the join operation to carry out this operation
        """
        return Post.query.join(Follow, Follow.followed_id == Post.author_id).filter(Follow.follower_id == self.id)

    def to_json(self):
        """
        convert the internal data to a json format for transportation of the
        data
        """
        json_user = {
            'url': url_for('api.get_user', id=self.id),
            'username': self.username,
            'member_since': self.member_since,
            'last_seen': self.last_seen,
            'posts_url': url_for('api.get_user_posts', id=self.id),
            'followed_posts_url': url_for('api.get_user_followed_posts', id=self.id),
            'post_count': self.posts.count()
        }
        return json_user

#---------------------------------------------------------------------------------------------------------------------------------------------
@login_manager.user_loader
def load_user(user_id):
        """
        This method is method will be used to load a user
        from the db using the user_id
        """
        return User.query.get(int(user_id))

#--------------------------------------------------------------------------------------------------------------------------------------------
class AnonymousUser(AnonymousUserMixin):
    """
    This class will provide functionality for users that
    have not yet been authenticated or rather logged in
    """
    def can(self, permission):
        return False

    def is_administrator(self):
        return False

login_manager.anonymous_user = AnonymousUser

#---------------------------------------------------------------------------------------------------------------------------------------------Blog post model
#--------------------------------------------------------------------------------------------------------------------------------------------
class Post(db.Model):
    """
    new database model for representing blog posts
    keep in mind that it has 1-many rel with users as they are the authors
    """
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    body_html = db.Column(db.Text)
    comments = db.relationship('Comment', backref='post', lazy='dynamic')

    @staticmethod
    def on_changed_body(target, value, oldvalue, initiator):
        """
        This handler func will automate the conversion of markdown to HTML
        once a set event for the Post.body is register and then store the
        HTML in Post.body_html
        """
        allowed_tags = ['a', 'abbr', 'b', 'blockquote', 'code',
                        'em', 'i', 'li', 'ol', 'pre', 'strong', 'ul',
                        'h1', 'h2', 'h3', 'p']
        target.body_html = bleach.linkify(bleach.clean(markdown(value, output_format='html'), tags=allowed_tags, strip=True))

    def to_json(self):
        """
        retrive the posts and
        represent the post data in json format for transportation
        """
        json_post = {
            'url': url_for('api.get_post', id=self.id),
            'body': self.body,
            'body_html': self.body_html,
            'timestamp': self.timestamp,
            'author_url': url_for('api.get_user', id=self.author_id),
            'comments_url': url_for('api.get_post_comments', id=self.id),
            'comment_count': self.comments.count()
        }
        return json_post

    @staticmethod
    def from_json(json_post):
        body = json_post.get('body')
        if body is None or body == '':
            raise ValidationError('post does not have a body')
        return Post(body=body)

db.event.listen(Post.body, 'set', Post.on_changed_body)

#----------------------------------------------------------------------------------------
#comments
#-----------------------------------------------------------------------------------------
class Comment(db.Model):
    """
    This model will be mapped to a comment table that will hold the comments
    by different authors for different blog posts
    """
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    @staticmethod
    def on_changed_body(target, value, oldvalue, initator):
        """
        This func will be registered as an event listener and when the body changes
        it render markdown to html
        """
        allowed_tags = ['a', 'abbr', 'acronym', 'code', 'em', 'i', 'strong']
        target.body_html = bleach.linkify(bleach.clean(markdown(value, output_format='html'), tags=allowed_tags, strip=True))

    def to_json(self):
        json_comment = {
            'url': url_for('api.get_comment', id=self.id),
            'post_url': url_for('api.get_post', id=self.post_id),
            'body': self.body,
            'body_html': self.body_html,
            'timestamp': self.timestamp,
            'author_url': url_for('api.get_user', id=self.author_id)
        }
        return json_comment
    @staticmethod
    def from_json(json_comment):
        body = json_comment.get('body')
        if body is None or body == '':
            raise ValidationErro('comment does not have a body')
        return Comment(body=body)

db.event.listen(Comment.body, 'set', Comment.on_changed_body)
