"""
This module will specifically handle the routes concerned
with authentication
"""
from flask import render_template, request, url_for, flash, redirect
from . import auth
from .forms import LoginForm, RegistrationForm
from .. import db
from ..models import User
from ..emails import send_email
from flask_login import login_user, login_required, current_user, logout_user

@auth.route('/login', methods=['GET', 'POST'])
def login():
    """
    will handle the /login route
    """
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('main.index')
            return redirect(next)
        flash("Invalid Email or Password")
    return render_template('auth/login.html', form=form)

@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    """
    log the user out
    """
    logout_user()
    flash("You have been logged out")
    return redirect(url_for('main.index'))

@auth.route('/register', methods=['GET', 'POST'])
def register():
    """
    This route will handle the process of regisration
    for user
    """
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(email=form.email.data,
                    username=form.username.data,
                    password=form.password.data
                    )
        db.session.add(user)
        db.session.commit()
        token = user.generate_email_confirm_token()
        send_email(user.email, 'Confirm Your Account', 'auth/email/confirm', user=user, token=token)
        flash('A confirmation email has been sent to you by email.')
        return redirect(url_for('main.index'))
    return render_template('auth/register.html', form=form)

@auth.route('/confirm/<token>')
@login_required
def confirm(token):
    """
    Will be used to confirm the email.For email validation
    """
    if current_user.confirmed:
        return redirect(url_for('main.index'))
    if current_user.confirm_email(token):
        db.session.commit()
        flash("Your account has been confirmed. Thanks!")
    else:
        flash('The confirmation link is invalid or has expired.')
    return redirect(url_for('main.index'))

@auth.before_app_request
def before_request():
    """
    this request hook will intercept request before they have been processed
    by their view functions to check if the user carrying out the request
    has his/her email confirmed. If the email is not confirmed and the
    request is not heading to the auth blueprint and the static endpoint
    then the request is directed to a different route to ensure that the
    user is confirmed first
    """
    if current_user.is_authenticated:
        current_user.ping()
        if not current_user.confirmed \
                and request.blueprint != 'auth' \
                and request.endpoint != 'static':
            return redirect(url_for('auth.unconfirmed'))

@auth.route('/unconfirmed')
def unconfirmed():
    """
    handle the situation where the user has not confirmed his/her
    email and so they have to be given a way to confirm
    """
    if current_user.is_anonymous or current_user.confirmed:
        return redirect(url_for('main.index'))
    return render_template('auth/unconfirmed.html')

@auth.route('/confirm')
@login_required
def resend_confirmation():
    """
    This will be the view function that will be invoked to resend the email
    for confirmation
    """
    token = current_user.generate_email_confirm_token()
    send_email(current_user.email, 'confirm Your account', 'auth/email/confirm', user=current_user, token=token)
    flash('A new confirmation email has been sent to you by email.')
    return redirect(url_for('main.index'))

@auth.route('/change_password')
@login_required
def change_password():
    """
    handle the logic of changing password
    """
    return render_template('auth/change_password.html')

@auth.route('/change_email')
@login_required
def change_email():
    """
    handle the logic of changing email
    """
    return render_template('auth/change_email.html')
