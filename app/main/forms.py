from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, SelectField
from wtforms.validators import DataRequired, Length, Email
from ..models import Role, User
from flask_pagedown.fields import PageDownField

class NameForm(FlaskForm):
    """
    This class will be rendered to present the
    with a form to fill in
    """
    name = StringField("What's you name buddy", validators=[DataRequired()])
    submit = SubmitField('Submit')

class EditProfileForm(FlaskForm):
    """
    From this form the user will be able to edit their profile
    """
    name = StringField('Real name', validators=[Length(0, 64)])
    location = StringField('Location', validators=[Length(0, 64)])
    about_me = TextAreaField('About me')
    submit = SubmitField('Submit')

class EditProfileAdminForm(FlaskForm):
    """
    This is the form that the Administrator will use to
    edit everything about the user.
    From here the Admin can literally change everything on the
    user details
    """
    email = StringField('Email', validators=[DataRequired(), Length(0, 64), Email()])
    username = StringField('Username', validators=[DataRequired(), Length(0, 64)])
    confirmed = BooleanField('Confirmed')
    role = SelectField('Role', coerce=int)
    name = StringField('Real name', validators=[Length(0, 64)])
    location = StringField('Location', validators=[Length(0, 64)])
    about_me = TextAreaField('About me')
    submit = SubmitField('Submit')

    def __init__(self, user, *args, **kwargs):
        super(EditProfileAdminForm, self).__init__(*args, **kwargs)
        self.role.choices = [(role.id, role.name)
                             for role in Role.query.order_by(Role.name).all()]
        self.user = user

    def validate_email(self, field):
        """
        ensure that the email has not already been registered
        """
        if field.data != self.user.email and\
                User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered.')

    def validate_username(self, field):
        """
        ensure that the username is not used by another user
        in the application
        """
        if field.data != self.user.username and\
                User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')

class PostForm(FlaskForm):
    """
    It is from here that the author will be able to
    post a blog by writing something and then posting it.
    in the body we will use PageDownField instead of TextAreaField to make
    use of the markdown
    """
    body = PageDownField("What's on your mind?", validators=[DataRequired()])
    submit = SubmitField('Post')

class CommentForm(FlaskForm):
    """
    From here the user will be able to comment about a specific post
    """
    body = StringField('', validators=[DataRequired()])
    submit = SubmitField('Comment')
