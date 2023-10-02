from flask import current_app, render_template
from . import mail
from flask_mail import Message
from threading import Thread

def send_email_async(app, msg):
    """
    create an application context that will handle
    the background thread for sending emails
    """
    with app.app_context():
        mail.send(msg)

def send_email(to, subject, template, **kwargs):
    """
    This is the function that will actually be sending our
    emails
    """
    app = current_app._get_current_object()
    msg = Message(app.config['MAIL_SUBJECT'] + subject, sender=app.config['MAIL_SENDER'], recipients=[to])
    msg.body = render_template(template+'.txt', **kwargs)
    msg.html = render_template(template+'.html', **kwargs)
    thr = Thread(target=send_email_async, args=[app, msg])
    thr.start()
    return thr
