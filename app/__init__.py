"""
This is the module where the application is bone and comes to life
it is in this module that we are going to create an instance of an application
configure that instance, initialize some extensions that the instance will require to
function properly
we will use a factory function called create_app() that will inturn return the application once created
"""
from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_mail import Mail
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from config import config # the file that contains the configurations instead of configuring the app here directly
from flask_login import LoginManager
from flask_pagedown import PageDown

# create extension instances but we will not initialize them because we
# do not have an instance of our application yet
bootstrap = Bootstrap()
mail = Mail()
moment = Moment()
db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
pagedown = PageDown()

# This next section we will define the factory function that will create the instance of the flask application
# based on the configuration we want it to be in could be production, development or testing
def create_app(config_name):
    """
    this is the factory where all the cooking of the our app
    instance will happen
    """
    app = Flask(__name__)
    app.config.from_object(config[config_name]) # here load all the configurations from one of the objects(dev, prod or test)

    # this kasmall section is for registering the blueprints we have in our app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    from .auth_bp import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    # this other section we now initialize those extensions with the app we have created
    if app.config['SSL_REDIRECT']:
        from flask_sslify import SSLify
        sslify = SSLify(app)

    bootstrap.init_app(app)
    mail.init_app(app)
    moment.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    pagedown.init_app(app)

    return app
