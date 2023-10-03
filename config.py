import os
import datetime

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'my boy benzi'
    JWT_EXPIRATION = datetime.timedelta(days=1)
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', '587'))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in \
        ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'awanzihassan@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or 'xuhhwjkcsscxdmms'
    MAIL_SUBJECT = '[Flasky]'
    MAIL_SENDER = 'Flasky Admin <awanzihassan@gmail.com>'
    FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN', 'sultanhamud081@gmail.com')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SSL_REDIRECT = False
    SQLACHEMY_RECORD_QUERIES = True
    POSTS_PER_PAGE = 20
    FOLLOWERS_PER_PAGE = 50
    COMMENTS_PER_PAGE = 30
    SLOW_DB_QUERY_TIME = 0.5

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
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1")

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

        # email errors to the administrators
        import logging
        from logging.handlers import SMTPHandler
        credentials = None
        secure = None
        if getattr(cls, 'MAIL_USERNAME', None) is not None:
            credentials = (cls.MAIL_USERNAME, cls.MAIL_PASSWORD)
            if getattr(cls, 'MAIL_USE_TLS', None):
                secure()
        mail_handler = SMTPHandler(
            mailhost=(cls.MAIL_SERVER, cls.MAIL_PORT),
            fromaddr=cls.FLASKY_MAIL_SENDER,
            toaddrs=[cls.FLASKY_ADMIN],
            subject=FLASKY_MAIL_SUBJECT_PREFIX + 'Applicaion Error',
            credentials=credentails, secure=secure)
        mail_handler.setLevel(logging.ERROR)
        app.logger.addHandler(mail_handler)

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
    'heroku': HerokuConfig,
    'default': DevelopmentConfig
}
