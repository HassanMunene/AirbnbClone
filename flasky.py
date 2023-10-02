import os
from flask_migrate import Migrate
from app import create_app, db
from app.models import User, Role, Permission
import sys
import click
from flask_migrate import upgrade
from app.models import Role, User

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage
    COV = coverage.coverage(branch=True, include='app/*')
    COV.start()

@app.shell_context_processor
def make_shell_context():
    """
    avail all the object our flask shell will
    require instead of importing the all the time
    """
    return {
        'db': db,
        'User': User,
        'Role': Role,
        'Permission': Permission
    }


# In the section below we will intergrate the coverage with our test runner so that when our test runs we
# can determine which features of our app that have not yet been tested so that we implement test to them
@app.cli.command()
@click.option('--coverage/--no-coverage', default=False, help='run test with code coverage')
def test(coverage):
    """
    This part of the code utilizes the above decorator that is used to create custom commands
    our application. In this case we are defining a command named test that will be used to
    run the unit tests of the app.
    """

    if coverage and not os.environ.get('FLASK_COVERAGE'):
        os.environ['FLASK_COVERAGE'] = '1'
        os.execvp(sys.executable, [sys.executable] + sys.argv)
    import unittest
    test = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(test)
    if COV:
        COV.stop()
        COV.save()
        print("Coverage summary:")
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'tmp/coverage')
        COV.html_report(directory=covdir)
        print("HTML version: file://{}/index.html".format(covdir))
        COV.erase()

@app.cli.command()
def deploy():
    """
    run deployment tasks
    """
    upgrade()
    Role.insert_roles()
    User.add_self_follows()
