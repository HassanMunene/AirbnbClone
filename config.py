import os
import datetime

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'yoo my boy benzi')
    JWT_EXPIRATION = datetime.timedelta(days=1)
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', '587'))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'awanzihassan@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or 'xuhhwjkcsscxdmms'
    MAIL_SUBJECT = '[Flasky]'
    MAIL_SENDER = 'Flasky Admin <awanzihassan@gmail.com>'
    FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN', 'sultanhamud081@gmail.com')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SSL_REDIRECT = False

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI') or 'mysql+mysqlconnector://hassan:munene14347@localhost/flasky'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URI') or 'mysql+mysqlconnector://hassan:munene14347@localhost/testing'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URL = os.environ.get('PROD_DATABASE_URI')

class HerokuConfig(ProductionConfig):
    """
    This configuration will be used only when the app is deployed
    on heroku
    """
    SSL_REDIRECT = True if os.environ.get('DYNO') else False

    @classmethod
    def init_app(cls, app):
        ProductionConfig.init_app(app)

        import logging
        from werkzeug.contrib.fixers import ProxyFix
        from logging import StreamHandler
        file_handler = StreamHandler()
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.wsgi_app = ProxyFix(app.wsgi_app)

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
