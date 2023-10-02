import unittest
from flask import current_app
from app import create_app, db
from app.main import main
from app.auth_bp import auth
from app.api import api

class BasicTestCase(unittest.TestCase):
    #test where the current_app is actually existing
    #and test where the configurations for testing are actually set up

    def setUp(self):
        #create an environment for each test case that imitates the actual running application \
        #the app instance is created with a tesing configuration \
        #the application context(app_context)  is created and pushed to the to the appliction \
        #context stack. This context is used to access the current apps configurations \
        #the database also for the application is created to set up the db schema

        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        #clean up the environment for each test case after the test has completed

        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_app_is_existing(self):
        #testing if the current_app object actually shows that there is a current app

        self.assertFalse(current_app is None)

    def test_app_is_testing(self):
        #test that actually the configuration for testing is actually running
        self.assertTrue(current_app.config['TESTING'])

    def test_extension_initialization(self):
        #test that indeed the extensions are properly initialized


        self.assertIsNotNone(current_app.extensions.get('bootstrap'))
        self.assertIsNotNone(current_app.extensions.get('mail'))
        self.assertIsNotNone(current_app.extensions.get('moment'))
        self.assertIsNotNone(current_app.extensions.get('sqlalchemy'))
        self.assertIsNotNone(current_app.extensions.get('pagedown'))

    def test_blueprint_registration(self):
        #Ensure blueprints are correctly registered


        url_collections = current_app.url_map._rules
        url_endpoints = []
        for url in url_collections:
            endpoint = url.endpoint
            parts = endpoint.split('.')
            bp = parts[0]
            url_endpoints.append(bp)

        self.assertIn('main', url_endpoints)
        self.assertIn('auth', url_endpoints)
        self.assertIn('api', url_endpoints)
